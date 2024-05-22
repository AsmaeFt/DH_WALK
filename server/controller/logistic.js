const Logistic = require("../models/Logistic")
const { generateWeeks } = require("../functions/utilis");
const creaError = require("../utilitis/globalError");

exports.GetData = async (req, res, next) => {
  try {
    const data = await Logistic.find({});
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.addData = async (req, res, next) => {
    try {
      const { year, weeks } = req.body;
      const {
        Logistic_DH,
        Logistic_SPL,
        Logistic_actual_Dh,
      } = weeks[0];

      const data = await Logistic.findOne({ year });
      console.log(weeks);
      if (!data) {
        const generatedWeeks = generateWeeks();
        const newWeeksData = generatedWeeks.map((genWeek) => {
          const weekData = weeks.find((week) => week.week_name === genWeek.week);
          return {
            week_name: new Date().getFullYear() + "-" + genWeek.week,
            Logistic_DH: weekData
              ? weekData.Logistic_DH
              : Logistic_DH,
  
              Logistic_SPL: weekData
              ? weekData.Logistic_SPL
              : Logistic_SPL,
  
              Logistic_actual_Dh: weekData
              ? weekData.Logistic_actual_Dh
              : Logistic_actual_Dh,
          };
        });
        const newYearData = { year, weeks: newWeeksData };
        await new Logistic(newYearData).save();
        res.status(201).json("Data added to all weeks successfully!");
      }
    } catch (err) {
      next(err);
    }
  };

exports.Modify = async (req, res, next) => {
  try {
    const { week, path, value } = req.body;
    const GetPath = path.split(".")[0];
    if (GetPath != "Logistic_actual_Dh") {
      const updatedData = await Logistic.findOneAndUpdate(
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
        await Logistic.bulkWrite(updateOperations);
      }
    } else {
      const updatedData = await Logistic.findOneAndUpdate(
        { "weeks.week_name": week },
        { $set: { [`weeks.$.${path}`]: value } },
        { new: true }
      );
      if (!updatedData) {
        return res.status(404).json({ error: `Week '${week}' not found` });
      }
    }

    const data = await Logistic.find({});
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};
