import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Test from "../Components/individuals/Test";
import Dhwalk from "../Components/individuals/Dhwalk";

import "./Home.css";
const Main = () => {
  const [Project, setProject] = useState([]);
  const [selectedProject, setselectedProject] = useState("K9 KSK");
  const [families, setFamilies] = useState([]);
  const [data, setdata] = useState([]);

  const [showDHwalk, setshowDHwalk] = useState(false);

  const getData = useCallback(async () => {
    const data = axios.get("http://10.236.150.19:8080/api/assembly_project");
    const globaldata = (await data).data;
    const filteredData = globaldata.map((yearData) => ({
      year: yearData.year,
      weeks: yearData.weeks
        .map((week) => ({
          week_name: week.week_name,
          projectData: week.projectData.filter(
            (project) => project.projectName === selectedProject
          ),
          _id: week._id,
        }))
        .filter((week) => week.projectData.length > 0),
    }));

    setdata(filteredData);
  }, [selectedProject]);
  useEffect(() => {
    getData();
  }, [getData]);

  const getProject = useCallback(async () => {
    try {
      const res = await axios.get("http://10.236.150.19:8080/api/Get_project");
      const Project = await res.data.flatMap((p) => p.name);
      const families = await res.data
        .filter((p) => p.name === selectedProject)
        .flatMap((p) => p.family)
        .map((f) => f.name);
      setFamilies(families);
      setProject(Project);

      return res.data;
    } catch (er) {
      console.error("error is ", er);
    }
  }, [selectedProject]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  const updatedatastate = (newData) => {
    setdata(newData);
  };

  const toggleDHwalk = () => {
    setshowDHwalk(!showDHwalk);
  };

  return (
    <>
      <h2>DH WALK</h2>
      <div className="projects">
        {Project.map((p, i) => (
          <label onClick={() => setselectedProject(p)} key={i}>
            {p}
          </label>
        ))}
      </div>
      <div className="table_container">
        <Test
          family={families}
          data={data}
          sproject={selectedProject}
          updateData={updatedatastate}
        />
      </div>
      <div>{showDHwalk && <Dhwalk />}</div>
    </>
  );
};

export default Main;
