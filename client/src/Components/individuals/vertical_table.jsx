import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import car from "../assets/car.png";

const Vertical_table = () => {
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("K9 KSK");
  const [family, setFamily] = useState([]);

  const [inputValues, setInputValues] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/DATA");

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

      const clickedProject = response.data.map((month) => ({
        month_name: month.month_name,
        weeks: month.weeks.map((week) => ({
          week_name: week.week_name,
          projectData: week.projectData.filter(
            (project) => project.projectName === selectedProject
          ),
        })),
      }));

      const f = [
        ...new Set(
          clickedProject.flatMap((month) =>
            month.weeks.flatMap((week) =>
              week.projectData
                .flatMap((project) => project.family)
                .map((f) => f.name)
            )
          )
        ),
      ];
      setFamily(f);

      setData(clickedProject);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedProject]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(inputValues);
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

                  const Total_Os =
                    project.project_OS.Digitalization +
                    project.project_OS.Daily_Kaizen +
                    project.project_OS.OS_Auditing +
                    project.project_OS.OS_Auditing_Data_Reporting;

                  const total_special_list =
                    project.project_special_list
                      .Pregnant_women_out_of_the_plant +
                    project.project_special_list.Maternity +
                    project.project_special_list.Breastfeeding_leave +
                    project.project_special_list.LTI_Long_term_weaknesses_LWD +
                    project.project_special_list.Physical_incapacity_NMA;

                  const HC_REQUIRED = totalHC + Total_Os + total_special_list;
                  return (
                    <td className="container" key={week._id}>
                      {HC_REQUIRED}
                    </td>
                  );
                })}
            </tr>

            <tr>
              <td style={{ backgroundColor: "black" }}>{selectedProject}</td>
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
                  return (
                    <td style={{ backgroundColor: "black" }} key={week._id}>
                      {totalHC}
                    </td>
                  );
                })}
            </tr>

            {family.flatMap((f, i) => (
              <React.Fragment key={i}>
                <tr>
                  <td style={{ backgroundColor: "orangered" }}>{f}</td>
                  {data
                    .flatMap((m) => m.weeks)
                    .map((w) => {
                      const project = w.projectData.find(
                        (p) => p.projectName === selectedProject
                      );
                      if (project) {
                        const foundFamily = project.family.find(
                          (familyItem, i) => familyItem.name === f
                        );
                        if (foundFamily) {
                          const Total =
                            foundFamily.ME_DEFINITION +
                            foundFamily.ME_SUPPORT +
                            foundFamily.Rework +
                            foundFamily.Poly +
                            foundFamily.Back_Up +
                            foundFamily.Containment;
                          const F_TOTAL =
                            Total * foundFamily.crews + foundFamily.SOS;
                          const inputKey = `${w.week_name} - ${selectedProject} - ${foundFamily.name}`;

                          return (
                            <td
                              style={{
                                backgroundColor: "orangered",
                                color: "white",
                              }}
                              key={i}
                            >
                              <input
                                type="text"
                                value={inputValues[inputKey] || F_TOTAL}
                                onChange={(e) => {
                                  setInputValues({
                                    ...inputValues,
                                    [inputKey]: e.target.value,
                                  });
                                }}
                              />
                            </td>
                          );
                        }
                      }
                      return <td key={i}>-</td>;
                    })}
                </tr>
                <tr>
                  <td style={{ backgroundColor: "grey" }}>Indirects %</td>
                  {data
                    .flatMap((m) => m.weeks)
                    .map((w) => {
                      const project = w.projectData.find(
                        (p) => p.projectName === selectedProject
                      );
                      if (project) {
                        const foundFamily = project.family.find(
                          (familyItem, i) => familyItem.name === f
                        );
                        if (foundFamily) {
                          const Total =
                            foundFamily.ME_SUPPORT +
                            foundFamily.Rework +
                            foundFamily.Poly +
                            foundFamily.Back_Up +
                            foundFamily.Containment +
                            foundFamily.SOS;
                          const Indirects = Math.round(
                            (Total / foundFamily.ME_DEFINITION) * 100
                          );

                          return (
                            <td style={{ backgroundColor: "grey" }} key={i}>
                              {Indirects} %
                            </td>
                          );
                        }
                      }
                      return <td key={i}>-</td>;
                    })}
                </tr>
                <tr>
                  <td>Crews</td>
                  {data
                    .flatMap((m) => m.weeks)
                    .map((w) => {
                      const project = w.projectData.find(
                        (p) => p.projectName === selectedProject
                      );
                      if (project) {
                        const foundFamily = project.family.find(
                          (familyItem, i) => familyItem.name === f
                        );
                        if (foundFamily) {
                          return <td key={i}>{foundFamily.crews}</td>;
                        }
                      }
                      return <td key={i}>-</td>;
                    })}
                </tr>
                <tr>
                  <td style={{ backgroundColor: "gray" }}> HC crew</td>

                  {data
                    .flatMap((m) => m.weeks)
                    .map((w) => {
                      const project = w.projectData.find(
                        (p) => p.projectName === selectedProject
                      );
                      if (project) {
                        const foundFamily = project.family.find(
                          (familyItem, i) => familyItem.name === f
                        );
                        if (foundFamily) {
                          const Total =
                            foundFamily.ME_DEFINITION +
                            foundFamily.ME_SUPPORT +
                            foundFamily.Rework +
                            foundFamily.Poly +
                            foundFamily.Back_Up +
                            foundFamily.Containment;

                          return (
                            <td
                              style={{
                                backgroundColor: "gray",
                                color: "black",
                              }}
                              key={i}
                            >
                              {Total}
                            </td>
                          );
                        }
                      }
                      return <td key={i}>-</td>;
                    })}
                </tr>
                <tr>
                  <td>ME DEFINITION</td>
                  {data
                    .flatMap((m) => m.weeks)
                    .map((w) => {
                      const project = w.projectData.find(
                        (p) => p.projectName === selectedProject
                      );
                      if (project) {
                        const foundFamily = project.family.find(
                          (familyItem, i) => familyItem.name === f
                        );
                        if (foundFamily) {
                          return <td key={i}>{foundFamily.ME_DEFINITION}</td>;
                        }
                      }
                      return <td key={i}>-</td>;
                    })}
                </tr>

                <tr>
                  <td>ME SUPPORT</td>
                  {data
                    .flatMap((m) => m.weeks)
                    .map((w) => {
                      const project = w.projectData.find(
                        (p) => p.projectName === selectedProject
                      );
                      if (project) {
                        const foundFamily = project.family.find(
                          (familyItem, i) => familyItem.name === f
                        );
                        if (foundFamily) {
                          return <td key={i}>{foundFamily.ME_SUPPORT}</td>;
                        }
                      }
                      return <td key={i}>-</td>;
                    })}
                </tr>
                <tr>
                  <td>Rework</td>
                  {data
                    .flatMap((m) => m.weeks)
                    .map((w) => {
                      const project = w.projectData.find(
                        (p) => p.projectName === selectedProject
                      );
                      if (project) {
                        const foundFamily = project.family.find(
                          (familyItem) => familyItem.name === f
                        );
                        if (foundFamily) {
                          return <td>{foundFamily.Rework}</td>;
                        }
                      }
                      return <td>-</td>;
                    })}
                </tr>
                <tr>
                  <td>Poly</td>
                  {data
                    .flatMap((m) => m.weeks)
                    .map((w) => {
                      const project = w.projectData.find(
                        (p) => p.projectName === selectedProject
                      );
                      if (project) {
                        const foundFamily = project.family.find(
                          (familyItem) => familyItem.name === f
                        );
                        if (foundFamily) {
                          return <td>{foundFamily.Poly}</td>;
                        }
                      }
                      return <td>-</td>;
                    })}
                </tr>
                <tr>
                  <td>Back_Up</td>
                  {data
                    .flatMap((m) => m.weeks)
                    .map((w) => {
                      const project = w.projectData.find(
                        (p) => p.projectName === selectedProject
                      );
                      if (project) {
                        const foundFamily = project.family.find(
                          (familyItem) => familyItem.name === f
                        );
                        if (foundFamily) {
                          return <td>{foundFamily.Back_Up}</td>;
                        }
                      }
                      return <td>-</td>;
                    })}
                </tr>
                <tr>
                  <td>Containment</td>
                  {data
                    .flatMap((m) => m.weeks)
                    .map((w) => {
                      const project = w.projectData.find(
                        (p) => p.projectName === selectedProject
                      );
                      if (project) {
                        const foundFamily = project.family.find(
                          (familyItem) => familyItem.name === f
                        );
                        if (foundFamily) {
                          return <td>{foundFamily.Containment}</td>;
                        }
                      }
                      return <td>-</td>;
                    })}
                </tr>
                <tr>
                  <td>SOS</td>
                  {data
                    .flatMap((m) => m.weeks)
                    .map((w) => {
                      const project = w.projectData.find(
                        (p) => p.projectName === selectedProject
                      );
                      if (project) {
                        const foundFamily = project.family.find(
                          (familyItem) => familyItem.name === f
                        );
                        if (foundFamily) {
                          return <td>{foundFamily.SOS}</td>;
                        }
                      }
                      return <td>-</td>;
                    })}
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
              <td className="container">{selectedProject} Actual DH</td>
              {data
                .flatMap((month) => month.weeks)
                .map((week) => {
                  const project = week.projectData.find(
                    (p) => p.projectName === selectedProject
                  );
                  if (project) {
                    return <td className="container" key={week._id}></td>;
                  }
                })}
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
