const Cutting = require("../models/Cutting");
const { generateWeeks } = require("../functions/utilis");
const creaError = require("../utilitis/globalError");

exports.GetData = async (req, res, next) => {
  try {
    const data = await Cutting.find({});
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.addData = async (req, res, next) => {
  try {
    const { year, weeks } = req.body;
    const {
      Cutting_DH_Required,
      Cutting_Actual_DH,
      LP_DH_Required,
      LP_ActualDH,
    } = weeks[0];

    const data = await Cutting.findOne({ year });
    if (!data) {
      const generatedWeeks = generateWeeks();
      const newWeekData = generatedWeeks.map((genWeek) => {
        const weekData = weeks.find((week) => week.week_name === genWeek.week);
        return {
          week_name: new Date().getFullYear() + "-" + genWeek.week,
          Cutting_DH_Required: weekData
            ? weekData.Cutting_DH_Required
            : Cutting_DH_Required,

          Cutting_Actual_DH: weekData
            ? weekData.Cutting_Actual_DH
            : Cutting_Actual_DH,

          LP_DH_Required: weekData ? weekData.LP_DH_Required : LP_DH_Required,

          LP_ActualDH: weekData ? weekData.LP_ActualDH : LP_ActualDH,
        };
      });

      const newYearData = { year, weeks: newWeekData };
      await new Cutting(newYearData).save();
      res.status(201).json("Data added to all weeks successfully!");
    } else return res.status(404).json({ message: "Year Data Already Exist" });
  } catch (err) {
    next(err);
  }
};
