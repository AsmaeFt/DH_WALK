const mongoose = require("mongoose");

const LP_Actual_Schema = new mongoose.Schema({
  Attrition: { type: Number },
  Transfer: { type: Number },
  Hiring: { type: Number },
  Last_dh: { type: Number },
});

const LP_DH_required_Schema = new mongoose.Schema({
  LP_HD: { type: Number },
  Polyvalents: { type: Number },
  Contention: { type: Number },
  Absenteeism: { type: Number },
  Long_Term_Illness: { type: Number },
  Training: { type: Number },
  Attrition_Backup: { type: Number },
  SOS: { type: Number },
  Prototypes: { type: Number },
  DR: { type: Number },
  LP_Support_Internal_DR_Die_centre: { type: Number },
  Rework: { type: Number },
});

const Cutting_ActualDh_Schema = new mongoose.Schema({
  Attrition: { type: Number },
  Transfer: { type: Number },
  Hiring: { type: Number },
  Last_dh: { type: Number },
});

const Cutting_DH_required_Schema = new mongoose.Schema({
  Machines_FT_s_Projection: { type: Number },
  Contention: { type: Number },
  Absenteeism: { type: Number },
  Training: { type: Number },
  Big_Brother: { type: Number },
  Long_Term_Illness: { type: Number },
  Attrition_Backup: { type: Number },
  SOS: { type: Number },
  D_C_Pre_set_up_Reception_delivery: { type: Number },
  Rework_pagode_Scrap_stock_aken: { type: Number },
});

const WeekSchema = new mongoose.Schema({
  week_name: { type: String, required: true },
  Cutting_DH_Required: { type: Cutting_DH_required_Schema, required: true },
  Cutting_Actual_DH: { type: Cutting_ActualDh_Schema, required: true },
  LP_DH_Required: { type: LP_DH_required_Schema, required: true },
  LP_ActualDH: { type: LP_Actual_Schema, required: true },
});

const YearSchema = new mongoose.Schema({
  year: { type: String, required: true },
  weeks: { type: [WeekSchema], required: true },
});
const Cutting = mongoose.model("Cutting", YearSchema);
module.exports = Cutting;
