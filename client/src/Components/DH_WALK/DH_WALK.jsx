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
  const [Qualit, setQuality] = useState([]);

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
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${api}/get_quality`);
      setQuality(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //calculations

  let Total_Projects = {};
  let Total_SOS = [];
  projectData.map((y) => {
    y.weeks.map((w) => {
      let sos = 0;
      w.projectData.map((p) => {
        const TotalOS =
          p.project_OS.Digitalization +
          p.project_OS.Daily_Kaizen +
          p.project_OS.OS_Auditing +
          p.project_OS.OS_Auditing_Data_Reporting;

        const totalSLOP =
          p.project_special_list.Pregnant_women_out_of_the_plant +
          p.project_special_list.Maternity +
          p.project_special_list.Breastfeeding_leave +
          p.project_special_list.LTI_Long_term_weaknesses_LWD +
          p.project_special_list.Physical_incapacity_NMA;

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

        if (!Total_Projects[p.projectName]) {
          Total_Projects[p.projectName] = [];
        }
        Total_Projects[p.projectName].push(Math.floor(Total_pr));
      });
      Total_SOS.push(sos);
    });
  });
console.log(Total_Projects);
  let Total_AFM_Required = [];
  AFM.map((y) => {
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
      Total_AFM_Required.push(DHrequired);
    });
  });

  let Logistic_DH_REQUIRED = [];
  Logistic.map((y) => {
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

      let dh_required = 0;
      dh_required = Logistic_Dh + Spl;
      Logistic_DH_REQUIRED.push(dh_required);
    });
  });

  let Total_AFM = [];



  return (
    <>
      <div className="header">
        <h2>DH_WALK {new Date().getFullYear()}</h2>
      </div>
      <div className={c.table}>
        <table>
          <TableHeader />
          <tbody>
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
            </React.Fragment>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default DH_WALK;
