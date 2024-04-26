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
    const { year, weeks } = req.body;
    const existingYear = await dhwalk.findOne({ year });

    if (existingYear) {
      weeks.forEach(async (newWeek) => {
        const existingWeekIndex = existingYear.weeks.findIndex(
          (existingWeek) => existingWeek.week_name === newWeek.week_name
        );

        if (existingWeekIndex !== -1) {
          existingYear.weeks[existingWeekIndex].projectData.push(...newWeek.projectData);
        } else {
          existingYear.weeks.push(newWeek);
        }
      });
      await existingYear.save();
      res.status(201).json(existingYear);
    } else {
      const newYear = new dhwalk({ year, weeks });
      await newYear.save();
      res.status(201).json(newYear);
    }
  } catch (err) {
    next(err);
  }
};
