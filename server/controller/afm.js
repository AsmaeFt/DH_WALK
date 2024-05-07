const { generateWeeks } = require("../functions/utilis");
const year = require("../models/OS_aftermarket");
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

    const generatedWeeks = generateWeeks();
    const data = await OS_AFM.findOne({ year });
    if (!data) {
      const generatedWeeks = generateWeeks();
      const newWeeksData = generatedWeeks.map((genWeek) => {
        const weekData = weeks.find((week) => week.week_name === genWeek.week);
        return {
          week_name: new Date().getFullYear() + "-" + genWeek.week,
          projectData: weekData ? weekData.projectData : projectData,
        };
      });

      const newYearData = { year, weeks: newWeeksData };
      await new dhwalk(newYearData).save();
      res.status(201).json("Data added to all weeks successfully!");
    }
    const newYearData = { year, weeks: newData };
    await new Os_AFM(newYearData).save();
    res.status(201).json("data added to all weeks successfully!");
  } catch (err) {
    next(err);
  }
};
