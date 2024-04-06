const mongoose = require('mongoose');

const actual_DH_Schema = new mongoose.Schema({
  Attrition: { type: Number, required: true, default: 0 },
  Transfer: { type: Number, required: true, default: 0 },
  Hiring: { type: Number, required: true, default: 0 },
});

const special_list_schema = new mongoose.Schema({
  Pregnant_women_out_of_the_plant: { type: Number, required: true, default: 0 },
  Maternity: { type: Number, required: true, default: 0 },
  Breastfeeding_leave: { type: Number, required: true, default: 0 },
  LTI_Long_term_weaknesses_LWD: { type: Number, required: true, default: 0 },
  Physical_incapacity_NMA: { type: Number, required: true, default: 0 },
});

const project_OS_schema = new mongoose.Schema({
  Digitalization: { type: Number, required: true, default: 0 },
  Daily_Kaizen: { type: Number, required: true, default: 0 },
  OS_Auditing: { type: Number, required: true, default: 0 },
  OS_Auditing_Data_Reporting: { type: Number, required: true, default: 0 },
});

const familySchema = new mongoose.Schema({
  name: { type: String, required: true, default: null },
  Hcount_Number:{type:Number,required:true,default:0},
  indirects: { type: String, required: true, default: null },
  crews: { type: Number, required: true, default: 0 },
  HC_CREW: { type: Number, required: true, default: 0 },
  ME_DEFINITION: { type: Number, required: true, default: 0 },
  ME_SUPPORT: { type: Number, required: true, default: 0 },
  Rework: { type: Number, required: true, default: 0 },
  Poly: { type: Number, required: true, default: 0 },
  Back_Up: { type: Number, required: true, default: 0 },
  Containment: { type: Number, required: true, default: 0 },
  SOS: { type: Number, required: true, default: 0 },
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true},
  Hcount_Number:{type:Number,required:true,default:0},


  project_DH_Required: { type: Number, required: true, default: 0 },

  family: { type: [familySchema], required: true },
  project_OS: { type: [project_OS_schema], required: true },
  project_special_list: { type: [special_list_schema], required: true },
  project_actual_DH: { type: [actual_DH_Schema], required: true },

  project_DH_Gap: { type: Number, required: true, default: 0 },
});

const WeekSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: { type: [ProjectSchema], required: true },
});

const MonthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weeks: { type: [WeekSchema], required: true },
});

const Month = mongoose.model('Month', MonthSchema);
module.exports = Month;