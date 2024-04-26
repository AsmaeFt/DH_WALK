const { generateWeeks } = require("../functions/utilis");
const dhwalk = require("../models/DHwalk");
const creaError = require("../utilitis/globalError");

exports.addData = async (req, res, next) => {
  try {
    const { year, weeks } = req.body;
    const existYear = await dhwalk.findOne({ year });

    if (existYear) {
      return res.status(409).json({ message: "Year already exists" });
    }

    const generatedWeeks = generateWeeks();
    const data = generatedWeeks.map((generatedWeek) => {
      const weekData = weeks.find((w) => w.week_name === generatedWeek.week);
      return {
        week_name: new Date().getFullYear() + "-" + generatedWeek.week,
        projectData: weekData ? weekData.projectData : weeks[0].projectData,
      };
    });

    const newYearData = { year, weeks: data };
    const newYear = await new dhwalk(newYearData).save();
    res.status(201).json(newYear);
  } catch (err) {
    next(err);
  }
};

exports.getDhwalk = async (req, res, next) => {
  try {
    const data = await dhwalk.find({});
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};



exports.addDatanew = async (req, res, next) => {
  try {
    const { year, weeks: newWeeksData } = req.body; // Renamed to newWeeksData for clarity
    const existYear = await dhwalk.findOne({ year });

    if (existYear) {
      // Iterate over each week provided in the request
      newWeeksData.forEach((newWeekData) => {
        let existingWeek = existYear.weeks.find(w => w.week_name === newWeekData.week_name);
        if (existingWeek) {
          // Append new project data to existing week
          existingWeek.projectData.push(...newWeekData.projectData);
        } else {
          // Add new week if it does not exist
          existYear.weeks.push(newWeekData);
        }
      });
      await existYear.save();
    } else {
      // If the year does not exist, create it with the provided weeks and project data
      const newYearData = { year, weeks: newWeeksData };
      const newYear = new dhwalk(newYearData);
      await newYear.save();
    }

    res.status(200).json({ message: 'Data processed successfully' });
  } catch (err) {
    next(err);
  }
};
