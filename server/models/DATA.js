const mongoose = require('mongoose');

const actual_DH_Schema = new mongoose.Schema({
  Attrition: { type: Number,  default: 0 },
  Transfer: { type: Number,  default: 0 },
  Hiring: { type: Number, default: 0 },
  last_HC :{type:Number,default:0},
});

const special_list_schema = new mongoose.Schema({
  Pregnant_women_out_of_the_plant: { type: Number,  default: 0 },
  Maternity: { type: Number, default: 0 },
  Breastfeeding_leave: { type: Number,  default: 0 },
  LTI_Long_term_weaknesses_LWD: { type: Number, default: 0 },
  Physical_incapacity_NMA: { type: Number,  default: 0 },
});

const project_OS_schema = new mongoose.Schema({
  Digitalization: { type: Number,  default: 0 , required:true},
  Daily_Kaizen: { type: Number,  default: 0 , required:true},
  OS_Auditing: { type: Number,  default: 0 , required:true},
  OS_Auditing_Data_Reporting: { type: Number,  default: 0 , required:true},
});

const familySchema = new mongoose.Schema({
  name: { type: String, required: true},
  crews: { type: Number, required: true},
  ME_DEFINITION: { type: Number, required: true},
  ME_SUPPORT: { type: Number, required: true},
  Rework: { type: Number, required: true},
  Poly: { type: Number,  required: true },
  Back_Up: { type: Number, required: true},
  Containment: { type: Number, required: true},
  SOS: { type: Number, required: true },
});

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true},
  family: { type: [familySchema], required: true },
  project_OS: { type: project_OS_schema, required: true },
  project_special_list: { type: special_list_schema, required: true },
  project_actual_DH: { type: actual_DH_Schema, required: true },
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