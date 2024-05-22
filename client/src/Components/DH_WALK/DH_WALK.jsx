import React, { useState, useCallback, useEffect } from "react";
import c from "../FinalAssembl/FinalAssembly.module.css";
import TableHeader from "../UI/TableHeader";
import axios from "axios";
import api from "../../services/api";
import Loadings from "../UI/Loading";
import { generateWeeks } from "../functions/utilis";
import { Calculate_Average } from "../hooks/Average";

const DH_WALK = () => {
  const [projectData, setProjectData] = useState([]);
  const [AFM, setAFM] = useState([]);
  const [Logistic, setLogistic] = useState([]);
  const [Quality, setQuality] = useState([]);
  const [Cutting, setCutting] = useState([]);
  const [view, setView] = useState("table");
  const [loading, setloading] = useState(true);

  const fetchData = useCallback(async (endpoint, setter) => {
    try {
      const res = await axios.get(`${api}${endpoint}`);
      setter(res.data);
      setloading(false);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData("/assembly_project", setProjectData);
    fetchData("/GetOSAFM", setAFM);
    fetchData("/get_Logistic", setLogistic);
    fetchData("/get_quality", setQuality);
    fetchData("/get_Cutting", setCutting);
  }, [fetchData]);

  let Total_Projects = {};
  let Total_SOS = [];
  let Total_of_all_Projects = [];
  let Total_OS_Digitalisation = [];
  let Total_OS_Daily_Kaizen = [];
  let Total_OS_Data_Reporting = [];
  let Total_OS = [];
  let Total_PW = [];
  let Total_Mat = [];
  let Total_BF = [];
  let Total_LI = [];
  let Total_PY = [];
  let Total_Projects_SPL = [];
  let last_Project_HC = [];
  let Total_pro_Attrition = [];
  let Total_pro_Transfet = [];
  let Total_pro_Hiring = [];

  projectData.map((y) => {
    let Total_lasHc = 0;
    y.weeks.map((w) => {
      let sos = 0;
      let Total_Of_Total = 0;
      let OS_Digitalisation = 0;
      let OS_Kaizen = 0;
      let OS_repo = 0;
      let OS = 0;

      let PR = 0;
      let Mat = 0;
      let BF = 0;
      let LI = 0;
      let PY = 0;
      let SPL = 0;

      let Attrition = 0;
      let Transfer = 0;
      let Hiring = 0;

      w.projectData.map((p) => {
        const TotalOS =
          p.project_OS.Digitalization +
          p.project_OS.Daily_Kaizen +
          p.project_OS.OS_Auditing +
          p.project_OS.OS_Auditing_Data_Reporting;

        OS_Digitalisation += p.project_OS.Digitalization;
        OS_Kaizen += p.project_OS.Daily_Kaizen;
        OS_repo += p.project_OS.OS_Auditing_Data_Reporting;
        OS = OS_Digitalisation + OS_Kaizen + OS_repo;

        const totalSLOP =
          p.project_special_list.Pregnant_women_out_of_the_plant +
          p.project_special_list.Maternity +
          p.project_special_list.Breastfeeding_leave +
          p.project_special_list.LTI_Long_term_weaknesses_LWD +
          p.project_special_list.Physical_incapacity_NMA;

        PR += p.project_special_list.Pregnant_women_out_of_the_plant;
        Mat += p.project_special_list.Maternity;
        BF += p.project_special_list.Breastfeeding_leave;
        LI += p.project_special_list.LTI_Long_term_weaknesses_LWD;
        PY += p.project_special_list.Physical_incapacity_NMA;
        SPL = PR + Mat + BF + LI + PY;

        let familyTotal = 0;
        p.family.forEach((fam) => {
          if (fam != null) {
            const HC_Crew =
              fam.ME_DEFINITION +
              fam.ME_SUPPORT +
              fam.Rework +
              fam.Poly +
              fam.Back_Up +
              fam.Containment;
            const totalF = HC_Crew * fam.crews + fam.SOS;
            familyTotal += totalF;
            sos += fam.SOS;
          }
        });

        let Total_pr = 0;
        Total_pr = TotalOS + totalSLOP + familyTotal;

        Total_Of_Total += Total_pr;

        if (!Total_Projects[p.projectName]) {
          Total_Projects[p.projectName] = [];
        }
        Total_Projects[p.projectName].push(Math.floor(Total_pr));

        Attrition += p.project_actual_DH.Attrition;
        Transfer += p.project_actual_DH.Transfer;
        Hiring += p.project_actual_DH.Hiring;

        if (w.week_name === `${new Date().getFullYear()}-W01`) {
          Total_lasHc += p.project_actual_DH.last_HC;
        }
      });
      Total_SOS.push(sos);
      Total_of_all_Projects.push(Math.floor(Total_Of_Total));
      Total_OS_Digitalisation.push(OS_Digitalisation);
      Total_OS_Daily_Kaizen.push(OS_Kaizen);
      Total_OS_Data_Reporting.push(OS_repo);
      Total_OS.push(OS);
      Total_PW.push(PR);
      Total_Mat.push(Mat);
      Total_BF.push(BF);
      Total_LI.push(LI);
      Total_PY.push(PY);
      Total_Projects_SPL.push(SPL);

      Total_pro_Attrition.push(Attrition);
      Total_pro_Transfet.push(Transfer);
      Total_pro_Hiring.push(Hiring);
    });
    last_Project_HC.push(Total_lasHc);
  });

  let Total_AFM_Required = [];
  let last_Pr_AFM_HC = [];
  let Total_afm_Attrition = [];
  let Total_afm_Transfert = [];
  let Total_afm_Hiring = [];

  AFM.map((y) => {
    let Total_lasHc = 0;
    y.weeks.map((w) => {
      let Total_after_sales = 0;
      w.After_Sales.map((af) => {
        Total_after_sales += af.value;
      });

      const After_Sales_spl =
        w.After_Sales_spl.Pregnant_women_out_of_the_plant +
        w.After_Sales_spl.Maternity +
        w.After_Sales_spl.Breastfeeding_leave +
        w.After_Sales_spl.LTI_Long_term_weaknesses_LWD +
        w.After_Sales_spl.Physical_incapacity_NMA;

      let DHrequired;
      Total_SOS.forEach((t) => {
        DHrequired = Total_after_sales + After_Sales_spl + t;
      });

      Total_afm_Attrition.push(w.After_Sales_ActualDH.Attrition);
      Total_afm_Transfert.push(w.After_Sales_ActualDH.Transfer);
      Total_afm_Hiring.push(w.After_Sales_ActualDH.Hiring);

      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        last_Project_HC.forEach((h) => {
          Total_lasHc += w.After_Sales_ActualDH.last_HC + h;
        });
      }
      Total_AFM_Required.push(DHrequired);
    });
    last_Pr_AFM_HC.push(Total_lasHc);
  });

  let Logistic_DH_REQUIRED = [];
  let SPL_LOgistic = [];
  let TOTAL_pro_log_pw = [];
  let TOTAL_pro_log_MAT = [];
  let TOTAL_pro_log_BF = [];
  let TOTAL_pro_log_LI = [];
  let TOTAL_pro_log_PY = [];
  let last_Pr_Log_HC = [];
  let Total_Log_Attrition = [];
  let Total_Log_Transfert = [];
  let Total_Log_Hiring = [];

  Logistic.map((y) => {
    let Total_lasHc = 0;
    y.weeks.map((w) => {
      const Logistic_Dh =
        w.Logistic_DH.KSK_Printing_Orders +
        w.Logistic_DH.Sequencing +
        w.Logistic_DH.Reception_Warehouse +
        w.Logistic_DH.RM_DR +
        w.Logistic_DH.FG_Warehouse +
        w.Logistic_DH.FG_DR;

      const Spl =
        w.Logistic_SPL.Pregnant_women_out_of_the_plant +
        w.Logistic_SPL.Maternity +
        w.Logistic_SPL.Breastfeeding_leave +
        w.Logistic_SPL.LTI_Long_term_weaknesses_LWD +
        w.Logistic_SPL.Physical_incapacity_NMA;
      SPL_LOgistic.push(Spl);

      let total_pw = 0;
      Total_PW.forEach((t) => {
        total_pw = t + w.Logistic_SPL.Pregnant_women_out_of_the_plant;
      });
      TOTAL_pro_log_pw.push(total_pw);

      let total_ma = 0;
      Total_PW.forEach((t) => {
        total_ma = t + w.Logistic_SPL.Maternity;
      });
      TOTAL_pro_log_MAT.push(total_ma);

      let total_bf = 0;
      Total_BF.forEach((t) => {
        total_bf = t + w.Logistic_SPL.Breastfeeding_leave;
      });
      TOTAL_pro_log_BF.push(total_bf);

      let total_li = 0;
      Total_LI.forEach((t) => {
        total_li = t + w.Logistic_SPL.LTI_Long_term_weaknesses_LWD;
      });
      TOTAL_pro_log_LI.push(total_li);

      let total_PY = 0;
      Total_PY.forEach((t) => {
        total_PY = t + w.Logistic_SPL.Physical_incapacity_NMA;
      });
      TOTAL_pro_log_PY.push(total_PY);

      let dh_required = 0;
      dh_required = Logistic_Dh + Spl;
      Logistic_DH_REQUIRED.push(dh_required);

      Total_Log_Attrition.push(w.Logistic_actual_Dh.Attrition);
      Total_Log_Transfert.push(w.Logistic_actual_Dh.Transfer);
      Total_Log_Hiring.push(w.Logistic_actual_Dh.Hiring);

      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        last_Pr_AFM_HC.forEach((h) => {
          Total_lasHc += w.Logistic_actual_Dh.Last_dh + h;
        });
      }
    });
    last_Pr_Log_HC.push(Total_lasHc);
  });

  let Quality_Others = [];
  let Total_Q_SPL = [];
  let Final_pw = [];
  let Final_ma = [];
  let Final_BF = [];
  let Final_li = [];
  let Final_py = [];
  let Last_Hc_Quality = [];
  let Total_Qual_Attrition = [];
  let Total_Qual_Transfert = [];
  let Total_Qual_Hiring = [];

  Quality.map((y) => {
    let total_hc = 0;
    y.weeks.map((w) => {
      const Total_Quality_Others =
        w.Quality_Other_DH.Supper_Control +
        w.Quality_Other_DH.Fire_Wall +
        w.Quality_Other_DH.Validation +
        w.Quality_Other_DH.FTQ_Data_Recording +
        w.Quality_Other_DH.RM_Sorting_FG_Wearhouse +
        w.Quality_Other_DH.Containment_Back_up +
        w.Quality_Other_DH.Excess;
      Quality_Others.push(Total_Quality_Others);

      const SPL =
        w.Quality_Special_list_out_of_the_plant
          .Pregnant_women_out_of_the_plant +
        w.Quality_Special_list_out_of_the_plant.Maternity +
        w.Quality_Special_list_out_of_the_plant.Breastfeeding_leave +
        w.Quality_Special_list_out_of_the_plant.LTI_Long_term_weaknesses_LWD +
        w.Quality_Special_list_out_of_the_plant.Physical_incapacity_NMA;
      Total_Q_SPL.push(SPL);

      let total_pw = 0;
      TOTAL_pro_log_pw.forEach((t) => {
        total_pw =
          t +
          w.Quality_Special_list_out_of_the_plant
            .Pregnant_women_out_of_the_plant;
      });
      Final_pw.push(total_pw);

      let total_ma = 0;
      TOTAL_pro_log_MAT.forEach((t) => {
        total_ma = t + w.Quality_Special_list_out_of_the_plant.Maternity;
      });
      Final_ma.push(total_ma);

      let total_bf = 0;
      TOTAL_pro_log_BF.forEach((t) => {
        total_bf =
          t + w.Quality_Special_list_out_of_the_plant.Breastfeeding_leave;
      });
      Final_BF.push(total_bf);

      let total_li = 0;
      TOTAL_pro_log_LI.forEach((t) => {
        total_li =
          t +
          w.Quality_Special_list_out_of_the_plant.LTI_Long_term_weaknesses_LWD;
      });
      Final_li.push(total_li);

      let total_py = 0;
      TOTAL_pro_log_PY.forEach((t) => {
        total_py =
          t + w.Quality_Special_list_out_of_the_plant.Physical_incapacity_NMA;
      });
      Final_py.push(total_py);

      Total_Qual_Attrition.push(w.Quality_Actual_DH.Attrition);
      Total_Qual_Transfert.push(w.Quality_Actual_DH.Transfer);
      Total_Qual_Hiring.push(w.Quality_Actual_DH.Hiring);

      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        last_Pr_Log_HC.forEach((v) => {
          total_hc += v + w.Quality_Actual_DH.Last_dh;
        });
      }
    });
    Last_Hc_Quality.push(total_hc);
  });

  let Cutt_LP_DHrequired = [];
  let Cutting_Actual_DH = [];
  let prevCutting = 0;
  let Gap_Cut = [];

  let LP_Dh_Required = [];
  let LP_Actual_DH = [];
  let prevLP = 0;
  let Gap_LP = [];
  let Total_Plant_Last_Hc = 0;
  let Cutting_LP_Attrition = [];
  let Cutting_LP_Transfert = [];
  let Cutting_LP_Hiring = [];

  let Total_Cutting_Attrition = [];
  let Total_Cutting_Transfert = [];
  let Total_Cutting_Hiring = [];

  let Total_LP_Attrition = [];
  let Total_LP_Transfert = [];
  let Total_LP_Hiring = [];

  Cutting.map((y) => {
    y.weeks.map((w) => {
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        Total_Plant_Last_Hc =
          w.Cutting_Actual_DH.Last_dh +
          w.LP_ActualDH.Last_dh +
          Last_Hc_Quality[0];
      }

      //Cutting
      let Machins_Calculs = w.Cutting_DH_Required.Machines_FT_s_Projection / 5;
      let polyvalents = Machins_Calculs > 24 ? 24 : Machins_Calculs;

      const Dh_Required =
        w.Cutting_DH_Required.Machines_FT_s_Projection +
        polyvalents +
        w.Cutting_DH_Required.Contention +
        w.Cutting_DH_Required.Absenteeism +
        w.Cutting_DH_Required.Training +
        w.Cutting_DH_Required.Big_Brother +
        w.Cutting_DH_Required.Long_Term_Illness +
        w.Cutting_DH_Required.Attrition_Backup +
        w.Cutting_DH_Required.SOS +
        w.Cutting_DH_Required.D_C_Pre_set_up_Reception_delivery +
        w.Cutting_DH_Required.Rework_pagode_Scrap_stock_aken;
      Cutt_LP_DHrequired.push(Dh_Required);

      let ActualDh;
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        ActualDh =
          w.Cutting_Actual_DH.Last_dh -
          w.Cutting_Actual_DH.Attrition -
          w.Cutting_Actual_DH.Transfer +
          w.Cutting_Actual_DH.Hiring;
      } else {
        ActualDh =
          prevCutting -
          w.Cutting_Actual_DH.Attrition -
          w.Cutting_Actual_DH.Transfer +
          w.Cutting_Actual_DH.Hiring;
      }

      prevCutting = ActualDh;
      Cutting_Actual_DH.push(ActualDh);
      let Gap_Cutting = 0;
      Gap_Cutting = ActualDh - Dh_Required;
      Gap_Cut.push(Gap_Cutting);

      //Lp

      const Lp_DH_Required =
        w.LP_DH_Required.LP_HD +
        w.LP_DH_Required.Polyvalents +
        w.LP_DH_Required.Contention +
        w.LP_DH_Required.Absenteeism +
        w.LP_DH_Required.Long_Term_Illness +
        w.LP_DH_Required.Training +
        w.LP_DH_Required.Attrition_Backup +
        w.LP_DH_Required.SOS +
        w.LP_DH_Required.Prototypes +
        w.LP_DH_Required.DR +
        w.LP_DH_Required.LP_Support_Internal_DR_Die_centre +
        w.LP_DH_Required.Rework;
      LP_Dh_Required.push(Lp_DH_Required);

      let ActualDhLP;
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        ActualDhLP =
          w.LP_ActualDH.Last_dh -
          w.LP_ActualDH.Attrition -
          w.LP_ActualDH.Transfer +
          w.LP_ActualDH.Hiring;
      } else {
        ActualDhLP =
          prevLP -
          w.LP_ActualDH.Attrition -
          w.LP_ActualDH.Transfer +
          w.LP_ActualDH.Hiring;
      }

      prevLP = ActualDhLP;
      LP_Actual_DH.push(ActualDhLP);

      let gaplp = 0;
      gaplp = ActualDhLP - Lp_DH_Required;
      Gap_LP.push(gaplp);

      const total_attri =
        w.Cutting_Actual_DH.Attrition + w.LP_ActualDH.Attrition;

      const total_trans = w.Cutting_Actual_DH.Transfer + w.LP_ActualDH.Transfer;

      const total_hir = w.Cutting_Actual_DH.Hiring + w.LP_ActualDH.Hiring;

      Total_Cutting_Attrition.push(w.Cutting_Actual_DH.Attrition);
      Total_Cutting_Transfert.push(w.Cutting_Actual_DH.Transfer);
      Total_Cutting_Hiring.push(w.Cutting_Actual_DH.Hiring);

      Total_LP_Attrition.push(w.LP_ActualDH.Attrition);
      Total_LP_Transfert.push(w.LP_ActualDH.Transfer);
      Total_LP_Hiring.push(w.LP_ActualDH.Hiring);

      Cutting_LP_Attrition.push(total_attri);
      Cutting_LP_Transfert.push(total_trans);
      Cutting_LP_Hiring.push(total_hir);
    });
  });

  let Total_AFM = [];
  for (let i = 0; i < Total_of_all_Projects.length; i++) {
    let weekToltal =
      Total_of_all_Projects[i] +
      Total_AFM_Required[i] +
      Logistic_DH_REQUIRED[i] +
      Quality_Others[i];
    Total_AFM.push(weekToltal);
  }

  let Total_Special_List = [];
  for (let i = 0; i < Total_Projects_SPL.length; i++) {
    const toatl_spl = Total_Projects_SPL[i] + Total_Q_SPL[i] + SPL_LOgistic[i];
    Total_Special_List.push(toatl_spl);
  }
  let Total_atrition = [];
  for (let i = 0; i < Total_pro_Attrition.length; i++) {
    const total =
      Total_pro_Attrition[i] +
      Total_afm_Attrition[i] +
      Total_Log_Attrition[i] +
      Total_Qual_Attrition[i];
    Total_atrition.push(total);
  }
  let Total_transfert = [];
  for (let i = 0; i < Total_pro_Transfet.length; i++) {
    const total =
      Total_pro_Transfet[i] +
      Total_afm_Transfert[i] +
      Total_Log_Transfert[i] +
      Total_Qual_Transfert[i];
    Total_transfert.push(total);
  }
  let Total_Hiring = [];
  for (let i = 0; i < Total_pro_Hiring.length; i++) {
    const total =
      Total_pro_Hiring[i] +
      Total_afm_Hiring[i] +
      Total_Log_Hiring[i] +
      Total_Qual_Hiring[i];
    Total_Hiring.push(total);
  }

  let Total_Actual_DH = [];
  let prev = 0;
  let i = 1;

  projectData.map((y) => {
    y.weeks.map((w) => {
      let actualDh;

      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        actualDh =
          Last_Hc_Quality[0] -
          Total_atrition[0] -
          Total_transfert[0] +
          Total_Hiring[0];
        prev = actualDh;
        Total_Actual_DH.push(actualDh);
      } else {
        actualDh =
          prev - Total_atrition[i] - Total_transfert[i] + Total_Hiring[i];
        prev = actualDh;
        i++;
        Total_Actual_DH.push(actualDh);
      }
    });
  });

  //calculate Gap

  let Gap = [];
  for (let i = 0; i < Total_Actual_DH.length; i++) {
    let gap = Total_Actual_DH[i] - Total_AFM[i];
    Gap.push(Math.floor(gap));
  }

  //calculate total plant

  let Total_Plant_Required = [];
  let Total_plant_atrition = [];
  let Total_plant_trans = [];
  let Total_plant_hiring = [];

  for (let i = 0; i < Total_AFM.length; i++) {
    const total = Total_AFM[i] + Cutt_LP_DHrequired[i] + LP_Dh_Required[i];
    Total_Plant_Required.push(Math.floor(total));
  }

  for (let i = 0; i < Total_atrition.length; i++) {
    const total = Cutting_LP_Attrition[i] + Total_atrition[i];
    Total_plant_atrition.push(total);
  }

  for (let i = 0; i < Total_transfert.length; i++) {
    const total = Cutting_LP_Transfert[i] + Total_transfert[i];
    Total_plant_trans.push(total);
  }

  for (let i = 0; i < Total_Hiring.length; i++) {
    const total = Cutting_LP_Hiring[i] + Total_Hiring[i];
    Total_plant_hiring.push(total);
  }

  let plant_Actual_Dh = [];
  let prevplant = 0;
  let prevI = 1;

  Cutting.map((y) => {
    y.weeks.map((w) => {
      let actualDH;
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        actualDH =
          Total_Plant_Last_Hc -
          Total_plant_atrition[0] -
          Total_plant_trans[0] +
          Total_plant_hiring[0];
      } else {
        actualDH =
          prevplant -
          Total_plant_atrition[prevI] -
          Total_plant_trans[prevI] +
          Total_plant_hiring[prevI];
        prevI++;
      }
      prevplant = actualDH;
      plant_Actual_Dh.push(actualDH);
    });
  });

  let Gap_Plant = [];
  for (let i = 0; i < Total_Plant_Required.length; i++) {
    const gap = plant_Actual_Dh[i] - Total_Plant_Required[i];
    Gap_Plant.push(gap);
  }

  //calculate Average
  const weeks = generateWeeks();
  const months = new Set(weeks.map((week) => week.month));
  const Months = Array.from(months);

  const average_FA_PerMonth = Calculate_Average(Total_AFM, weeks);
  const average_AFM_perMonth = Calculate_Average(Total_AFM_Required, weeks);
  const average_Logistic_perMonth = Calculate_Average(
    Logistic_DH_REQUIRED,
    weeks
  );
  const average_Quality_perMonth = Calculate_Average(Quality_Others, weeks);
  const projectAverages = Object.entries(Total_Projects).map(([n, val]) => {
    const average = Calculate_Average(val, weeks);
    return { n, average };
  });
  const OS_AVG = Calculate_Average(Total_OS, weeks);
  const Special_ListAVG = Calculate_Average(Total_Special_List, weeks);
  const ActualDh_AVG = Calculate_Average(Total_Actual_DH, weeks);
  const Attrition_AVG = Calculate_Average(Total_atrition, weeks);
  const Transfert_AVG = Calculate_Average(Total_transfert, weeks);
  const Hiring_AVG = Calculate_Average(Total_Hiring, weeks);
  const Gap_AVG = Calculate_Average(Gap, weeks);

  //Plant Average
  const Plant_Cutting_DH = Calculate_Average(Cutt_LP_DHrequired, weeks);
  const Plant_Cutting_Actual_DH = Calculate_Average(Cutting_Actual_DH, weeks);

  const Plant_LP_DH = Calculate_Average(LP_Dh_Required, weeks);
  const Plant_LP_ActualDH = Calculate_Average(LP_Actual_DH, weeks);

  const Plant_Cutting_Attrition = Calculate_Average(
    Total_Cutting_Attrition,
    weeks
  );
  const Plant_Cutting_Transfert = Calculate_Average(
    Total_Cutting_Transfert,
    weeks
  );
  const Plant_Cutting_Hiring = Calculate_Average(Total_Cutting_Hiring, weeks);

  const Plant_LP_Attrition = Calculate_Average(Total_LP_Attrition, weeks);
  const Plant_LP_Transfert = Calculate_Average(Total_LP_Transfert, weeks);
  const Plant_LP_Hiring = Calculate_Average(Total_LP_Hiring, weeks);

  const GapCutting = Calculate_Average(Gap_Cut, weeks);
  const GapLP = Calculate_Average(Gap_LP, weeks);
  const Plant_Required = Calculate_Average(Total_Plant_Required, weeks);
  const Plant_Actual = Calculate_Average(plant_Actual_Dh, weeks);

  const Plant_Attrition = Calculate_Average(Total_plant_atrition, weeks);
  const Plant_Transfert = Calculate_Average(Total_plant_trans, weeks);
  const Plant_Hiring = Calculate_Average(Total_plant_hiring, weeks);
  const GAP_PLANT_Hiring = Calculate_Average(Gap_Plant, weeks);

  const renderView = () => {
    switch (view) {
      case "table":
        return (
          <>
            <div className={c.table}>
              <table>
                <TableHeader />
                <tbody>
                  <React.Fragment>
                    <tr className={c.total}>
                      <td>FA Dh required </td>
                      {Total_AFM.map((t, i) => (
                        <td key={i}>{Math.floor(t)}</td>
                      ))}
                    </tr>

                    <React.Fragment>
                      {Object.entries(Total_Projects).map(([n, val], i) => (
                        <tr key={i}>
                          <td>{n}</td>
                          {val.map((v, j) => (
                            <td key={j}>{v}</td>
                          ))}
                        </tr>
                      ))}

                      <tr>
                        <td>After Market</td>
                        {Total_AFM_Required.map((a, i) => (
                          <td key={i}>{a}</td>
                        ))}
                      </tr>

                      <tr>
                        <td>MPC</td>
                        {Logistic_DH_REQUIRED.map((l, i) => (
                          <td key={i}>{l}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Quality Others </td>
                        {Quality_Others.map((q, i) => (
                          <td key={i}>{q}</td>
                        ))}
                      </tr>
                    </React.Fragment>

                    <React.Fragment>
                      <tr className={c.total}>
                        <td>OS</td>
                        {Total_OS.map((o, i) => (
                          <td key={i}>{o}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Digitalization</td>
                        {Total_OS_Digitalisation.map((o, i) => (
                          <td key={i}>{o}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Daily Kaizen</td>
                        {Total_OS_Daily_Kaizen.map((k, i) => (
                          <td key={i}>{k}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>OS Data Reporting</td>
                        {Total_OS_Data_Reporting.map((r, i) => (
                          <td key={i}>{r}</td>
                        ))}
                      </tr>
                    </React.Fragment>

                    <React.Fragment>
                      <tr className={c.total}>
                        <td>FA special List</td>
                        {Total_Special_List.map((sp, i) => (
                          <td key={i}>{sp}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Pregnant Women</td>
                        {Final_pw.map((w, i) => (
                          <td key={i}>{w}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Maternity</td>
                        {Final_ma.map((m, i) => (
                          <td key={i}>{m}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Breastfeeding leave</td>
                        {Final_BF.map((m, i) => (
                          <td key={i}>{m}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>LTI: Long term weaknesses, LWD,</td>
                        {Final_li.map((m, i) => (
                          <td key={i}>{m}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Physical incapacity & NMA</td>
                        {Final_py.map((m, i) => (
                          <td key={i}>{m}</td>
                        ))}
                      </tr>
                    </React.Fragment>

                    <React.Fragment>
                      <tr className={c.total}>
                        <td>FA Actual DH</td>
                        {Total_Actual_DH.map((a, i) => (
                          <td key={i}>{Math.floor(a)}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Attrition</td>
                        {Total_atrition.map((a, i) => (
                          <td key={i}>{a}</td>
                        ))}
                      </tr>
                      <tr>
                        <td> Transfer</td>
                        {Total_transfert.map((a, i) => (
                          <td key={i}>{a}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Hiring</td>
                        {Total_Hiring.map((a, i) => (
                          <td key={i}>{a}</td>
                        ))}
                      </tr>
                    </React.Fragment>

                    <tr className={c.total}>
                      <td>FA Gap</td>
                      {Gap.map((g, i) => (
                        <td key={i}>{g}</td>
                      ))}
                    </tr>
                  </React.Fragment>

                  <React.Fragment>
                    <h3>Cutting</h3>
                  </React.Fragment>

                  <React.Fragment>
                    <tr className={c.total}>
                      <td>Cutting DH Required</td>
                      {Cutt_LP_DHrequired.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                    <React.Fragment>
                      <tr className={c.total}>
                        <td>Cutting Actual DH</td>
                        {Cutting_Actual_DH.map((v, i) => (
                          <td key={i}>{v}</td>
                        ))}
                      </tr>

                      <tr>
                        <td>Attrition</td>
                        {Cutting.map((y) =>
                          y.weeks.map((w) => {
                            const data = w.Cutting_Actual_DH.Attrition;
                            return <td key={w._id}>{data}</td>;
                          })
                        )}
                      </tr>

                      <tr>
                        <td>Transfer</td>
                        {Cutting.map((y) =>
                          y.weeks.map((w) => {
                            const data = w.Cutting_Actual_DH.Transfer;
                            return <td key={w._id}>{data}</td>;
                          })
                        )}
                      </tr>
                      <tr>
                        <td>Hiring</td>
                        {Cutting.map((y) =>
                          y.weeks.map((w) => {
                            const data = w.Cutting_Actual_DH.Hiring;
                            return <td key={w._id}>{data}</td>;
                          })
                        )}
                      </tr>
                      <tr className={c.total}>
                        <td>Cutting Gap </td>
                        {Gap_Cut.map((v, i) => (
                          <td key={i}>{v}</td>
                        ))}
                      </tr>
                    </React.Fragment>
                  </React.Fragment>

                  <React.Fragment>
                    <div>
                      <h3>LP</h3>
                    </div>
                  </React.Fragment>

                  <React.Fragment>
                    <tr className={c.total}>
                      <td>LP DH required </td>
                      {LP_Dh_Required.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                    <tr className={c.total}>
                      <td>LP DH actual</td>
                      {LP_Actual_DH.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>

                    <tr>
                      <td>Attrition</td>
                      {Cutting.map((y) =>
                        y.weeks.map((w) => {
                          const data = w.LP_ActualDH.Attrition;
                          return <td key={w._id}>{data}</td>;
                        })
                      )}
                    </tr>
                    <tr>
                      <td>Transfer</td>
                      {Cutting.map((y) =>
                        y.weeks.map((w) => {
                          const data = w.LP_ActualDH.Transfer;
                          return <td key={w._id}>{data}</td>;
                        })
                      )}
                    </tr>
                    <tr>
                      <td>Hiring</td>
                      {Cutting.map((y) =>
                        y.weeks.map((w) => {
                          const data = w.LP_ActualDH.Hiring;
                          return <td key={w._id}>{data}</td>;
                        })
                      )}
                    </tr>
                    <tr className={c.total}>
                      <td>LP Gap</td>
                      {Gap_LP.map((g, i) => (
                        <td key={i}>{g}</td>
                      ))}
                    </tr>
                  </React.Fragment>

                  <React.Fragment>
                    <div>
                      <h3> Plant GAP </h3>
                    </div>
                  </React.Fragment>
                  <React.Fragment>
                    <tr className={c.total}>
                      <td>Total Plant Required</td>
                      {Total_Plant_Required.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Total Plant DH Actual</td>
                      {plant_Actual_Dh.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Attrition</td>
                      {Total_plant_atrition.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Transfert</td>
                      {Total_plant_trans.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Hiring</td>
                      {Total_plant_hiring.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                    <tr className={c.total}>
                      <td> Total Plant Gap</td>
                      {Gap_Plant.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                  </React.Fragment>
                </tbody>
              </table>
            </div>
          </>
        );
      case "summary":
        return (
          <>
            <div className={c.table}>
              <table>
                <thead>
                  <tr>
                    <th>Months</th>
                    {Months.map((m, i) => (
                      <td key={i}>{m}</td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <React.Fragment>
                    <tr className={c.total}>
                      <td>FA DH Required</td>
                      {Object.entries(average_FA_PerMonth).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>

                    {projectAverages.map((p, i) => (
                      <tr key={i}>
                        <td>{p.n}</td>
                        {Object.values(p.average).map((avg, i) => (
                          <td key={i}>{avg}</td>
                        ))}
                      </tr>
                    ))}

                    <tr>
                      <td>After Sales </td>
                      {Object.entries(average_AFM_perMonth).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Quality Other DH</td>
                      {Object.entries(average_Quality_perMonth).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>MPC DH</td>
                      {Object.entries(average_Logistic_perMonth).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                  </React.Fragment>

                  <React.Fragment>
                    <tr className={c.total}>
                      <td>FA Actual DH</td>
                      {Object.entries(ActualDh_AVG).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Attrition</td>
                      {Object.entries(Attrition_AVG).map((x, i) => (
                        <td key={i}>{x[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Transfer </td>
                      {Object.entries(Transfert_AVG).map((x, i) => (
                        <td key={i}>{x[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Hiring</td>
                      {Object.entries(Hiring_AVG).map((x, i) => (
                        <td key={i}>{x[1]}</td>
                      ))}
                    </tr>
                  </React.Fragment>
                  <React.Fragment>
                    <tr className={c.total}>
                      <td>OS</td>
                      {Object.entries(OS_AVG).map((n, i) => (
                        <td key={i}>{n[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>FA special List </td>
                      {Object.entries(Special_ListAVG).map((b, i) => (
                        <td key={i}>{b[1]}</td>
                      ))}
                    </tr>
                  </React.Fragment>
                  <React.Fragment>
                    <tr className={c.total}>
                      <td>Gap</td>
                      {Object.entries(Gap_AVG).map((x, i) => (
                        <td key={i}>{x[1]}</td>
                      ))}
                    </tr>
                  </React.Fragment>
                </tbody>
              </table>
            </div>

            <div className={c.table}>
              <table>
                <tbody>
                  <React.Fragment>
                    <tr className={c.total}>
                      <td>Cutting DH Required</td>
                      {Object.entries(Plant_Cutting_DH).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr className={c.total}>
                      <td>Cutting DH Actual</td>
                      {Object.entries(Plant_Cutting_Actual_DH).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>

                    <tr>
                      <td>Attrition</td>
                      {Object.entries(Plant_Cutting_Attrition).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Transfer</td>
                      {Object.entries(Plant_Cutting_Transfert).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Hiring</td>
                      {Object.entries(Plant_Cutting_Hiring).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr className={c.total}>
                      <td>Cutting Gap </td>

                      {Object.entries(GapCutting).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                  </React.Fragment>
                </tbody>
              </table>
            </div>

            <div className={c.table}>
              <table>
                <tbody>
                  <React.Fragment>
                    <tr className={c.total}>
                      <td>LP DH Required</td>
                      {Object.entries(Plant_LP_DH).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr className={c.total}>
                      <td>LP DH Actual</td>
                      {Object.entries(Plant_LP_ActualDH).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Attrition</td>
                      {Object.entries(Plant_LP_Attrition).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Transfer</td>
                      {Object.entries(Plant_LP_Transfert).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Hiring</td>
                      {Object.entries(Plant_LP_Hiring).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>

                    <tr className={c.total}>
                      <td>Gap LP </td>
                      {Object.entries(GapLP).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                  </React.Fragment>
                </tbody>
              </table>
            </div>

            <div className={c.table}>
              <table>
                <tbody>
                  <React.Fragment>
                    <tr className={c.total}>
                      <td>Total Plant Required</td>
                      {Object.entries(Plant_Required).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr className={c.total}>
                      <td>Total Plant DH Actual</td>
                      {Object.entries(Plant_Actual).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>

                    <tr>
                      <td>Attrition</td>
                      {Object.entries(Plant_Attrition).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Transfer</td>
                      {Object.entries(Plant_Transfert).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Hiring</td>
                      {Object.entries(Plant_Hiring).map((v, i) => (
                        <td key={i}>{v[1]}</td>
                      ))}
                    </tr>
                  </React.Fragment>
                  <tr className={c.total}>
                    <td>Total Plant GAP </td>

                    {Object.entries(GAP_PLANT_Hiring).map((v, i) => (
                      <td key={i}>{v[1]}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div className={c.header}>
        <h2
          onClick={() => {
            setView("table");
          }}
          className={c.Summary}
        >
          DH_WALK {new Date().getFullYear()}
        </h2>
        <h2
          onClick={() => {
            setView("summary");
          }}
          className={c.Summary}
        >
          Summary DH Walk
        </h2>
      </div>

      {loading ? <Loadings /> : renderView()}
    </>
  );
};
export default DH_WALK;
