const Logistic = require("../controller/logistic");
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

exports.AddData = async (req, res, next) => {
  try {
    
  } catch (err) {
    next(err);
  }
};
