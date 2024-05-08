import React, { useCallback, useEffect, useState } from "react";
import Test from "../Components/individuals/Test";
import TableHeader from "../Components/ui/TableHeader";
import Os_AFM from "../Components/individuals/Os_AFM";
import { DATA, GettheProject } from "../services/api";
import "./Home.css";

const Main = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("K9 KSK");
  const [families, setFamilies] = useState([]);

  const [data, setData] = useState([]);

  const [currentView, setCurrentView] = useState("Test");
  const [globalData, setGlobalData] = useState([]);

  const fetchData = useCallback(async () => {
    const fetchedGlobalData = await DATA();
    setGlobalData(fetchedGlobalData);

    const filteredData = fetchedGlobalData.map((yearData) => ({
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

    setData(filteredData);
  }, [selectedProject]);

  useEffect(() => {
    const getData = () => fetchData();
    getData();
  }, [fetchData]);

  const fetchProject = useCallback(async () => {
    try {
      const { proj, fam } = await GettheProject(selectedProject);
      setFamilies(fam);
      setProjects(proj);
    } catch (err) {
      console.error("Error fetching project data:", err);
    }
  }, [selectedProject]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleDataUpdate = (newData) => {
    setData(newData);
  };

  
   

  const renderView = () => {
    switch (currentView) {
      case "Test":
        return (
          <Test
            family={families}
            data={data}
            sproject={selectedProject}
            updateData={handleDataUpdate}
          />
        );
      case "OtherComponent":
        return <Os_AFM project={projects} data={globalData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <h2>Final Assembly Projects</h2>
      <div className="projects">
        {projects.map((p, i) => (
          <label
            key={i}
            onClick={() => {
              setSelectedProject(p);
              setCurrentView("Test");
            }}
          >
            {p}
          </label>
        ))}
        <label onClick={() => setCurrentView("OtherComponent")}>OS - AFM</label>
      </div>
      <div className="table_container fadeUp">
        <table>
          <TableHeader />
          {renderView()}
        </table>
      </div>
    </>
  );
};

export default Main;
