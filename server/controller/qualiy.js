const { generateWeeks } = require("../functions/utilis");
const Quality = require("../models/Quality");
const creaError = require("../utilitis/globalError");

exports.getQuality_Data = async (req, res, next) => {
  try {
    const data = await Quality.find({});
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};
exports.addData = async (req, res, next) => {
  try {
    const { year, weeks } = req.body;
    const {
      Quality_Other_DH,
      Quality_Special_list_out_of_the_plant,
      Quality_Actual_DH,
    } = weeks[0];
    const data = await Quality.findOne({ year });
    console.log(weeks);
    if (!data) {
      const generatedWeeks = generateWeeks();
      const newWeeksData = generatedWeeks.map((genWeek) => {
        const weekData = weeks.find((week) => week.week_name === genWeek.week);
        return {
          week_name: new Date().getFullYear() + "-" + genWeek.week,
          Quality_Other_DH: weekData
            ? weekData.Quality_Other_DH
            : Quality_Other_DH,

          Quality_Special_list_out_of_the_plant: weekData
            ? weekData.Quality_Special_list_out_of_the_plant
            : Quality_Special_list_out_of_the_plant,

          Quality_Actual_DH: weekData
            ? weekData.Quality_Actual_DH
            : Quality_Actual_DH,
        };
      });

      console.log(newWeeksData);
      const newYearData = { year, weeks: newWeeksData };
      await new Quality(newYearData).save();
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
    if (GetPath != "Quality_Actual_DH") {
      const updatedData = await Quality.findOneAndUpdate(
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
        await Quality.bulkWrite(updateOperations);
      }
    } else {
      const updatedData = await Quality.findOneAndUpdate(
        { "weeks.week_name": week },
        { $set: { [`weeks.$.${path}`]: value } },
        { new: true }
      );
      if (!updatedData) {
        return res.status(404).json({ error: `Week '${week}' not found` });
      }
    }

    const data = await Quality.find({});
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};
