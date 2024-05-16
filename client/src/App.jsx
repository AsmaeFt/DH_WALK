import { Suspense } from "react";
import store from "./store";
import { projectActions } from "./store/ProjectdataSlice";
import { dataActions } from "./store/DataSlice";

import { useDispatch } from "react-redux";

import { Route, Routes } from "react-router-dom";
//Import Components
import Loading from "./Components/UI/Loading";

import api from "./services/api";
import axios from "axios";
import NavBar from "./Components/layout/Navbar";
import Dhwalk from "./pages/Dhwalk";
import FinalAssembly from "./Components/FinalAssembl/FinalAssembly";
import Quality from "./Components/Quality/Quality";
import MPC from "./Components/Logistic/Logistic";

import Add_data from "./Components/ADD_data/FinalAssembl";
import "./App.css";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [ProjectData, setProjectData] = useState([]);
  const [AFM, setAFM] = useState([]);
  const [Logistic, setLogistic] = useState([]);

  const dispatch = useDispatch();
  const { setData } = projectActions;
  const { setDhwalk } = dataActions;

  //Project Data
  const fetch_ProjectData = useCallback(async () => {
    const res = await axios.get(`${api}/assembly_project`);
    setProjectData(res.data);
    dispatch(setData(res.data));
  }, [setData, dispatch]);
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

  let DH_WALK_DATA = [];

  let Total_SOS = [];
  let TotalProject = {};
  ProjectData.map((y) => {
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

        if (!TotalProject[p.projectName]) {
          TotalProject[p.projectName] = [];
        }
        TotalProject[p.projectName].push(Math.floor(Total_pr));
      });
      Total_SOS.push(sos);
    });
    DH_WALK_DATA.push(TotalProject);
  });

  let total_AF = [];
  let total_SPL = [];
  let Total_AFM_Required = [];
  let total_ActualDh = [];
  let prev = 0;
  let Gap = [];

  AFM.map((y) => {
    y.weeks.map((w) => {
      let Total_after_sales = 0;
      w.After_Sales.map((af) => {
        Total_after_sales += af.value;
      });
      total_AF.push(Total_after_sales);

      const After_Sales_spl =
        w.After_Sales_spl.Pregnant_women_out_of_the_plant +
        w.After_Sales_spl.Maternity +
        w.After_Sales_spl.Breastfeeding_leave +
        w.After_Sales_spl.LTI_Long_term_weaknesses_LWD +
        w.After_Sales_spl.Physical_incapacity_NMA;
      total_SPL.push(After_Sales_spl);

      let DHrequired;
      Total_SOS.forEach((t) => {
        DHrequired = Total_after_sales + After_Sales_spl + t;
      });
      Total_AFM_Required.push(DHrequired);

      let actualDH;
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        actualDH =
          w.After_Sales_ActualDH.last_HC -
          w.After_Sales_ActualDH.Attrition -
          w.After_Sales.Transfer +
          w.After_Sales.Hiring;
        prev = actualDH;
      } else {
        actualDH =
          prev -
          w.After_Sales_ActualDH.Attrition -
          w.After_Sales.Transfer +
          w.After_Sales.Hiring;
        prev = actualDH;
      }
      total_ActualDh.push(actualDH);

      let gap = 0;
      gap = actualDH - DHrequired;
      Gap.push(gap);
    });
    DH_WALK_DATA.push(Total_AFM_Required);
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
    DH_WALK_DATA.push(Logistic_DH_REQUIRED);
  });

  setDhwalk(DH_WALK_DATA);

  return (
    <>
      <NavBar />
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Dhwalk />} />
            <Route path="/FAM" element={<FinalAssembly />} />
            <Route path="/Quality" element={<Quality />} />
            <Route path="/Logistic" element={<MPC />} />
            <Route path="/add_data" element={<Add_data />} />
            <Route path="/Loading" element={<Loading />} />
            <Route path="*" element={<p>Nothing to show here ! </p>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
export default App;
