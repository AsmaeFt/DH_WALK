import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import car from "../assets/car.png";

const Vertical_table = () => {
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("K9 KSK");


  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://10.236.150.19:8080/api/DATA");
      

      const projectNames = [
        ...new Set(
          response.data.flatMap((month) =>
            month.weeks.flatMap((week) =>
              week.projectData.map((project) => project.projectName)
            )
          )
        ),
      ];
      setProjects(projectNames);

      const f = [
        ...new Set(
          response.data.flatMap((month) =>
            month.weeks.flatMap((week) =>
              week.projectData.flatMap((project) => project.family)
            )
          )
        ),
      ];

      const clickedProject = response.data.map(month => ({
        month_name: month.month_name,
        weeks: month.weeks.map(week => ({
          week_name: week.week_name,
          projectData: week.projectData.filter(project => project.projectName === selectedProject)
        }))
      }));

      setData(clickedProject);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedProject]);

  useEffect(() => {
    fetchData();
  }, [fetchData,]);

  return (
    <>
      <div className="header_container">
        <h2>DH Headcount Walk 2024</h2>
        <p>Weekly Walk</p>
      </div>

      <div className="projects">
        {projects.map((projectName, i) => (
          <label key={i} onClick={() => setSelectedProject(projectName)}>
            <img src={car} alt="Car icon" />
            {projectName}
          </label>
        ))}
      </div>

      <div className="table_container">
        <table>
          <thead>
            <tr>
              <th>Attributes / Weeks</th>
              {data
                .flatMap((month) => month.weeks)
                .map((week, index) => (
                  <th key={index}>{week.week_name}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="container">{selectedProject} HC Required</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => {
                  const project = week.projectData.find(
                    (p) => p.projectName === selectedProject
                  );
                  if (!project) return <td key={week._id}>-</td>;
                  const totalHC = project.family.reduce(
                    (acc, fam) =>
                      acc +
                      ((fam.ME_DEFINITION +
                        fam.ME_SUPPORT +
                        fam.Rework +
                        fam.Poly +
                        fam.Back_Up +
                        fam.Containment) *
                        fam.crews +
                        fam.SOS),
                    0
                  );
                  return <td key={week._id}>{totalHC}</td>;
                })}
            </tr>
            <tr>
              <td className="container">{selectedProject}</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => (
                  <td key={week._id}>444</td>
                ))}
            </tr>

              
            {data.length > 0 &&
          
           
              data[0].weeks[0].projectData[0].family.map((fam) => (
                <React.Fragment key={fam._id}>
                  <tr>
                    <td className="container">{fam.name}</td>
                  </tr>
                  <tr>
                    <td>Indirects %</td>
                    {data
                      .flatMap((month) => month.weeks)
                      .map((week) => (
                        <td key={week._id}>
                          {Math.round(
                            ((fam.ME_SUPPORT +
                              fam.Rework +
                              fam.Poly +
                              fam.Back_Up +
                              fam.Containment) /
                              fam.ME_DEFINITION) *
                              100
                          )}
                          %
                        </td>
                      ))}
                  </tr>
                  <tr>
                    <td>Crews</td>
                    {data
                      .flatMap((month) => month.weeks)
                      .map((week) => (
                        <td key={week._id}>{fam.crews}</td>
                      ))}
                  </tr>
                  <tr>
                    <td>HC Crew</td>
                    {data
                      .flatMap((month) => month.weeks)
                      .map((week) => (
                        <td key={week._id}>
                          {(fam.ME_DEFINITION +
                            fam.ME_SUPPORT +
                            fam.Rework +
                            fam.Poly +
                            fam.Back_Up +
                            fam.Containment) *
                            fam.crews}
                        </td>
                      ))}
                  </tr>
                  <tr>
                    <td>ME Definition</td>
                    {data
                      .flatMap((month) => month.weeks)
                      .map((week) => (
                        <td key={week._id}>{fam.ME_DEFINITION}</td>
                      ))}
                  </tr>
                  <tr>
                    <td>ME Support</td>
                    {data
                      .flatMap((month) => month.weeks)
                      .map((week) => (
                        <td key={week._id}>{fam.ME_SUPPORT}</td>
                      ))}
                  </tr>
                  <tr>
                    <td>Rework</td>
                    {data
                      .flatMap((month) => month.weeks)
                      .map((week) => (
                        <td key={week._id}>{fam.Rework}</td>
                      ))}
                  </tr>
                  <tr>
                    <td>Poly</td>
                    {data
                      .flatMap((month) => month.weeks)
                      .map((week) => (
                        <td key={week._id}>{fam.Poly}</td>
                      ))}
                  </tr>
                  <tr>
                    <td>Back-up</td>
                    {data
                      .flatMap((month) => month.weeks)
                      .map((week) => (
                        <td key={week._id}>{fam.Back_Up}</td>
                      ))}
                  </tr>
                  <tr>
                    <td>Containment</td>
                    {data
                      .flatMap((month) => month.weeks)
                      .map((week) => (
                        <td key={week._id}>{fam.Containment}</td>
                      ))}
                  </tr>
                  <tr>
                    <td>SOS</td>
                    {data
                      .flatMap((month) => month.weeks)
                      .map((week) => (
                        <td key={week._id}>{fam.SOS}</td>
                      ))}
                  </tr>
                </React.Fragment>
              ))}
            <tr>
              <td className="container">{selectedProject} OS</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => {
                  const project = week.projectData.find(
                    (p) => p.projectName === selectedProject
                  );
                  if (!project) return <td key={week._id}>-</td>;
                  const Total_OS =
                    project.project_OS.Digitalization +
                    project.project_OS.Daily_Kaizen +
                    project.project_OS.OS_Auditing +
                    project.project_OS.OS_Auditing_Data_Reporting;
                  return (
                    <td className="container" key={week._id}>
                      {Total_OS}
                    </td>
                  );
                })}
            </tr>
            <tr>
              <td>Digitalisation</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => {
                  const project = week.projectData.find(
                    (p) => p.projectName === selectedProject
                  );
                  if (project) {
                    return (
                      <td key={week._id}>
                        {project.project_OS.Digitalization}
                      </td>
                    );
                  }
                })}
            </tr>
            <tr>
              <td>Daily Kaizen</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => {
                  const project = week.projectData.find(
                    (p) => p.projectName === selectedProject
                  );
                  if (project) {
                    return (
                      <td key={week._id}>{project.project_OS.Daily_Kaizen}</td>
                    );
                  }
                })}
            </tr>
            <tr>
              <td> OS Auditing</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => {
                  const project = week.projectData.find(
                    (p) => p.projectName === selectedProject
                  );
                  if (project) {
                    return (
                      <td key={week._id}>{project.project_OS.OS_Auditing}</td>
                    );
                  }
                })}
            </tr>
            <tr>
              <td>OS Auditing & Data Reporting</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => {
                  const project = week.projectData.find(
                    (p) => p.projectName === selectedProject
                  );
                  if (project) {
                    return (
                      <td key={week._id}>
                        {project.project_OS.OS_Auditing_Data_Reporting}
                      </td>
                    );
                  }
                })}
            </tr>
            <>
              <tr>
                <td className="container">
                  {selectedProject} Special list out of the plant
                </td>
                {data
                  .flatMap((month) => month.weeks)
                  .map((week) => {
                    const project = week.projectData.find(
                      (p) => p.projectName === selectedProject
                    );
                    if (!project) return <td key={week._id}>_</td>;
                    const Total =
                      project.project_special_list
                        .Pregnant_women_out_of_the_plant +
                      project.project_special_list.Maternity +
                      project.project_special_list.Breastfeeding_leave +
                      project.project_special_list
                        .LTI_Long_term_weaknesses_LWD +
                      project.project_special_list.Physical_incapacity_NMA;
                    return (
                      <td className="container" key={week._id}>
                        {Total}
                      </td>
                    );
                  })}
              </tr>
              <tr>
                <td>Pregnant women out of the plant</td>
                {data
                  .flatMap((month) => month.weeks)
                  .map((week) => {
                    const project = week.projectData.find(
                      (p) => p.projectName === selectedProject
                    );
                    if (project) {
                      return (
                        <td key={week._id}>
                          {
                            project.project_special_list
                              .Pregnant_women_out_of_the_plant
                          }
                        </td>
                      );
                    }
                  })}
              </tr>
              <tr>
                <td>Maternity</td>
                {data
                  .flatMap((month) => month.weeks)
                  .map((week) => {
                    const project = week.projectData.find(
                      (p) => p.projectName === selectedProject
                    );
                    if (project) {
                      return (
                        <td key={week._id}>
                          {project.project_special_list.Maternity}
                        </td>
                      );
                    }
                  })}
              </tr>

              <tr>
                <td>Breastfeeding leave</td>
                {data
                  .flatMap((month) => month.weeks)
                  .map((week) => {
                    const project = week.projectData.find(
                      (p) => p.projectName === selectedProject
                    );
                    if (project) {
                      return (
                        <td key={week._id}>
                          {project.project_special_list.Breastfeeding_leave}
                        </td>
                      );
                    }
                  })}
              </tr>

              <tr>
                <td>LTI: Long term weaknesses, LWD, </td>
                {data
                  .flatMap((month) => month.weeks)
                  .map((week) => {
                    const project = week.projectData.find(
                      (p) => p.projectName === selectedProject
                    );
                    if (project) {
                      return (
                        <td key={week._id}>
                          {
                            project.project_special_list
                              .LTI_Long_term_weaknesses_LWD
                          }
                        </td>
                      );
                    }
                  })}
              </tr>

              <tr>
                <td>Physical incapacity & NMA </td>
                {data
                  .flatMap((month) => month.weeks)
                  .map((week) => {
                    const project = week.projectData.find(
                      (p) => p.projectName === selectedProject
                    );
                    if (project) {
                      return (
                        <td key={week._id}>
                          {project.project_special_list.Physical_incapacity_NMA}
                        </td>
                      );
                    }
                  })}
              </tr>
            </>
            <tr>
              <td>Actual Direct Headcount (DH)</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => {
                  const project = week.projectData.find(
                    (p) => p.projectName === selectedProject
                  );
                  return (
                    <td key={week._id}>
                      {project ? project.project_actual_DH.last_HC : "-"}
                    </td>
                  );
                })}
            </tr>
            <tr>
              <td className="container">{selectedProject} Actual DH</td>
            </tr>
            <tr>
              <td>Attrition</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => {
                  const project = week.projectData.find(
                    (p) => p.projectName === selectedProject
                  );
                  if (project) {
                    return (
                      <td key={week._id}>
                        {project.project_actual_DH.Attrition}
                      </td>
                    );
                  }
                })}
            </tr>
            <tr>
              <td>Transfer</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => {
                  const project = week.projectData.find(
                    (p) => p.projectName === selectedProject
                  );
                  if (project) {
                    return (
                      <td key={week._id}>
                        {project.project_actual_DH.Transfer}
                      </td>
                    );
                  }
                })}
            </tr>
            <tr>
              <td>Hiring</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => {
                  const project = week.projectData.find(
                    (p) => p.projectName === selectedProject
                  );
                  if (project) {
                    return (
                      <td key={week._id}>{project.project_actual_DH.Hiring}</td>
                    );
                  }
                })}
            </tr>
            <tr>
              <td>Gap</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => {
                  const project = week.projectData.find(
                    (p) => p.projectName === selectedProject
                  );
                  if (!project) return <td key={week._id}>-</td>;
                  const totalHC = project.family.reduce(
                    (acc, fam) =>
                      acc +
                      ((fam.ME_DEFINITION +
                        fam.ME_SUPPORT +
                        fam.Rework +
                        fam.Poly +
                        fam.Back_Up +
                        fam.Containment) *
                        fam.crews +
                        fam.SOS),
                    0
                  );
                  const gap = project.project_actual_DH.last_HC - totalHC;
                  return (
                    <td
                      key={week._id}
                      style={{ color: gap < 0 ? "red" : "green" }}
                    >
                      {gap}
                    </td>
                  );
                })}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Vertical_table;
