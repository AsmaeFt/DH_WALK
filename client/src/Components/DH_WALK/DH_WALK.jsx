import React, { useState, useCallback, useEffect } from "react";
import c from "../FinalAssembl/FinalAssembly.module.css";
import TableHeader from "../UI/TableHeader";
import axios from "axios";
import api from "../../services/api";
import Loading from "../UI/Loading";

const DH_WALK = () => {
  const [projectData, setProjectData] = useState([]);
  const [AFM, setAFM] = useState([]);
  const [Logistic, setLogistic] = useState([]);
  const [Quality, setQuality] = useState([]);

  //Project Data
  const fetch_ProjectData = useCallback(async () => {
    const res = await axios.get(`${api}/assembly_project`);
    setProjectData(res.data);
  }, []);
  useEffect(() => {
    fetch_ProjectData();
  }, [fetch_ProjectData]);

  //Afm Data
  const fetch_AFMDATA = useCallback(async () => {
    try {
      const res = await axios.get(`${api}/GetOSAFM`);
      setAFM(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    fetch_AFMDATA();
  }, [fetch_AFMDATA]);

  //Logistic Data
  const Fetch_LogisticData = useCallback(async () => {
    try {
      const res = await axios.get(`${api}/get_Logistic`);
      setLogistic(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    Fetch_LogisticData();
  }, [Fetch_LogisticData]);

  //Quality Data
  const fetchQuality_Data = useCallback(async () => {
    try {
      const res = await axios.get(`${api}/get_quality`);
      setQuality(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchQuality_Data();
  }, [fetchQuality_Data]);

  //calculations

  let Total_Projects = {};
  let Total_SOS = [];

  let Total_of_all_Projects = [];
  let Total_OS_Digitalisation = [];
  let Total_OS_Daily_Kaizen = [];
  let Total_OS_Data_Reporting = [];
  const Total_OS = [];

  let Total_PW = [];
  let Total_Mat = [];
  let Total_BF = [];
  let Total_LI = [];
  let Total_PY = [];
  let Total_Projects_SPL = [];
  let last_Project_HC = [];

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
    });
    last_Project_HC.push(Total_lasHc);
  });
 
  let Total_AFM_Required = [];
  let last_Pr_AFM_HC = [];

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
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        last_Pr_Log_HC.forEach((v) => {
          total_hc += v + w.Quality_Actual_DH.Last_dh;
        });
      }
    });
    Last_Hc_Quality.push(total_hc);
  });

  console.log(Last_Hc_Quality);
  
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

  return (
    <>
      <div className="header">
        <h2>DH_WALK {new Date().getFullYear()}</h2>
      </div>
      <div className={c.table}>
        <table>
          <TableHeader />
          <tbody>
            <tr className={c.total}>
              <td>FA Dh required </td>
              {Total_AFM.map((t, i) => (
                <td key={i}>{t}</td>
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
          </tbody>
        </table>
      </div>
    </>
  );
};
export default DH_WALK;
