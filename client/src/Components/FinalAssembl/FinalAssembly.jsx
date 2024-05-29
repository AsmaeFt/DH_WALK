import c from "./FinalAssembly.module.css";
import api from "../../services/api";
import React, { useCallback, useEffect, useState } from "react";
import TableHeader from "../UI/TableHeader";
import Project from "./Project";
import OS_afm from "./OS_afm";
import axios from "axios";
import Loading from "../UI/Loading";
import Legend from "../UI/Legend";
import Title from "../UI/Title";

const FinalAssembly = () => {
  const [pr, setpr] = useState([]);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [sproj, setsproj] = useState("K9 KSK");
  const [family, setfamily] = useState([]);
  const [currentView, setCurrentView] = useState("Project");
  const [activeLabel, setactiveLabel] = useState("K9 KSK");

  const projects = useCallback(async () => {
    const res = await axios.get(`${api}/Get_project`);
    const prj = res.data.flatMap((p) => p.name);
    setpr(prj);

    const fam = await res.data
      .filter((p) => p.name === sproj)
      .flatMap((p) => p.family)
      .map((f) => f.name);
    setfamily(fam);
  }, [sproj]);
  useEffect(() => {
    projects();
  }, [projects]);

  const fetchInitialData = useCallback(async () => {
    const res = await axios.get(`${api}/getfiltredata?projectName=K9 KSK`);
    const data = res.data;
    setdata(data);
    setloading(false);
  }, []);
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const filterdata = async (p) => {
    try {
      const res = await axios.get(`${api}/getfiltredata?projectName=${p}`);
      const data = res.data;
      setdata(data);
      setsproj(p);
      setloading(false);
      setactiveLabel(p);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDataUpdate = (newData) => {
    setdata(newData);
  };

  const renderview = () => {
    switch (currentView) {
      case "Project":
        return (
          <Project
            data={data}
            sproject={sproj}
            family={family}
            updateData={handleDataUpdate}
          />
        );
      case "AFM":
        return <OS_afm project={pr} />;
    }
  };

  return (
    <>
    

      <Title title={"Final Assembly"} />

      <div className={c.projects}>
        {pr.flatMap((p, i) => (
          <label
            className={activeLabel === p ? c.active_label : ""}
            key={i}
            onClick={() => {
              filterdata(p);
              setCurrentView("Project");
            }}
          >
            {p}
          </label>
        ))}
        <label
          className={activeLabel === "OS" ? c.active_label : ""}
          onClick={() => {
            setCurrentView("AFM"), setactiveLabel("OS");
          }}
        >
          OS - AFM
        </label>
      </div>
      <React.Fragment>
        <Legend/>
      </React.Fragment>
      {loading ? (
        <div className={c.loading}>
          <Loading />
        </div>
      ) : (
        <div className={c.table}>
          <table>
            <TableHeader />
            {renderview()}
          </table>
        </div>
      )}
    </>
  );
};
export default FinalAssembly;
