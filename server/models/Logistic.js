const mongoose = require("mongoose");

const AcualDh_Schema = new mongoose.Schema({
  Attrition: { type: Number },
  Transfer: { type: Number },
  Hiring: { type: Number },
  Last_dh: { type: Number },
});

const Logistic_Spl_Schema = new mongoose.Schema({
  Pregnant_women_out_of_the_plant: { type: Number },
  Maternity: { type: Number },
  Breastfeeding_leave: { type: Number },
  LTI_Long_term_weaknesses_LWD: { type: Number },
  Physical_incapacity_NMA: { type: Number },
});

const Logistic_Schema = new mongoose.Schema({
  OPS: { type: Number },
  KSK_Printing_Orders: { type: Number },
  Sequencing: { type: Number },
  Reception_Warehouse: { type: Number },
  RM_DR: { type: Number },
  FG_Warehouse: { type: Number },
  FG_DR: { type: Number },
});

const WeekSchema = new mongoose.Schema({
  week_name: { type: String, required: true },
  Logistic_DH: { type: Logistic_Schema, required: true },
  Logistic_SPL: { type: Logistic_Spl_Schema, required: true },
  Logistic_actual_Dh: { type: AcualDh_Schema, required: true },
});

const YearSchema = new mongoose.Schema({
  year: { type: String, required: true },
  weeks: { type: [WeekSchema], required: true },
});
const year = mongoose.model("Logistic", YearSchema);
module.exports = year;

