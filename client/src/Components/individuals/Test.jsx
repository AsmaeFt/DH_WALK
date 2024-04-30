import React, { useState, useEffect, useCallback } from "react";
import { generateWeeks } from "../functions/utilis";
import axios from "axios";

const Test = ({ family, data, sproject, updateData }) => {
  const weeksandmonths = generateWeeks();
  const [inputs, setinputs] = useState({});
  const [inputothers, setinputothers] = useState({});
  const [loading, setLoading] = useState(true);

  const handleOthers = (week, project, path, value) => {
    setinputothers({
      week: week,
      project: project,
      path: path,
      value: value,
    });
  };

  const handleChange = (week, project, family, attribute, value) => {
    setinputs({
      week: week,
      project: project,
      family: family,
      attribute: attribute,
      value: value,
    });
  };

  const inputChange = useCallback(async () => {
    if (inputs.value !== undefined) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://10.236.150.19:8080/api/assembly_Family_Edit",
            inputs
          );
          updateData(response.data);
          setLoading(false);
          console.log("API Response:", response.data);
        } catch (error) {
          console.error("Error posting data:", error);
        }
      };
      fetchData();
    }
  }, [inputs]);
  useEffect(() => {
    inputChange();
  }, [inputChange]);

  const inputsothers = useCallback(async () => {
    if (inputothers.value !== undefined) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://10.236.150.19:8080/api/assembly_Others_Edits",
            inputothers
          );
          updateData(response.data);
          setLoading(false);
          console.log("API Response:", response.data);
        } catch (error) {
          console.error("Error posting data:", error);
        }
      };
      fetchData();
    }
  }, [inputothers]);

  useEffect(() => {
    inputsothers();
  }, [inputsothers]);


  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Weeks</th>
            {weeksandmonths.flatMap((w, i) => (
              <th key={w.week}>{w.week}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Project DH required </td>
            {weeksandmonths.flatMap((w, i) => (
              <td key={w.week}>1</td>
            ))}
          </tr>
          <tr>
            <td>Project</td>
            {weeksandmonths.flatMap((w, i) => (
              <td key={w.week}>2</td>
            ))}
          </tr>
          {family.flatMap((f, i) => (
            <React.Fragment key={i}>
              <tr>
                <td style={{ backgroundColor: "orangered" }}>{f}</td>
              </tr>

              <tr>
                <td style={{ backgroundColor: "grey" }}>Indirects %</td>
              </tr>

              <tr>
                <td>Crews</td>
                {data.flatMap((y) =>
                  y.weeks.map((w) => {
                    const project = w.projectData.find(
                      (p) => p.projectName === sproject
                    );
                  
                    if (project) {
                      const foundFamily = project.family.find(
                        (fam) => fam.name === f
                      );
                     
                      if (foundFamily) {
                       
                        return (
                          <td
                            key={`${y.month_name}-${w.week_name}-${foundFamily.name}`}
                          >
                            <input
                              placeholder={foundFamily.crews}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  sproject,
                                  foundFamily.name,
                                  "crews",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      }
                    }
                    return (
                      <td key={`${y.month_name}-${w.week_name}-empty`}>
                        {loading ? <div className="round-loader"></div> : "-"}
                      </td>
                    );
                  })
                )}
              </tr>

              <tr>
                <td>ME Definition</td>
                {data.flatMap((y) =>
                  y.weeks.map((w) => {
                    const project = w.projectData.find(
                      (p) => p.projectName === sproject
                    );
                    if (project) {
                      const foundFamily = project.family.find(
                        (familyItem) => familyItem.name === f
                      );
                      if (foundFamily) {
                        const value = foundFamily.ME_DEFINITION;
                        return (
                          <td
                            key={`${y.month_name}-${w.week_name}-${foundFamily.name}`}
                          >
                            <input
                              placeholder={value}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  sproject,
                                  foundFamily.name,
                                  "ME_DEFINITION",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      }
                    }
                    return (
                      <td key={`${y.month_name}-${w.week_name}-empty`}>
                        {loading ? <div className="round-loader"></div> : "-"}
                      </td>
                    );
                  })
                )}
              </tr>

              <tr>
                <td>ME SUPPORT</td>
                {data.flatMap((y) =>
                  y.weeks.map((w) => {
                    const project = w.projectData.find(
                      (p) => p.projectName === sproject
                    );
                    if (project) {
                      const foundFamily = project.family.find(
                        (familyItem) => familyItem.name === f
                      );
                      if (foundFamily) {
                        const value = foundFamily.ME_SUPPORT;
                        return (
                          <td
                            key={`${y.month_name}-${w.week_name}-${foundFamily.name}`}
                          >
                            <input
                              placeholder={value}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  sproject,
                                  foundFamily.name,
                                  "ME_SUPPORT",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      }
                    }
                    return (
                      <td key={`${y.month_name}-${w.week_name}-empty`}>
                        {loading ? <div className="round-loader"></div> : "-"}
                      </td>
                    );
                  })
                )}
              </tr>

              <tr>
                <td>Rework</td>
                {data.flatMap((y) =>
                  y.weeks.map((w) => {
                    const project = w.projectData.find(
                      (p) => p.projectName === sproject
                    );
                    if (project) {
                      const foundFamily = project.family.find(
                        (familyItem) => familyItem.name === f
                      );
                      if (foundFamily) {
                        const value = foundFamily.Rework;
                        return (
                          <td
                            key={`${y.month_name}-${w.week_name}-${foundFamily.name}`}
                          >
                            <input
                              placeholder={value}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  sproject,
                                  foundFamily.name,
                                  "Rework",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      }
                    }
                    return (
                      <td key={`${y.month_name}-${w.week_name}-empty`}>
                        {loading ? <div className="round-loader"></div> : "-"}
                      </td>
                    );
                  })
                )}
              </tr>

              <tr>
                <td>Back_Up</td>
                {data.flatMap((y) =>
                  y.weeks.map((w) => {
                    const project = w.projectData.find(
                      (p) => p.projectName === sproject
                    );
                    if (project) {
                      const foundFamily = project.family.find(
                        (familyItem) => familyItem.name === f
                      );
                      if (foundFamily) {
                        const value = foundFamily.Back_Up;
                        return (
                          <td
                            key={`${y.month_name}-${w.week_name}-${foundFamily.name}`}
                          >
                            <input
                              placeholder={value}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  sproject,
                                  foundFamily.name,
                                  "Back_Up",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      }
                    }
                    return (
                      <td key={`${y.month_name}-${w.week_name}-empty`}>
                        {loading ? <div className="round-loader"></div> : "-"}
                      </td>
                    );
                  })
                )}
              </tr>

              <tr>
                <td>Poly</td>
                {data.flatMap((y) =>
                  y.weeks.map((w) => {
                    const project = w.projectData.find(
                      (p) => p.projectName === sproject
                    );
                    if (project) {
                      const foundFamily = project.family.find(
                        (familyItem) => familyItem.name === f
                      );
                      if (foundFamily) {
                        const value = foundFamily.Poly;
                        return (
                          <td
                            key={`${y.month_name}-${w.week_name}-${foundFamily.name}`}
                          >
                            <input
                              placeholder={value}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  sproject,
                                  foundFamily.name,
                                  "Poly",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      }
                    }
                    return (
                      <td key={`${y.month_name}-${w.week_name}-empty`}>
                        {loading ? <div className="round-loader"></div> : "-"}
                      </td>
                    );
                  })
                )}
              </tr>

              <tr>
                <td>Containment</td>
                {data.flatMap((y) =>
                  y.weeks.map((w) => {
                    const project = w.projectData.find(
                      (p) => p.projectName === sproject
                    );
                    if (project) {
                      const foundFamily = project.family.find(
                        (familyItem) => familyItem.name === f
                      );
                      if (foundFamily) {
                        const value = foundFamily.Containment;
                        return (
                          <td
                            key={`${y.month_name}-${w.week_name}-${foundFamily.name}`}
                          >
                            <input
                              placeholder={value}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  sproject,
                                  foundFamily.name,
                                  "Containment",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      }
                    }
                    return (
                      <td key={`${y.month_name}-${w.week_name}-empty`}>
                        {loading ? <div className="round-loader"></div> : "-"}
                      </td>
                    );
                  })
                )}
              </tr>

              <tr>
                <td>SOS</td>
                {data.flatMap((y) =>
                  y.weeks.map((w) => {
                    const project = w.projectData.find(
                      (p) => p.projectName === sproject
                    );
                    if (project) {
                      const foundFamily = project.family.find(
                        (familyItem) => familyItem.name === f
                      );
                      if (foundFamily) {
                        const value = foundFamily.SOS;
                        return (
                          <td
                            key={`${y.month_name}-${w.week_name}-${foundFamily.name}`}
                          >
                            <input
                              placeholder={value}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  sproject,
                                  foundFamily.name,
                                  "SOS",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      }
                    }
                    return (
                      <td key={`${y.month_name}-${w.week_name}-empty`}>
                        {loading ? <div className="round-loader"></div> : "-"}
                      </td>
                    );
                  })
                )}
              </tr>
            </React.Fragment>
          ))}
          <tr>
            <td>{sproject}OS</td>
          </tr>
          <tr>
            <td>Digitalization</td>

            {data.flatMap((y) =>
              y.weeks.map((w) => {
                const project = w.projectData.find(
                  (p) => p.projectName === sproject
                );

                if (project) {
                  return (
                    <td key={`${y.month_name}-${w.week_name}`}>
                      <input 
                      placeholder={project.project_OS.Digitalization}
                      onChange={(e) =>
                        handleOthers(
                          w.week_name,
                          sproject,
                          "project_OS.Digitalization",
                          e.target.value
                        )
                      } />
                    </td>
                  );
                }
                return (
                  <td key={`${y.month_name}-${w.week_name}-empty`}>
                    {loading ? <div className="round-loader"></div> : "-"}
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>Daily Kaizen</td>
            {data.flatMap((y) =>
              y.weeks.map((w) => {
                const project = w.projectData.find(
                  (p) => p.projectName === sproject
                );

                if (project) {
                  return (
                    <td key={`${y.month_name}-${w.week_name}`}>
                      <input 
                      placeholder={project.project_OS.Daily_Kaizen}
                      onChange={(e) =>
                        handleOthers(
                          w.week_name,
                          sproject,
                          "project_OS.Daily_Kaizen",
                          e.target.value
                        )
                      } />
                    </td>
                  );
                }
                return (
                  <td key={`${y.month_name}-${w.week_name}-empty`}>
                    {loading ? <div className="round-loader"></div> : "-"}
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>OS Auditing</td>
            {data.flatMap((y) =>
              y.weeks.map((w) => {
                const project = w.projectData.find(
                  (p) => p.projectName === sproject
                );

                if (project) {
                  return (
                    <td key={`${y.month_name}-${w.week_name}`}>
                      <input 
                      placeholder={project.project_OS.OS_Auditing}
                      onChange={(e) =>
                        handleOthers(
                          w.week_name,
                          sproject,
                          "project_OS.OS_Auditing",
                          e.target.value
                        )
                      } />
                    </td>
                  );
                }
                return (
                  <td key={`${y.month_name}-${w.week_name}-empty`}>
                    {loading ? <div className="round-loader"></div> : "-"}
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>OS Auditing & Data Reporting</td>
            {data.flatMap((y) =>
              y.weeks.map((w) => {
                const project = w.projectData.find(
                  (p) => p.projectName === sproject
                );

                if (project) {
                  return (
                    <td key={`${y.month_name}-${w.week_name}`}>
                      <input 
                      placeholder={project.project_OS.OS_Auditing_Data_Reporting}
                      onChange={(e) =>
                        handleOthers(
                          w.week_name,
                          sproject,
                          "project_OS.OS_Auditing_Data_Reporting",
                          e.target.value
                        )
                      } />
                    </td>
                  );
                }
                return (
                  <td key={`${y.month_name}-${w.week_name}-empty`}>
                    {loading ? <div className="round-loader"></div> : "-"}
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>{sproject}Special list out of the plant</td>
          </tr>
          <tr>
            <td>Pregnant women out of the plant</td>
            {data.flatMap((y) =>
              y.weeks.map((w) => {
                const project = w.projectData.find(
                  (p) => p.projectName === sproject
                );

                if (project) {
                  return (
                    <td key={`${y.month_name}-${w.week_name}`}>
                      <input 
                      placeholder={project.project_special_list.Pregnant_women_out_of_the_plant}
                      onChange={(e) =>
                        handleOthers(
                          w.week_name,
                          sproject,
                          "project_special_list.Pregnant_women_out_of_the_plant",
                          e.target.value
                        )
                      } />
                    </td>
                  );
                }
                return (
                  <td key={`${y.month_name}-${w.week_name}-empty`}>
                    {loading ? <div className="round-loader"></div> : "-"}
                  </td>
                );
              })
            )}
      
          </tr>
          <tr>
            <td>Maternity </td>
            {data.flatMap((y) =>
              y.weeks.map((w) => {
                const project = w.projectData.find(
                  (p) => p.projectName === sproject
                );

                if (project) {
                  return (
                    <td key={`${y.month_name}-${w.week_name}`}>
                      <input 
                      placeholder={project.project_special_list.Maternity}
                      onChange={(e) =>
                        handleOthers(
                          w.week_name,
                          sproject,
                          "project_special_list.Maternity",
                          e.target.value
                        )
                      } />
                    </td>
                  );
                }
                return (
                  <td key={`${y.month_name}-${w.week_name}-empty`}>
                    {loading ? <div className="round-loader"></div> : "-"}
                  </td>
                );
              })
            )}
      
          </tr>
          <tr>
            <td>Breastfeeding leave</td>
            {data.flatMap((y) =>
              y.weeks.map((w) => {
                const project = w.projectData.find(
                  (p) => p.projectName === sproject
                );

                if (project) {
                  return (
                    <td key={`${y.month_name}-${w.week_name}`}>
                      <input 
                      placeholder={project.project_special_list.Breastfeeding_leave}
                      onChange={(e) =>
                        handleOthers(
                          w.week_name,
                          sproject,
                          "project_special_list.Breastfeeding_leave",
                          e.target.value
                        )
                      } />
                    </td>
                  );
                }
                return (
                  <td key={`${y.month_name}-${w.week_name}-empty`}>
                    {loading ? <div className="round-loader"></div> : "-"}
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>LTI: Long term weaknesses, LWD, </td>
            {data.flatMap((y) =>
              y.weeks.map((w) => {
                const project = w.projectData.find(
                  (p) => p.projectName === sproject
                );

                if (project) {
                  return (
                    <td key={`${y.month_name}-${w.week_name}`}>
                      <input 
                      placeholder={project.project_special_list.LTI_Long_term_weaknesses_LWD}
                      onChange={(e) =>
                        handleOthers(
                          w.week_name,
                          sproject,
                          "project_special_list.LTI_Long_term_weaknesses_LWD",
                          e.target.value
                        )
                      } />
                    </td>
                  );
                }
                return (
                  <td key={`${y.month_name}-${w.week_name}-empty`}>
                    {loading ? <div className="round-loader"></div> : "-"}
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>Physical incapacity & NMA</td>
            {data.flatMap((y) =>
              y.weeks.map((w) => {
                const project = w.projectData.find(
                  (p) => p.projectName === sproject
                );

                if (project) {
                  return (
                    <td key={`${y.month_name}-${w.week_name}`}>
                      <input 
                      placeholder={project.project_special_list.Physical_incapacity_NMA}
                      onChange={(e) =>
                        handleOthers(
                          w.week_name,
                          sproject,
                          "project_special_list.Physical_incapacity_NMA",
                          e.target.value
                        )
                      } />
                    </td>
                  );
                }
                return (
                  <td key={`${y.month_name}-${w.week_name}-empty`}>
                    {loading ? <div className="round-loader"></div> : "-"}
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>{sproject} Actual DH</td>
          </tr>
          <tr>
            <td>Attrition</td>
            {data.flatMap((y) =>
              y.weeks.map((w) => {
                const project = w.projectData.find(
                  (p) => p.projectName === sproject
                );

                if (project) {
                  return (
                    <td key={`${y.month_name}-${w.week_name}`}>
                      <input 
                      placeholder={project.project_actual_DH.Attrition}
                      onChange={(e) =>
                        handleOthers(
                          w.week_name,
                          sproject,
                          "project_actual_DH.Attrition",
                          e.target.value
                        )
                      } />
                    </td>
                  );
                }
                return (
                  <td key={`${y.month_name}-${w.week_name}-empty`}>
                    {loading ? <div className="round-loader"></div> : "-"}
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>Transfer </td>
            {data.flatMap((y) =>
              y.weeks.map((w) => {
                const project = w.projectData.find(
                  (p) => p.projectName === sproject
                );

                if (project) {
                  return (
                    <td key={`${y.month_name}-${w.week_name}`}>
                      <input 
                      placeholder={project.project_actual_DH.Transfer}
                      onChange={(e) =>
                        handleOthers(
                          w.week_name,
                          sproject,
                          "project_actual_DH.Transfer",
                          e.target.value
                        )
                      } />
                    </td>
                  );
                }
                return (
                  <td key={`${y.month_name}-${w.week_name}-empty`}>
                    {loading ? <div className="round-loader"></div> : "-"}
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>Hiring</td>  
            
            {data.flatMap((y) =>
              y.weeks.map((w) => {
                const project = w.projectData.find(
                  (p) => p.projectName === sproject
                );

                if (project) {
                  return (
                    <td key={`${y.month_name}-${w.week_name}`}>
                      <input 
                      placeholder={project.project_actual_DH.Hiring}
                      onChange={(e) =>
                        handleOthers(
                          w.week_name,
                          sproject,
                          "project_actual_DH.Hiring",
                          e.target.value
                        )
                      } />
                    </td>
                  );
                }
                return (
                  <td key={`${y.month_name}-${w.week_name}-empty`}>
                    {loading ? <div className="round-loader"></div> : "-"}
                  </td>
                );
              })
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default Test;

