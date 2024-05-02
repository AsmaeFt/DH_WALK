import axios from "axios";
import React, { useState } from "react";
const res = axios.get("http://10.236.150.19:8080/api/assembly_project");

const [data, setdata] = useState([]);
const selectedProject = "K9 KSK";

const globaldata = (await res).data;
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

data.flatMap((y) =>
  y.weeks.map((w) => {
    const project = w.projectData.find(
      (p) => p.projectName === selectedProject
    );
    if (project) {
      console.log(project.project_OS.Digitalization);
    }
  })
);
