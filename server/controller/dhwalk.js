const { generateWeeks } = require("../functions/utilis");
const dhwalk = require("../models/DHwalk");
const creaError = require("../utilitis/globalError");


exports.getDhwalk = async (req, res, next) => {
  try {
    const data = await dhwalk.find({});
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.addProjectData = async (req, res, next) => {
  try {
    const { year, weeks } = req.body;

    const projectData = weeks.flatMap((p) => p.projectData)[0];
    const projectName = projectData.projectName;

    const data = await dhwalk.findOne({ year });
    if (data) {
      let projectExists = false;
      data.weeks.forEach((w) => {
        if (w.projectData.some((p) => p.projectName === projectName)) {
          projectExists = true;
        }
      });

      if (projectExists) {
        return res.status(409).json({ message: "Project already exists" });
      } else {
        data.weeks.forEach((w) => w.projectData.push(projectData));
        await data.save();
        res.status(201).json("Project data added to all weeks successfully!");
      }
    } 
    else {
      const generatedWeeks = generateWeeks();
      const newWeeksData = generatedWeeks.map((genWeek) => {
        const weekData = weeks.find((week) => week.week_name === genWeek.week);
        return {
          week_name: new Date().getFullYear() + "-" + genWeek.week,
          projectData: weekData ? weekData.projectData :projectData,
        };
      });

      const newYearData = { year, weeks: newWeeksData };
      await new dhwalk(newYearData).save();
      res.status(201).json("Data added to all weeks successfully!");
    }
  } catch (err) {
    next(err);
  }
};

 exports.editData = async (req, res, next) => {
  try {
    const { week, project, family, attribute, value } = req.body;
    const validAttributes = [
      "crews",
      "ME_DEFINITION",
      "ME_SUPPORT",
      "Rework",
      "Poly",
      "Back_Up",
      "Containment",
      "SOS",
    ];

    if (!validAttributes.includes(attribute)) {
      return res.status(400).json({ error: "Invalid attribute provided." });
    }

    const updatePath = `weeks.$[weekIdx].projectData.$[projIdx].family.$[famIdx].${attribute}`;
    const dataUpdated = await dhwalk.findOneAndUpdate(
      {
        "weeks.week_name": week,
      },
      {
        $set: {
          [updatePath]: value,
        },
      },
      {
        arrayFilters: [
          { "weekIdx.week_name": week },
          { "projIdx.projectName": project },
          { "famIdx.name": family },
        ],
      }
    );

    if (!dataUpdated) {
      return res.status(404).json({ error: "No matching documents found." });
    }

    const weekIndex = dataUpdated.weeks.findIndex((w) => w.week_name === week);
    const subsequentWeeks = dataUpdated.weeks.slice(weekIndex + 1);

    const updates = subsequentWeeks.map((w) => {
      const projIndex = w.projectData.findIndex(
        (p) => p.projectName === project
      );
      const famIndex = w.projectData[projIndex].family.findIndex(
        (f) => f.name === family
      );
      const updatePath = `weeks.$[weekIdx].projectData.$[projIdx].family.$[famIdx].${attribute}`;
      return {
        updateOne: {
          filter: { "weeks.week_name": w.week_name },
          update: { $set: { [updatePath]: value } },
          arrayFilters: [
            { "weekIdx._id": w._id },
            { "projIdx._id": w.projectData[projIndex]._id },
            { "famIdx._id": w.projectData[projIndex].family[famIndex]._id },
          ],
        },
      };
    });

    await dhwalk.bulkWrite(updates);

    // Fetch and return updated data
    const Data_Global = await dhwalk.find({});
    res.status(200).json(Data_Global);
  } catch (err) {
    next(err);
  }
};  