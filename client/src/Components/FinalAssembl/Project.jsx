import React, { useState, useCallback, useEffect } from "react";
import c from "./FinalAssembly.module.css";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { toogle } from "../hooks/Average";
import api from "../../services/api";
import axios from "axios";
import { CheckGap } from "../functions/utilis";

const Project = ({ data, sproject, family, updateData }) => {
  const [inputs, setinputs] = useState({});
  const [othInp, setotheInp] = useState({});
  const [Toogle, setToogle] = useState({});

  let Total_os = [];
  let Total_slop = [];
  let ActualDh = [];

  let totalProject = [];

  let DH_required = [];
  let Gap = [];
  let SOS = [];

  let containtion = [{ family: "", value: 0 }];
  // const weeks = generateWeeks();
  let prev = 0;
  data.map((pr) => {
    pr.projectData.map((p) => {
      const TotalOS =
        p.project_OS.Digitalization +
        p.project_OS.Daily_Kaizen +
        p.project_OS.OS_Auditing +
        p.project_OS.OS_Auditing_Data_Reporting;
      Total_os.push(TotalOS);

      const totalSLOP =
        p.project_special_list.Pregnant_women_out_of_the_plant +
        p.project_special_list.Maternity +
        p.project_special_list.Breastfeeding_leave +
        p.project_special_list.LTI_Long_term_weaknesses_LWD +
        p.project_special_list.Physical_incapacity_NMA;
      Total_slop.push(totalSLOP);

      let actualdh;
      if (pr.week_name === `${new Date().getFullYear()}-W01`) {
        actualdh =
          p.project_actual_DH.last_HC -
          p.project_actual_DH.Attrition +
          p.project_actual_DH.Hiring -
          p.project_actual_DH.Transfer;
        prev = actualdh;
      } else {
        actualdh =
          prev -
          p.project_actual_DH.Attrition +
          p.project_actual_DH.Hiring -
          p.project_actual_DH.Transfer;
        prev = actualdh;
      }

      ActualDh.push(actualdh);

      let familyTotal = 0;
      let totalSos = 0;
      let totalF = 0;

      p.family.forEach((fam) => {
        if (fam != null) {
          const HC_Crew =
            fam.ME_DEFINITION +
            fam.ME_SUPPORT +
            fam.Rework +
            fam.Poly +
            fam.Back_Up +
            fam.Containment;
          totalF = HC_Crew * fam.crews + fam.SOS;
          familyTotal += totalF;
          totalSos += fam.SOS;
          const totalContaintion = fam.crews * fam.Containment;
          containtion.push(fam.name, totalContaintion);
        }
      });

      SOS.push(totalSos);
      if (familyTotal !== null) {
        totalProject.push(familyTotal);
      }
      let DHRequired = 0;
      DHRequired = TotalOS + totalSLOP + familyTotal;
      DH_required.push(DHRequired);
      let gap = 0;
      gap = actualdh - DHRequired;
      Gap.push(gap);
    });
  });

  const handleChange = (projectName, week, family, attribute, value) => {
    setinputs({
      projectName: projectName,
      week: week,
      family: family,
      attribute: attribute,
      value: value,
    });
  };

  const inputChange = useCallback(async () => {
    if (inputs.value !== undefined) {
      const fetchData = async () => {
        try {
          const response = await axios.post(`${api}/Modify_FA_DATA`, inputs);

          updateData(response.data);
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

  const handleOthers = (projectName, week, path, value) => {
    setotheInp({
      projectName: projectName,
      week: week,
      path: path,
      value: value,
    });
  };

  const inputOthChange = useCallback(async () => {
    if (othInp.value !== undefined) {
      const fetchData = async () => {
        try {
          const response = await axios.post(`${api}/Modify_FA_DATA`, othInp);
          updateData(response.data);
          console.log("API Response:", response.data);
        } catch (error) {
          console.error("Error posting data:", error);
        }
      };
      fetchData();
    }
  }, [othInp]);

  useEffect(() => {
    inputOthChange();
  }, [inputOthChange]);
  console.log(Toogle);

  const toggling = (val) => {
    return Toogle[val] ? <FaCaretDown /> : <FaCaretRight />;
  };

  const CheckTdVal = (list, i) => {
    if (i === 0) return "white";
    if (list[i] === list[i - 1]) return "white";
    return list[i] > list[i - 1] ? "red" : "green";
  };

  return (
    <>
      <tbody>
        <React.Fragment>
          <tr className={c.total_dh_required}>
            <td>
              <span style={{ color: "orangered" }}>{sproject}</span> DH Required
            </td>
            {DH_required.flatMap((dh, i) => (
              <td key={i} style={{ color: CheckTdVal(DH_required, i) }}>
                {dh || "-"}
              </td>
            ))}
          </tr>
          <tr className={c.total_}>
            <td>
              <span style={{ color: "orangered" }}>{sproject}</span> Project
            </td>
            {totalProject.flatMap((t, i) => (
              <td key={i} style={{ color: CheckTdVal(DH_required, i) }}>
                {t || "-"}
              </td>
            ))}
          </tr>
        </React.Fragment>

        <React.Fragment>
          {family.flatMap((f, i) => (
            <React.Fragment key={i}>
              <tr className={c.total_family}>
                <td>
                  <span onClick={() => setToogle((prev) => toogle(prev, f))}>
                    {toggling(f)}
                  </span>
                  {f}
                </td>

                {data.flatMap((p, projectIndex) =>
                  p.projectData.flatMap((pr, projectDataIndex) => {
                    const fam = pr.family.find((fam) => fam.name === f);
                    if (fam) {
                      const HC_Crew =
                        fam.ME_DEFINITION +
                        fam.ME_SUPPORT +
                        fam.Rework +
                        fam.Poly +
                        fam.Back_Up +
                        fam.Containment;
                      const totalF = HC_Crew * fam.crews + fam.SOS;

                      return (
                        <td key={`${f}-${projectIndex}-${projectDataIndex}`}>
                          {totalF || "-"}
                        </td>
                      );
                    }
                    return [];
                  })
                )}
              </tr>

              {Toogle[f] && (
                <React.Fragment>
                  <tr
                    style={{ backgroundColor: "grey" }}
                    className={c.Show_hidens}
                  >
                    <td>Indirects %</td>
                    {data.flatMap((p, projectIndex) =>
                      p.projectData.flatMap((pr, projectDataIndex) => {
                        const fam = pr.family.find((fam) => fam.name === f);
                        if (fam) {
                          const HC_Crew =
                            fam.ME_SUPPORT +
                            fam.Rework +
                            fam.Poly +
                            fam.Back_Up +
                            fam.Containment +
                            fam.SOS;
                          const Indirects = Math.round(
                            (HC_Crew / fam.ME_DEFINITION) * 100
                          );
                          return (
                            <td
                              key={`${f}-${projectIndex}-${projectDataIndex}`}
                            >
                              {Indirects + "%" || "-"}
                            </td>
                          );
                        }
                        return [];
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td> Crews </td>
                    {data.map((p, projectIndex) =>
                      p.projectData.map((pr, projectDataIndex) => {
                        const fam = pr.family.find((fam) => fam.name === f);
                        if (fam) {
                          return (
                            <td
                              key={`${f}-${projectIndex}-${projectDataIndex}`}
                            >
                              <input
                                placeholder={fam.crews}
                                onChange={(e) =>
                                  handleChange(
                                    sproject,
                                    p.week_name,
                                    fam.name,
                                    "crews",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                          );
                        }
                      })
                    )}
                  </tr>
                  <tr
                    style={{ backgroundColor: "grey" }}
                    className={c.Show_hidens}
                  >
                    <td>HC Crew</td>
                    {data.flatMap((p, projectIndex) =>
                      p.projectData.flatMap((pr, projectDataIndex) => {
                        const fam = pr.family.find((fam) => fam.name === f);
                        if (fam) {
                          const HC_Crew =
                            fam.ME_DEFINITION +
                            fam.ME_SUPPORT +
                            fam.Rework +
                            fam.Poly +
                            fam.Back_Up +
                            fam.Containment;
                          return (
                            <td
                              key={`${f}-${projectIndex}-${projectDataIndex}`}
                            >
                              {HC_Crew || "-"}
                            </td>
                          );
                        }
                        return [];
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td> ME Definition </td>
                    {data.map((p, projectIndex) =>
                      p.projectData.map((pr, projectDataIndex) => {
                        const fam = pr.family.find((fam) => fam.name === f);
                        if (fam) {
                          return (
                            <td
                              key={`${f}-${projectIndex}-${projectDataIndex}`}
                            >
                              <input
                                placeholder={fam.ME_DEFINITION}
                                onChange={(e) =>
                                  handleChange(
                                    sproject,
                                    p.week_name,

                                    fam.name,
                                    "ME_DEFINITION",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                          );
                        }
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td> ME SUPPORT </td>
                    {data.map((p, projectIndex) =>
                      p.projectData.map((pr, projectDataIndex) => {
                        const fam = pr.family.find((fam) => fam.name === f);
                        if (fam) {
                          return (
                            <td
                              key={`${f}-${projectIndex}-${projectDataIndex}`}
                            >
                              <input
                                placeholder={fam.ME_SUPPORT}
                                onChange={(e) =>
                                  handleChange(
                                    sproject,
                                    p.week_name,

                                    fam.name,
                                    "ME_SUPPORT",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                          );
                        }
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td> Rework </td>
                    {data.map((p, projectIndex) =>
                      p.projectData.map((pr, projectDataIndex) => {
                        const fam = pr.family.find((fam) => fam.name === f);
                        if (fam) {
                          return (
                            <td
                              key={`${f}-${projectIndex}-${projectDataIndex}`}
                            >
                              <input
                                placeholder={fam.Rework}
                                onChange={(e) =>
                                  handleChange(
                                    sproject,
                                    p.week_name,

                                    fam.name,
                                    "Rework",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                          );
                        }
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td> Back_Up </td>
                    {data.map((p, projectIndex) =>
                      p.projectData.map((pr, projectDataIndex) => {
                        const fam = pr.family.find((fam) => fam.name === f);
                        if (fam) {
                          return (
                            <td
                              key={`${f}-${projectIndex}-${projectDataIndex}`}
                            >
                              <input
                                placeholder={fam.Back_Up}
                                onChange={(e) =>
                                  handleChange(
                                    sproject,
                                    p.week_name,

                                    fam.name,
                                    "Back_Up",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                          );
                        }
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td> Poly </td>
                    {data.map((p, projectIndex) =>
                      p.projectData.map((pr, projectDataIndex) => {
                        const fam = pr.family.find((fam) => fam.name === f);
                        if (fam) {
                          return (
                            <td
                              key={`${f}-${projectIndex}-${projectDataIndex}`}
                            >
                              <input
                                placeholder={fam.Poly}
                                onChange={(e) =>
                                  handleChange(
                                    sproject,
                                    p.week_name,

                                    fam.name,
                                    "Poly",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                          );
                        }
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td> Containment </td>
                    {data.map((p, projectIndex) =>
                      p.projectData.map((pr, projectDataIndex) => {
                        const fam = pr.family.find((fam) => fam.name === f);
                        if (fam) {
                          return (
                            <td
                              key={`${f}-${projectIndex}-${projectDataIndex}`}
                            >
                              <input
                                placeholder={fam.Containment}
                                onChange={(e) =>
                                  handleChange(
                                    sproject,
                                    p.week_name,

                                    fam.name,
                                    "Containment",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                          );
                        }
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td> SOS </td>
                    {data.map((p, projectIndex) =>
                      p.projectData.map((pr, projectDataIndex) => {
                        const fam = pr.family.find((fam) => fam.name === f);
                        if (fam) {
                          return (
                            <td
                              key={`${f}-${projectIndex}-${projectDataIndex}`}
                            >
                              <input
                                placeholder={fam.SOS}
                                onChange={(e) =>
                                  handleChange(
                                    sproject,
                                    p.week_name,

                                    fam.name,
                                    "SOS",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                          );
                        }
                      })
                    )}
                  </tr>
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </React.Fragment>

        <React.Fragment>
          <tr className={c.total_}>
            <td>
              <span onClick={() => setToogle((prev) => toogle(prev, "OS"))}>
                {toggling("OS")}
              </span>
              <span style={{ color: "orangered" }}>{sproject}</span> OS
            </td>
            {Total_os.map((t, i) => (
              <td key={i}>{t}</td>
            ))}
          </tr>
          {Toogle["OS"] && (
            <React.Fragment>
              <tr className={c.Show_hidens}>
                <td>Digitalization</td>
                {data.map((p) =>
                  p.projectData.map((pr, i) => (
                    <td key={i}>
                      <input
                        placeholder={pr.project_OS.Digitalization}
                        onChange={(e) =>
                          handleOthers(
                            sproject,
                            p.week_name,
                            "project_OS.Digitalization",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))
                )}
              </tr>
              <tr className={c.Show_hidens}>
                <td>Daily Kaizen</td>
                {data.map((p) =>
                  p.projectData.map((pr, i) => (
                    <td key={i}>
                      <input
                        placeholder={pr.project_OS.Daily_Kaizen}
                        onChange={(e) =>
                          handleOthers(
                            sproject,
                            p.week_name,
                            "project_OS.Daily_Kaizen",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))
                )}
              </tr>
              <tr className={c.Show_hidens}>
                <td>OS Auditing</td>
                {data.map((p) =>
                  p.projectData.map((pr, i) => (
                    <td key={i}>
                      <input
                        placeholder={pr.project_OS.OS_Auditing}
                        onChange={(e) =>
                          handleOthers(
                            sproject,
                            p.week_name,
                            "project_OS.OS_Auditing ",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))
                )}
              </tr>
              <tr className={c.Show_hidens}>
                <td>OS Auditing & Data Reporting</td>
                {data.map((p) =>
                  p.projectData.map((pr, i) => (
                    <td key={i}>
                      <input
                        placeholder={pr.project_OS.OS_Auditing_Data_Reporting}
                        onChange={(e) =>
                          handleOthers(
                            sproject,
                            p.week_name,
                            "project_OS.OS_Auditing_Data_Reporting",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))
                )}
              </tr>
            </React.Fragment>
          )}
        </React.Fragment>

        <React.Fragment>
          <tr className={c.total_}>
            <td>
              <span onClick={() => setToogle((prev) => toogle(prev, "SLOP"))}>
                {toggling("SLOP")}
              </span>
              <span style={{ color: "orangered" }}>{sproject}</span> SLOP{" "}
            </td>
            {Total_slop.map((t, i) => (
              <td key={i}>{t}</td>
            ))}
          </tr>
          {Toogle["SLOP"] && (
            <React.Fragment>
              <tr className={c.Show_hidens}>
                <td>Pregnant women out of the plant</td>
                {data.map((p) =>
                  p.projectData.map((pr, i) => (
                    <td key={i}>
                      <input
                        placeholder={
                          pr.project_special_list
                            .Pregnant_women_out_of_the_plant
                        }
                        onChange={(e) =>
                          handleOthers(
                            sproject,
                            p.week_name,
                            "project_special_list.Pregnant_women_out_of_the_plant",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))
                )}
              </tr>
              <tr className={c.Show_hidens}>
                <td>Maternity</td>
                {data.map((p) =>
                  p.projectData.map((pr, i) => (
                    <td key={i}>
                      <input
                        placeholder={pr.project_special_list.Maternity}
                        onChange={(e) =>
                          handleOthers(
                            sproject,
                            p.week_name,
                            "project_special_list.Maternity",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))
                )}
              </tr>
              <tr className={c.Show_hidens}>
                <td>Breastfeeding leave</td>
                {data.map((p) =>
                  p.projectData.map((pr, i) => (
                    <td key={i}>
                      <input
                        placeholder={
                          pr.project_special_list.Breastfeeding_leave
                        }
                        onChange={(e) =>
                          handleOthers(
                            sproject,
                            p.week_name,
                            "project_special_list.Breastfeeding_leave",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))
                )}
              </tr>
              <tr className={c.Show_hidens}>
                <td>LTI: Long term weaknesses, LWD, </td>
                {data.map((p) =>
                  p.projectData.map((pr, i) => (
                    <td key={i}>
                      <input
                        placeholder={
                          pr.project_special_list.LTI_Long_term_weaknesses_LWD
                        }
                        onChange={(e) =>
                          handleOthers(
                            sproject,
                            p.week_name,
                            "project_special_list.LTI_Long_term_weaknesses_LWD",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))
                )}
              </tr>
              <tr className={c.Show_hidens}>
                <td> Physical incapacity & NMA </td>
                {data.map((p) =>
                  p.projectData.map((pr, i) => (
                    <td key={i}>
                      <input
                        placeholder={
                          pr.project_special_list.Physical_incapacity_NMA
                        }
                        onChange={(e) =>
                          handleOthers(
                            sproject,
                            p.week_name,
                            "project_special_list.Physical_incapacity_NMA",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))
                )}
              </tr>
            </React.Fragment>
          )}
        </React.Fragment>

        <React.Fragment>
          <tr className={c.actualDh}>
            <td>
              <span onClick={() => setToogle((prev) => toogle(prev, "ACDH"))}>
                {toggling("ACDH")}
              </span>
              <span style={{ color: "orangered" }}>{sproject}</span> Actual DH
            </td>
            {ActualDh.map((a, i) => (
              <td key={i}>{a}</td>
            ))}
          </tr>

          {Toogle["ACDH"] && (
            <React.Fragment>

              <tr
                style={{ backgroundColor: "#ffe99a" }}
                className={c.Show_hidens}
              >
                <td>Attrition</td>
                {data.map((p) =>
                  p.projectData.map((pr, i) => {
                    const color =
                      pr.project_actual_DH.Attrition > 0 ? "red" : "";
                    return (
                      <td style={{ backgroundColor: color }} key={i}>
                        <input
                          placeholder={pr.project_actual_DH.Attrition}
                          onChange={(e) =>
                            handleOthers(
                              sproject,
                              p.week_name,
                              "project_actual_DH.Attrition",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>

              <tr
                style={{ backgroundColor: "#ede2b9" }}
                className={c.Show_hidens}
              >
                <td>Transfer</td>
                {data.map((p) =>
                  p.projectData.map((pr, i) => {
                    const color =
                      pr.project_actual_DH.Transfer > 0 ? "red" : "";
                    return (
                      <td style={{ backgroundColor: color }} key={i}>
                        <input
                          placeholder={pr.project_actual_DH.Transfer}
                          onChange={(e) =>
                            handleOthers(
                              sproject,
                              p.week_name,
                              "project_actual_DH.Transfer",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>

              <tr
                style={{ backgroundColor: "#fdfdca" }}
                className={c.Show_hidens}
              >
                <td>Hiring</td>
                {data.map((p) =>
                  p.projectData.map((pr, i) => {
                    const color =
                      pr.project_actual_DH.Hiring > 0 ? "#333399" : "";

                    return (
                      <td style={{ backgroundColor: color }} key={i}>
                        <input
                          placeholder={pr.project_actual_DH.Hiring}
                          onChange={(e) =>
                            handleOthers(
                              sproject,
                              p.week_name,
                              "project_actual_DH.Hiring",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
            </React.Fragment>
          )}
        </React.Fragment>

        <tr style={{ backgroundColor: "#a3a3a3" }}>
          <td>Gap </td>
          {Gap.flatMap((g, i) => (
            <td key={i} style={{ color: CheckGap(Gap, i) }}>
              {g || "-"}
            </td>
          ))}
        </tr>
      </tbody>
    </>
  );
};
export default Project;
