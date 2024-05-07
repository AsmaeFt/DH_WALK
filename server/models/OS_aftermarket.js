const mongoose = require("mongoose");

const After_SalesSPLSchema = new mongoose.Schema({
  Pregnant_women_out_of_the_plant: { type: Number },
  Maternity: { type: Number },
  Breastfeeding_leave: { type: Number },
  LTI_Long_term_weaknesses_LWD: { type: Number },
  Physical_incapacity_NMA: { type: Number },
});
const After_SalesSchema = new mongoose.Schema({
  project_name: { type: String },
  value: { type: Number },
});

const WeekSchema = new mongoose.Schema({
  week_name: { type: String, required: true },
  After_Sales: { type: [After_SalesSchema], required: true },
  After_Sales_spl: { type: After_SalesSPLSchema, required: true },
  After_Sales_ActualDH: { type: After_SalesSPLSchema, required: true },
});

const YearSchema = new mongoose.Schema({
  year: { type: String, required: true },
  weeks: { type: [WeekSchema], required: true },
});

const year = mongoose.model("OS_AFM", YearSchema);
module.exports = year;
