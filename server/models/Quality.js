const mongoose = require("mongoose");

const Quality_actualDH_Schema = new mongoose.Schema({
  Attrition: { type: Number },
  Transfer: { type: Number },
  Hiring: { type: Number },
  Last_dh:{type:Number},
});

const Q_specialL_Schema = new mongoose.Schema({
  Pregnant_women_out_of_the_plant: { type: Number },
  Maternity: { type: Number },
  Breastfeeding_leave: { type: Number },
  LTI_Long_term_weaknesses_LWD: { type: Number },
  Physical_incapacity_NMA: { type: Number },
});

const otherDHSchema = new mongoose.Schema({
  Supper_Control: { type: Number },
  Fire_Wall: { type: Number },
  Validation: { type: Number },
  FTQ_Data_Recording: { type: Number },
  RM_Sorting_FG_Wearhouse: { type: Number },
  Containment_Back_up: { type: Number },
  Excess: { type: Number },
});
const WeekSchema = new mongoose.Schema({
  week_name: { type: String, required: true },
  Quality_Other_DH: { type: otherDHSchema, required: true },
  Quality_Special_list_out_of_the_plant: {
    type: Q_specialL_Schema,
    required: true,
  },
  Quality_Actual_DH: { type: Quality_actualDH_Schema, required: true },
});

const YearSchema = new mongoose.Schema({
  year: { type: String, required: true },
  weeks: { type: [WeekSchema], required: true },
});
const year = mongoose.model("Quality", YearSchema);
module.exports = year;
