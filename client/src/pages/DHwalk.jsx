import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Home.css";
import Tabledata from "../Components/individuals/Tabledata";
import { message } from "antd";

const DHwalk = () => {
  const [Projects, setProjects] = useState([]);
  const [selectedProject, setselectedProject] = useState("K9 KSK");
  const [Family, setFamily] = useState([]);

  const [inputs, setinputs] = useState({});




  const [data, setdata] = useState([]);
  const getProjects = useCallback(async () => {
    try {
      const res = await axios.get("http://10.236.150.19:8080/api/Get_project");
      const data = await axios.get("http://10.236.150.19:8080/api/DATA");

      const projects = await res.data.map((p) => p.name);
      setProjects(projects);

      const FiltredData = data.data.flatMap((m) => ({
        month_name: m.month_name,
        weeks: m.weeks.flatMap((w) => ({
          week_name: w.week_name,
          projectData: w.projectData.filter(
            (p) => p.projectName === selectedProject
          ),
        })),
      }));
      setdata(FiltredData);

      const family = [
        ...new Set(
          FiltredData.flatMap((m) =>
            m.weeks.flatMap((w) =>
              w.projectData.flatMap((f) => f.family).map((f) => f.name)
            )
          )
        ),
      ];
      setFamily(family);
    } catch (err) {
      console.error("error is ", err);
    }
  }, [selectedProject]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const handleChange = (week, project, family, attribute, value) => {
    setinputs({
      week: week,
      project: project,
      family: family,
      attribute: attribute,
      value: value,
    });
  };

  const postData = useCallback(async () => {
    try {
      const res = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await axios.post(
              "http://10.236.150.19:8080/api/editable",
              inputs
            );
            resolve(response);
          } catch (error) {
            reject(error);
          }
        }, 100);
      });
      console.log(res.data);
      setdata(res.data);
      message.success("data has been saved");
      return res.data;
    } catch (err) {
      console.error("There was an error!", err);
    }
  }, [inputs]);

  useEffect(() => {
    postData();
  }, [postData]);

  return (
    <>
      <div className="header_container">
        <h2>DH Headcount Walk 2024</h2>
        <p>Weekly Walk</p>
      </div>

      <div className="projects">
        {Projects.map((p, i) => (
          <label
            key={i}
            onClick={() => {
              setselectedProject(p);
            }}
          >
            {p}
          </label>
        ))}
      </div>

      <Tabledata data={data} family={Family} selectedProject={selectedProject} handleChange={handleChange} />
    </>
  );
};

export default DHwalk;
