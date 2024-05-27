import React, { useCallback, useState, useEffect } from "react";
import { generateWeeks } from "../functions/utilis";
import c from "./FinalAssembly.module.css";
import { toogle } from "../hooks/Average";
import api from "../../services/api";
import axios from "axios";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { CheckGap } from "../functions/utilis";

const OS_afm = ({ project }) => {
  const [projectData, setProjectData] = useState([]);
  const [Toogle, setToogle] = useState({});

  const fetch_ProjectData = useCallback(async () => {
    const res = await axios.get(`${api}/assembly_project`);
    setProjectData(res.data);
  }, []);
  useEffect(() => {
    fetch_ProjectData();
  }, [fetch_ProjectData]);

  const weeksandmonths = generateWeeks();
  const [osdata, setosdata] = useState([]);
  const [inputs, setinputs] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${api}/GetOSAFM`);
      setosdata(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let Total_SOS = [];
  projectData.map((y) => {
    y.weeks.map((w) => {
      let sos = 0;
      w.projectData.map((project) => {
        project.family.map((f) => {
          sos += f.SOS;
        });
      });
      Total_SOS.push(sos);
    });
  });

  let total_AF = [];
  let total_SPL = [];
  let Total_DH_Required = [];
  let total_ActualDh = [];
  let prev = 0;
  let Gap = [];

  osdata.map((y) => {
    y.weeks.map((w) => {
      let Total_after_sales = 0;
      w.After_Sales.map((af) => {
        Total_after_sales += af.value;
      });
      total_AF.push(Total_after_sales);

      const After_Sales_spl =
        w.After_Sales_spl.Pregnant_women_out_of_the_plant +
        w.After_Sales_spl.Maternity +
        w.After_Sales_spl.Breastfeeding_leave +
        w.After_Sales_spl.LTI_Long_term_weaknesses_LWD +
        w.After_Sales_spl.Physical_incapacity_NMA;
      total_SPL.push(After_Sales_spl);

      let DHrequired;
      Total_SOS.forEach((t) => {
        DHrequired = Total_after_sales + After_Sales_spl + t;
      });
      Total_DH_Required.push(DHrequired);

      let actualDH;
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        actualDH =
          w.After_Sales_ActualDH.last_HC -
          w.After_Sales_ActualDH.Attrition -
          w.After_Sales_ActualDH.Transfer +
          w.After_Sales_ActualDH.Hiring;
        prev = actualDH;
      } else {
        actualDH =
          prev -
          w.After_Sales_ActualDH.Attrition -
          w.After_Sales_ActualDH.Transfer +
          w.After_Sales_ActualDH.Hiring;
        prev = actualDH;
      }
      total_ActualDh.push(actualDH);

      let gap = 0;
      gap = actualDH - DHrequired;
      Gap.push(Math.floor(gap));
    });
  });

  const handleChange = (week, path, value, projectName) => {
    setinputs({
      week: week,
      path: path,
      value: value,
      projectName: projectName,
    });
  };

  const inputOthChange = useCallback(async () => {
    if (inputs.value !== undefined) {
      const fetchData = async () => {
        try {
          const res = await axios.post(`${api}/edit-osAfm`, inputs);
          setosdata(res.data);
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
            <td>Proto & After Sales DH Required</td>
            {Total_DH_Required.map((dh, i) => (
              <td key={i} style={{ color: CheckTdVal(Total_DH_Required, i) }}>
                {dh}
              </td>
            ))}
          </tr>
        </React.Fragment>

        <React.Fragment>
          <tr className={c.total_}>
            <td>
              <span onClick={() => setToogle((prev) => toogle(prev, "OS"))}>
                {toggling("OS")}
              </span>
              OS
            </td>
            {Total_SOS.map((t, i) => (
              <td key={i}>{t}</td>
            ))}
          </tr>

          {Toogle["OS"] &&
            project.flatMap((pr, i) => (
              <tr key={i} className={c.Show_hidens}>
                <td>{pr}</td>
                {projectData.flatMap((d) =>
                  d.weeks.flatMap((w, ii) => {
                    let total = 0;
                    const project = w.projectData.find(
                      (p) => p.projectName === pr
                    );
                    if (project) {
                      total = project.family.reduce((acc, f) => acc + f.SOS, 0);
                      return <td key={`${i}-${ii}`}>{total || "-"}</td>;
                    } else {
                      return <td key={`${i}-${ii}`}>-</td>;
                    }
                  })
                )}
              </tr>
            ))}
        </React.Fragment>

        <React.Fragment>
          <tr className={c.total_}>
            <td>
              <span onClick={() => setToogle((prev) => toogle(prev, "AFS"))}>
                {toggling("AFS")}
              </span>
              After Sales
            </td>
            {total_AF.map((af, i) => (
              <td key={i}>{af}</td>
            ))}
          </tr>
          {Toogle["AFS"] && (
            <React.Fragment>
              {project.flatMap((pr, i) => (
                <tr key={i} className={c.Show_hidens}>
                  <td>{pr}</td>
                  {osdata.flatMap((y) =>
                    y.weeks.flatMap((w) => {
                      const data = w.After_Sales.find(
                        (p) => p.project_name === pr
                      );
                      if (data != null) {
                        return (
                          <td key={w._id}>
                            <input
                              onChange={(e) =>
                                handleChange(
                                  w.week_name,
                                  "After_Sales.project_name",
                                  e.target.value,
                                  pr
                                )
                              }
                              placeholder={data.value || "-"}
                            />
                          </td>
                        );
                      }
                    })
                  )}
                </tr>
              ))}
            </React.Fragment>
          )}
        </React.Fragment>

        <React.Fragment>
          <tr className={c.total_}>
            <td>
              <span onClick={() => setToogle((prev) => toogle(prev, "SPL"))}>
                {toggling("SPL")}
              </span>
              AS Special list out of the plant
            </td>
            {total_SPL.map((spl, i) => (
              <td key={i}>{spl}</td>
            ))}
          </tr>
          {Toogle["SPL"] && (
            <React.Fragment>
              <tr className={c.Show_hidens}>
                <td> Pregnant women out of the plant</td>
                {osdata.flatMap((y) =>
                  y.weeks.flatMap((w) => {
                    const data =
                      w.After_Sales_spl.Pregnant_women_out_of_the_plant;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data || "-"}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "After_Sales_spl.Pregnant_women_out_of_the_plant",
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
                <td>Maternity </td>
                {osdata.flatMap((y) =>
                  y.weeks.flatMap((w) => {
                    const data = w.After_Sales_spl.Maternity;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data || "-"}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "After_Sales_spl.Maternity",
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
                <td> Breastfeeding leave</td>
                {osdata.flatMap((y) =>
                  y.weeks.flatMap((w) => {
                    const data = w.After_Sales_spl.Breastfeeding_leave;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data || "-"}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "After_Sales_spl.Breastfeeding_leave",
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
                <td>LTI: Long term weaknesses, LWD, </td>
                {osdata.flatMap((y) =>
                  y.weeks.flatMap((w) => {
                    const data = w.After_Sales_spl.LTI_Long_term_weaknesses_LWD;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data || "-"}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "After_Sales_spl.LTI_Long_term_weaknesses_LWD",
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
                {osdata.flatMap((y) =>
                  y.weeks.flatMap((w) => {
                    const data = w.After_Sales_spl.Physical_incapacity_NMA;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data || "-"}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "After_Sales_spl.Physical_incapacity_NMA",
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
              <span onClick={() => setToogle((prev) => toogle(prev, "ACDH"))}>
                {toggling("ACDH")}
              </span>
              After Sales Actual DH
            </td>
            {weeksandmonths.flatMap((w) => (
              <td key={w.week}>42</td>
            ))}
          </tr>
          {Toogle["ACDH"] && (
            <React.Fragment>
              <tr
                style={{ backgroundColor: "#ffe99a" }}
                className={c.Show_hidens}
              >
                <td>Attrition</td>
                {osdata.flatMap((y) =>
                  y.weeks.flatMap((w) => {
                    const data = w.After_Sales_ActualDH.Attrition;
                    const color = data > 0 ? "red" : "";
                    return (
                      <td key={w._id}  style={{ backgroundColor: color }}>
                        <input
                          placeholder={data || "-"}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "After_Sales_ActualDH.Attrition",
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
                {osdata.flatMap((y) =>
                  y.weeks.flatMap((w) => {
                    const data = w.After_Sales_ActualDH.Transfer;
                    const color = data > 0 ? "red" : "";
                    return (
                      <td key={w._id}  style={{ backgroundColor: color }}>
                        <input
                          placeholder={data || "-"}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "After_Sales_ActualDH.Transfer",
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
                {osdata.flatMap((y) =>
                  y.weeks.flatMap((w) => {
                    const data = w.After_Sales_ActualDH.Hiring;
                    const color = data > 0 ? "#333399" : "";
                    return (
                      <td key={w._id}  style={{ backgroundColor: color }}> 
                        <input
                          placeholder={data || "-"}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "After_Sales_ActualDH.Hiring",
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

        <tr className={c.total}>
          <td>Gap</td>
          {Gap.map((g, i) => (
            <td key={i} style={{ color: CheckGap(Gap, i) }}>
              {g}
            </td>
          ))}
        </tr>
      </tbody>
    </>
  );
};
export default OS_afm;
