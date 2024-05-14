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
