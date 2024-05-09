import c from "./FinalAssembly.module.css";
import api from "../../services/api";
import { useCallback, useEffect, useState } from "react";
import TableHeader from "../UI/TableHeader";
import Project from "./Project";
import axios from "axios";

const FinalAssembly = () => {
  const [pr, setpr] = useState([]);
  const [data, setdata] = useState([]);
  const [sproj, setsproj] = useState("K9 KSK");

  const projects = useCallback(async () => {
    const res = await axios.get(`${api}/Get_project`);
    const prj = res.data.flatMap((p) => p.name);
    setpr(prj);
  }, []);
  useEffect(() => {
    projects();
  }, [projects]);

  const fetchInitialData = useCallback(async () => {
    const res = await axios.get(`${api}/getfiltredata?projectName=K9 KSK`);
    const data = await res.data;
    setdata(data);
  }, []);
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);
  c;
  const filterdata = async (p) => {
    try {
      const res = await axios.get(`${api}/getfiltredata?projectName=${p}`);
      setdata(await res.data);
      setsproj(p);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className={c.header}>
        <h2>Final Assembly </h2>
      </div>
      <div className={c.projects}>
        {pr.flatMap((p, i) => (
          <label key={i} onClick={() => filterdata(p)}>
            {p}
          </label>
        ))}
      </div>

      <div className={c.table}>
        <table>
          <TableHeader />
          <Project data={data} sproject={sproj} />
        </table>
      </div>
    </>
  );
};
export default FinalAssembly;
