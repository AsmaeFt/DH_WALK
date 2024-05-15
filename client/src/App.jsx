import { Suspense } from "react";
import store from "./store";
import { projectActions } from "./store/ProjectdataSlice";
import { useDispatch } from "react-redux";

import { Route, Routes } from "react-router-dom";
//Import Components
import api from "./services/api";
import axios from "axios";
import NavBar from "./Components/layout/Navbar";
import Dhwalk from "./pages/Dhwalk";
import FinalAssembly from "./Components/FinalAssembl/FinalAssembly";
import Quality from "./Components/Quality/Quality";
import Logistic from "./Components/Logistic/Logistic";
import Dh_walk from "./Components/DH_Walk/Dh_Walk";
import Add_data from "./Components/ADD_data/FinalAssembl";
import "./App.css";
import { useCallback, useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const { setData } = projectActions;
  const fetch_ProjectData = useCallback(async () => {
    const res = await axios.get(`${api}/assembly_project`);
    dispatch(setData(res.data));
  }, [setData, dispatch]);

  useEffect(() => {
    fetch_ProjectData();
  }, [fetch_ProjectData]);

  return (
    <>
      <NavBar />
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Dhwalk />} />
            <Route path="/FAM" element={<FinalAssembly />} />
            <Route path="/Quality" element={<Quality />} />
            <Route path="/Logistic" element={<Logistic />} />
            <Route path="/Dh_walk" element={<Dh_walk />} />
            <Route path="/add_data" element={<Add_data />} />
            <Route path="*" element={<p>Nothing to show here ! </p>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
export default App;
