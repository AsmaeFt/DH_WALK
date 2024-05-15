const { generateWeeks } = require("../functions/utilis");
const Final_Assembly = require("../models/Final_Assembly");
const creaError = require("../utilitis/globalError");

exports.Get_Data = async (req, res, next) => {
  try {
    const data = await Final_Assembly.find({});
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

//To be Modify 
exports.Add_Data = async (req, res, next) => {
  try {
    const { year, weeks } = req.body;
    const projectData = weeks.flatMap((p) => p.projectData)[0];
    const projectName = projectData.projectName;
    const family = projectData.family;
    const project_OS = projectData.project_OS;
    const project_special_list = projectData.project_special_list;
    const project_actual_DH = projectData.project_actual_DH;
    const Weeks = generateWeeks();

    const newData = Weeks.map((wk) => {
      const weekData = {
        week_name: new Date().getFullYear() + "-" + wk.week,
        projectData: [
          {
            projectName,
            family,
            project_OS,
            project_special_list,
          },
        ],
      };

      if (new Date().getFullYear() + "-" + wk.week === weeks[0].week_name) {
        weekData.projectData[0].project_actual_DH = project_actual_DH;
      } else {
        weekData.projectData[0].project_actual_DH = {
          Attrition: 0,
          Transfer: 0,
          Hiring: 0,
          last_HC: 0,
        };
      }

      return weekData;
    });

    res.status(201).json(newData);
  } catch (err) {
    next(err);
  }
};

exports.Modify = async (req, res, next) => {
  try {
    const { projectName, week, path, family, attribute, value } = req.body;
   

    if(path != null){
        const updatePath = `weeks.$[weekIdx].projectData.$[projIdx].${path}`;
        const GetPath = path.split(".")[0];
        if (GetPath != "project_actual_DH") {
    
          const updateResult = await Final_Assembly.findOneAndUpdate(
            {
              "weeks.week_name": week,
              "weeks.projectData.projectName": projectName,
            },
            {
              $set: { [updatePath]: value },
            },
            {
              arrayFilters: [
                { "weekIdx.week_name": week },
                { "projIdx.projectName": projectName },
              ],
            }
          );
          const weekIndex = updateResult.weeks.findIndex(
            (w) => w.week_name === week
          );
          const subsequentWeeks = updateResult.weeks.slice(weekIndex + 1);
          const updates = subsequentWeeks.map((w) => {
            const projectIndx = w.projectData.findIndex(
              (p) => p.projectName === projectName
            );
            const updatePath = `weeks.$[weekIdx].projectData.$[projIdx].${path}`;
            return {
              updateOne: {
                filter: { "weeks.week_name": w.week_name },
                update: { $set: { [updatePath]: value } },
                arrayFilters: [
                  { "weekIdx._id": w._id },
                  { "projIdx._id": w.projectData[projectIndx]._id },
                ],
              },
            };
          });
          await Final_Assembly.bulkWrite(updates);
        }
        else if( GetPath === "project_actual_DH" ){
    
            const updateResult = await Final_Assembly.findOneAndUpdate(
                {
                  "weeks.week_name": week,
                  "weeks.projectData.projectName": projectName,
                },
                {
                  $set: { [updatePath]: value },
                },
                {
                  arrayFilters: [
                    { "weekIdx.week_name": week },
                    { "projIdx.projectName": projectName },
                  ],
                }
              );
        }
    }
    
    else
    {
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
          const dataUpdated = await Final_Assembly.findOneAndUpdate(
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
                { "projIdx.projectName": projectName },
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
              (p) => p.projectName === projectName
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
          await Final_Assembly.bulkWrite(updates);
    }

    const data = await Final_Assembly.aggregate([
        { $unwind: "$weeks" },
        { $unwind: "$weeks.projectData" },
        { $match: { "weeks.projectData.projectName": projectName } },
        {
          $group: {
            _id: "$weeks.week_name",
            projectData: { $push: "$weeks.projectData" },
          },
        },
        { $sort: { _id: 1 } },
        {
          $group: {
            _id: null,
            data: { $push: { week_name: "$_id", projectData: "$projectData" } },
          },
        },
      ]);
  
      if (data.length > 0) {
        res.status(200).json(data[0].data);
      } else {
        throw new Error(`Project "${projectName}" doesn't exist`);
      }

  } catch (err) {
    next(err);
  }
};
