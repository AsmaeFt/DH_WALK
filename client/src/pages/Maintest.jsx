import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Test from "../Components/individuals/Test";

const Main = () => {
  const [Project, setProject] = useState([]);
  const [selectedProject, setselectedProject] = useState("K9 KSK");
  const [families, setFamilies] = useState([]);

  const getData = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/Get_project");
      const Project = await res.data.flatMap((p) => p.name);
      const families = await res.data
        .filter((p) => p.name === selectedProject)
        .flatMap((p) => p.family).map((f)=> f.name);
      setFamilies(families);
      setProject(Project);

      return res.data;
    } catch (er) {
      console.error("error is ", er);
    }
  }, [selectedProject]);

  useEffect(() => {
    getData();
  }, [getData]);
  console.log(families);
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
      <Test family={families} />
    </>
  );
};

export default Main;
