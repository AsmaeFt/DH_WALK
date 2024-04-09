const mongoose = require('mongoose');

const actual_DH_Schema = new mongoose.Schema({
  Attrition: { type: Number,  default: 0 },
  Transfer: { type: Number,  default: 0 },
  Hiring: { type: Number, default: 0 },
});

const special_list_schema = new mongoose.Schema({
  Pregnant_women_out_of_the_plant: { type: Number,  default: 0 },
  Maternity: { type: Number, default: 0 },
  Breastfeeding_leave: { type: Number,  default: 0 },
  LTI_Long_term_weaknesses_LWD: { type: Number, default: 0 },
  Physical_incapacity_NMA: { type: Number,  default: 0 },
});

const project_OS_schema = new mongoose.Schema({
  Digitalization: { type: Number,  default: 0 },
  Daily_Kaizen: { type: Number,  default: 0 },
  OS_Auditing: { type: Number,  default: 0 },
  OS_Auditing_Data_Reporting: { type: Number,  default: 0 },
});

const familySchema = new mongoose.Schema({
  name: { type: String,  default: null },
  crews: { type: Number,  default: 0 },
  ME_DEFINITION: { type: Number, default: 0 },
  ME_SUPPORT: { type: Number, default: 0 },
  Rework: { type: Number,  default: 0 },
  Poly: { type: Number,  default: 0 },
  Back_Up: { type: Number, default: 0 },
  Containment: { type: Number, default: 0 },
  SOS: { type: Number,  default: 0 },
});

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true},
  family: { type: [familySchema], required: true },
  project_OS: { type: {project_OS_schema}, required: true },
  project_special_list: { type: {special_list_schema}, required: true },
  project_actual_DH: { type: {actual_DH_Schema}, required: true },
});

const WeekSchema = new mongoose.Schema({
  week_name: { type: String, required: true },
  projectData: { type: [ProjectSchema], required: true },
});

const MonthSchema = new mongoose.Schema({
  month_name: { type: String,required:true  },
  weeks: { type: [WeekSchema], required: true },
});

const Month = mongoose.model('DATA', MonthSchema);
module.exports = Month;