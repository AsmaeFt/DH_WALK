import React, { useCallback, useEffect, useState } from "react";
import c from "../FinalAssembl/FinalAssembly.module.css";
import TableHeader from "../UI/TableHeader";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { toogle } from "../hooks/Average";
import axios from "axios";
import api from "../../services/api";
import Legend from "../UI/Legend";
import { CheckGap } from "../functions/utilis";
import Title from "../UI/Title";

const Quality = () => {
  const [projectData, setProjectData] = useState([]);
  const [Toogle, setToogle] = useState({});

  const fetch_ProjectData = useCallback(async () => {
    const res = await axios.get(`${api}/assembly_project`);
    setProjectData(res.data);
  }, []);
  useEffect(() => {
    fetch_ProjectData();
  }, [fetch_ProjectData]);

  const [Quality, setQuality] = useState([]);
  const [inputs, setinputs] = useState({});

  let containtion = [];
  let Quality_Project_DH = [];

  projectData.map((d) => {
    d.weeks.map((w) => {
      let Total = 0;
      w.projectData.map((pr) => {
        if (pr.family.length < 4) {
          pr.family.map((f) => {
            const totalContaintion = f.crews * f.Containment;
            Total += totalContaintion;
            if (!containtion[f.name]) {
              containtion[f.name] = [];
            }
            containtion[f.name].push(totalContaintion);
          });
        } else {
          const totalContaintion = pr.family.reduce(
            (acc, f) => acc + f.crews * f.Containment,
            0
          );
          Total += totalContaintion;

          if (!containtion[pr.projectName]) {
            containtion[pr.projectName] = [];
          }
          containtion[pr.projectName].push(totalContaintion);
        }
      });
      Quality_Project_DH.push(Total);
    });
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${api}/get_quality`);
      setQuality(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let Quality_Others = [];
  let Total_Q_SPL = [];
  let Total_Actual_Dh = [];
  let prev = 0;
  let Total_DH_Required = [];
  let Gap = [];

  Quality.map((y) => {
    y.weeks.map((w) => {
      const Total_Quality_Others =
        w.Quality_Other_DH.Supper_Control +
        w.Quality_Other_DH.Fire_Wall +
        w.Quality_Other_DH.Validation +
        w.Quality_Other_DH.FTQ_Data_Recording +
        w.Quality_Other_DH.RM_Sorting_FG_Wearhouse +
        w.Quality_Other_DH.Containment_Back_up +
        w.Quality_Other_DH.Excess;
      Quality_Others.push(Total_Quality_Others);

      const SPL =
        w.Quality_Special_list_out_of_the_plant
          .Pregnant_women_out_of_the_plant +
        w.Quality_Special_list_out_of_the_plant.Maternity +
        w.Quality_Special_list_out_of_the_plant.Breastfeeding_leave +
        w.Quality_Special_list_out_of_the_plant.LTI_Long_term_weaknesses_LWD +
        w.Quality_Special_list_out_of_the_plant.Physical_incapacity_NMA;
      Total_Q_SPL.push(SPL);

      let DH_REquired = 0;
      Quality_Project_DH.forEach((t) => {
        DH_REquired = Total_Quality_Others + SPL + t;
      });
      Total_DH_Required.push(DH_REquired);

      let actualDh;
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        actualDh =
          w.Quality_Actual_DH.Last_dh -
          w.Quality_Actual_DH.Attrition -
          w.Quality_Actual_DH.Transfer +
          w.Quality_Actual_DH.Hiring;
      } else {
        actualDh =
          prev -
          w.Quality_Actual_DH.Attrition -
          w.Quality_Actual_DH.Transfer +
          w.Quality_Actual_DH.Hiring;
      }
      prev = actualDh;
      Total_Actual_Dh.push(actualDh);

      let gap = 0;
      gap = actualDh - DH_REquired;
      Gap.push(gap);
    });
  });

  const handleChange = (week, path, value) => {
    setinputs({
      week: week,
      path: path,
      value: value,
    });
  };

  const inputOthChange = useCallback(async () => {
    if (inputs.value !== undefined) {
      const fetchData = async () => {
        try {
          const res = await axios.post(`${api}/Modify_Quality`, inputs);
          setQuality(res.data);
          console.log("API Response:", res.data);
        } catch (error) {
          console.error("Error posting data:", error);
        }
      };
      fetchData();
    }
  }, [inputs]);

  useEffect(() => {
    inputOthChange();
  }, [inputOthChange]);

  const toggling = (val) => {
    return !Toogle[val] ? <FaCaretDown /> : <FaCaretRight />;
  };

  const CheckTdVal = (list, i) => {
    if (i === 0) return "white";
    if (list[i] === list[i - 1]) return "white";
    return list[i] > list[i - 1] ? "red" : "green";
  };

  return (
    <>
      <div className={c.header}>
        <h2> </h2>
      </div>
      <Title title={" Quality"} />
      <Legend />
      <div className={c.table}>
        <table>
          <TableHeader />
          <tbody>
            <React.Fragment>
              <tr className={c.total_dh_required}>
                <td>Quality DH Required</td>
                {Total_DH_Required.map((t, i) => (
                  <td
                    key={i}
                    style={{ color: CheckTdVal(Total_DH_Required, i) }}
                  >
                    {t}
                  </td>
                ))}
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total_}>
                <td>
                  <span
                    onClick={() => setToogle((prev) => toogle(prev, "QDH"))}
                  >
                    {toggling("QDH")}
                  </span>
                  Quality Project DH
                </td>
                {Quality_Project_DH.map((t, i) => (
                  <td key={i}>{t}</td>
                ))}
              </tr>
              {!Toogle["QDH"] && (
                <React.Fragment>
                  {Object.entries(containtion).map(([name, value], i) => (
                    <tr key={i} className={c.Show_hidens}>
                      <td>{name}</td>
                      {value.map((v, j) => (
                        <td key={j}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total_}>
                <td>
                  <span
                    onClick={() => setToogle((prev) => toogle(prev, "ODH"))}
                  >
                    {toggling("ODH")}
                  </span>
                  Quality Other DH
                </td>
                {Quality_Others.map((t, i) => (
                  <td key={i} style={{ color: CheckTdVal(t, i) }}>
                    {t}
                  </td>
                ))}
              </tr>
              {!Toogle["ODH"] && (
                <React.Fragment>
                  <tr className={c.Show_hidens}>
                    <td>Supper Control</td>

                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Quality_Other_DH.Supper_Control;
                        return (
                          <td key={w._id}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Other_DH.Supper_Control",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td>Fire Wall</td>
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Quality_Other_DH.Fire_Wall;

                        return (
                          <td key={w._id}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Other_DH.Fire_Wall",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td>Validation</td>
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Quality_Other_DH.Validation;

                        return (
                          <td key={w._id}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Other_DH.Validation",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>

                  <tr className={c.Show_hidens}>
                    <td> FTQ Data Recording</td>
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Quality_Other_DH.FTQ_Data_Recording;

                        return (
                          <td key={w._id}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Other_DH.FTQ_Data_Recording",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td> RM Sorting & FG Wearhouse</td>
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Quality_Other_DH.RM_Sorting_FG_Wearhouse;

                        return (
                          <td key={w._id}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Other_DH.RM_Sorting_FG_Wearhouse",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td> Containment Back up</td>
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Quality_Other_DH.Containment_Back_up;

                        return (
                          <td key={w._id}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Other_DH.Containment_Back_up",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td> Excess</td>
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Quality_Other_DH.Excess;

                        return (
                          <td key={w._id}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Other_DH.Excess",
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

            <React.Fragment>
              <tr className={c.total_}>
                <td>
                  <span
                    onClick={() => setToogle((prev) => toogle(prev, "SPL"))}
                  >
                    {toggling("SPL")}
                  </span>
                  Quality Special list out of the plant
                </td>
                {Total_Q_SPL.map((t, i) => (
                  <td key={i}>{t}</td>
                ))}
              </tr>
              {!Toogle["SPL"] && (
                <React.Fragment>
                  <tr className={c.Show_hidens}>
                    <td>Pregnant women of the plant</td>
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data =
                          w.Quality_Special_list_out_of_the_plant
                            .Pregnant_women_out_of_the_plant;

                        return (
                          <td key={w._id}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Special_list_out_of_the_plant.Pregnant_women_out_of_the_plant",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td>Maternity</td>
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data =
                          w.Quality_Special_list_out_of_the_plant.Maternity;

                        return (
                          <td key={w._id}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Special_list_out_of_the_plant.Maternity",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td>Breastfeeding leave</td>
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data =
                          w.Quality_Special_list_out_of_the_plant
                            .Breastfeeding_leave;

                        return (
                          <td key={w._id}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Special_list_out_of_the_plant.Breastfeeding_leave",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td>LTI: Long term weaknesses, LWD,</td>
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data =
                          w.Quality_Special_list_out_of_the_plant
                            .LTI_Long_term_weaknesses_LWD;

                        return (
                          <td key={w._id}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Special_list_out_of_the_plant.LTI_Long_term_weaknesses_LWD",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      })
                    )}
                  </tr>
                  <tr className={c.Show_hidens}>
                    <td>Physical incapacity & NMA</td>
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data =
                          w.Quality_Special_list_out_of_the_plant
                            .Physical_incapacity_NMA;

                        return (
                          <td key={w._id}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Special_list_out_of_the_plant.Physical_incapacity_NMA",
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

            <React.Fragment>
              <tr className={c.actualDh}>
                <td>
                  <span
                    onClick={() => setToogle((prev) => toogle(prev, "ACD"))}
                  >
                    {toggling("ACD")}
                  </span>
                  Quality Actual DH
                </td>
                {Total_Actual_Dh.map((t, i) => (
                  <td key={i}>{t}</td>
                ))}
              </tr>
              {!Toogle["ACD"] && (
                <React.Fragment>
                   <tr
                    style={{ backgroundColor: "#ffe99a" }}
                    className={c.Show_hidens}
                  >
                    <td>Attrition</td>
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Quality_Actual_DH.Attrition;
                        const color = data > 0 ? "red" : "";
                        return (
                          <td key={w._id} style={{ backgroundColor: color }}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Actual_DH.Attrition",
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
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Quality_Actual_DH.Transfer;
                        const color = data > 0 ? "red" : "";
                        return (
                          <td key={w._id} style={{ backgroundColor: color }}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Actual_DH.Transfer",
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
                    {Quality.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Quality_Actual_DH.Hiring;
                        const color = data > 0 ? "#333399" : "";
                        return (
                          <td key={w._id} style={{ backgroundColor: color }}>
                            <input
                              placeholder={data || "-"}
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "Quality_Actual_DH.Hiring",
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

            <tr style={{ backgroundColor: "#c5c5c5" }}>
              <td>Gap</td>
              {Gap.map((g, i) => (
                <td key={i} style={{ color: CheckGap(Gap, i) }}>
                  {g ||"-"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Quality;
