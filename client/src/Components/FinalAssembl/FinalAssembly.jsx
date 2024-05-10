import c from "./FinalAssembly.module.css";
import api from "../../services/api";
import { useCallback, useEffect, useState } from "react";
import TableHeader from "../UI/TableHeader";
import Project from "./Project";
import OS_afm from "./OS_afm";
import axios from "axios";

const FinalAssembly = () => {
  const [pr, setpr] = useState([]);
  const [data, setdata] = useState([]);
  const [sproj, setsproj] = useState("K9 KSK");
  const [family, setfamily] = useState([]);
  const [currentView, setCurrentView] = useState("Project");

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
      <div className={c.header}>
        <h2>Final Assembly </h2>
      </div>
      <div className={c.projects}>
        {pr.flatMap((p, i) => (
          <label
            key={i}
            onClick={() => {
              filterdata(p);
              setCurrentView("Project");
            }}
          >
            {p}
          </label>
        ))}
        <label onClick={() => setCurrentView("AFM")}>OS - AFM</label>
      </div>

      <div className={c.table}>
        <table>
          <TableHeader />
          {renderview()}
          
        </table>
      </div>
    </>
  );
};
export default FinalAssembly;
