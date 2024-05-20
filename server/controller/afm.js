const { generateWeeks } = require("../functions/utilis");

const OS_AFM = require("../models/OS_aftermarket");
const creaError = require("../utilitis/globalError");

exports.getData = async (req, res, next) => {
  try {
    const data = await OS_AFM.find({});
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.addData = async (req, res, next) => {
  try {
    const { year, weeks } = req.body;
    const { After_Sales, After_Sales_spl, After_Sales_ActualDH } = weeks[0];
    const data = await OS_AFM.findOne({ year });

    if (!data) {
      const generatedWeeks = generateWeeks();
      const newWeeksData = generatedWeeks.map((genWeek) => {
        const weekData = weeks.find((week) => week.week_name === genWeek.week);
        return {
          week_name: new Date().getFullYear() + "-" + genWeek.week,
          After_Sales: weekData ? weekData.After_Sales : After_Sales,
          After_Sales_spl: weekData
            ? weekData.After_Sales_spl
            : After_Sales_spl,
          After_Sales_ActualDH: weekData
            ? weekData.After_Sales_ActualDH
            : After_Sales_ActualDH,
        };
      });

      console.log(newWeeksData);
      const newYearData = { year, weeks: newWeeksData };
      await new OS_AFM(newYearData).save();
      res.status(201).json("Data added to all weeks successfully!");
    }
  } catch (err) {
    next(err);
  }
};

exports.Modify = async (req, res, next) => {
  try {
    const { week, path, value, projectName } = req.body;

    const GetPath = path.split(".")[0];

    if (GetPath === "After_Sales") {
      const updatedData = await OS_AFM.findOneAndUpdate(
        {
          "weeks.week_name": week,
          "weeks.After_Sales.project_name": projectName,
        },
        { $set: { "weeks.$.After_Sales.$[elem].value": value } },
        {
          arrayFilters: [{ "elem.project_name": projectName }],
          new: true,
        }
      );
    
      if (!updatedData) {
        return res
          .status(404)
          .json({
            error: `Week '${week}' or project '${projectName}' not found`,
          });
      }
    
    
      const weekIndex = updatedData.weeks.findIndex((w) => w.week_name === week);
      const subsequentWeeks = updatedData.weeks.slice(weekIndex + 1);
      const updateOperations = subsequentWeeks.map((w) => ({
        updateOne: {
          filter: { "weeks.week_name": w.week_name },
          update: {
            $set: { "weeks.$.After_Sales.$[elem].value": value },
          },
          arrayFilters: [{ "elem.project_name": projectName }],
          new: true,
        },
      }));
    
    
      if (updateOperations.length > 0) {
        await OS_AFM.bulkWrite(updateOperations);
      }
    }
    
    else if (GetPath === "After_Sales_spl") {
      const updatedData = await OS_AFM.findOneAndUpdate(
        { "weeks.week_name": week },
        { $set: { [`weeks.$.${path}`]: value } },
        { new: true }
      );
      if (!updatedData) {
        return res.status(404).json({ error: `Week '${week}' not found` });
      }
      const weekIndex = updatedData.weeks.findIndex(
        (w) => w.week_name === week
      );
      const subsequentWeeks = updatedData.weeks.slice(weekIndex + 1);
      const updateOperations = subsequentWeeks.map((w) => ({
        updateOne: {
          filter: { "weeks.week_name": w.week_name },
          update: { $set: { [`weeks.$.${path}`]: value } },
        },
      }));
      if (updateOperations.length > 0) {
        await OS_AFM.bulkWrite(updateOperations);
      }
    } else {
      const updatedData = await OS_AFM.findOneAndUpdate(
        { "weeks.week_name": week },
        { $set: { [`weeks.$.${path}`]: value } },
        { new: true }
      );
      if (!updatedData) {
        return res.status(404).json({ error: `Week '${week}' not found` });
      }
    }

    const data = await OS_AFM.find({});
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};
