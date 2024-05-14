import { useSelector } from "react-redux";
import React, { useCallback, useState, useEffect } from "react";
import { generateWeeks } from "../functions/utilis";
import c from "./FinalAssembly.module.css";
import api from "../../services/api";
import axios from "axios";

const OS_afm = ({ project }) => {
  const projectData = useSelector((s) => s.projectData.data);

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

  const handleChange = (week, attribute, project_name, value) => {
    setinputs({
      week: week,
      attribute: attribute,
      project_name: project_name,
      value: value,
    });
  };

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

      let DHrequired = 0;
      DHrequired += Total_after_sales + After_Sales_spl;
      Total_DH_Required.push(DHrequired);

      let actualDH;
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        actualDH =
          w.After_Sales_ActualDH.last_HC -
          w.After_Sales_ActualDH.Attrition -
          w.After_Sales.Transfer +
          w.After_Sales.Hiring;
      } else {
        actualDH =
          prev -
          w.After_Sales_ActualDH.Attrition -
          w.After_Sales.Transfer +
          w.After_Sales.Hiring;
      }
      prev = actualDH;
      total_ActualDh.push(actualDH);
    });
  });

  return (
    <>
      <tbody>
        <React.Fragment>
          <tr>
            <td>Proto & After Sales DH Required</td>
            {Total_DH_Required.map((dh, i) => (
              <td key={i}>{dh}</td>
            ))}
          </tr>
          <tr>
            <td> OS </td>
            {Total_SOS.map((t, i) => (
              <td key={i}>{t}</td>
            ))}
          </tr>
        </React.Fragment>

        <React.Fragment>
          {project.flatMap((pr, i) => (
            <tr key={i} className={c.total}>
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
          <tr>
            <td>After Sales</td>
            {total_AF.map((af, i) => (
              <td style={{ backgroundColor: "black" }} key={i}>
                {af}
              </td>
            ))}
          </tr>

          {project.flatMap((pr, i) => (
            <tr key={i}>
              <td>{pr}</td>
              {osdata.flatMap((y) =>
                y.weeks.flatMap((w) => {
                  const data = w.After_Sales.find((p) => p.project_name === pr);
                  if (data != null) {
                    return (
                      <td key={w._id}>
                        <input
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "After_Sales",
                              pr,
                              e.target.value
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

        <React.Fragment>
          <tr>
            <td>AS Special list out of the plant</td>
            {total_SPL.map((spl, i) => (
              <td style={{ backgroundColor: "black" }} key={i}>
                {spl}
              </td>
            ))}
          </tr>
          <tr>
            <td> Pregnant women out of the plant</td>
            {osdata.flatMap((y) =>
              y.weeks.flatMap((w) => {
                const data = w.After_Sales_spl.Pregnant_women_out_of_the_plant;
                return (
                  <td key={w._id}>
                    <input placeholder={data || "-"} />
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>Maternity </td>
            {osdata.flatMap((y) =>
              y.weeks.flatMap((w) => {
                const data = w.After_Sales_spl.Maternity;
                return (
                  <td key={w._id}>
                    <input placeholder={data || "-"} />
                  </td>
                );
              })
            )}
          </tr>

          <tr>
            <td> Breastfeeding leave</td>
            {osdata.flatMap((y) =>
              y.weeks.flatMap((w) => {
                const data = w.After_Sales_spl.Breastfeeding_leave;
                return (
                  <td key={w._id}>
                    <input placeholder={data || "-"} />
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>LTI: Long term weaknesses, LWD, </td>
            {osdata.flatMap((y) =>
              y.weeks.flatMap((w) => {
                const data = w.After_Sales_spl.LTI_Long_term_weaknesses_LWD;
                return (
                  <td key={w._id}>
                    <input placeholder={data || "-"} />
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>Physical incapacity & NMA</td>
            {osdata.flatMap((y) =>
              y.weeks.flatMap((w) => {
                const data = w.After_Sales_spl.Physical_incapacity_NMA;
                return (
                  <td key={w._id}>
                    <input placeholder={data || "-"} />
                  </td>
                );
              })
            )}
          </tr>
        </React.Fragment>

        <React.Fragment>
          <tr>
            <td>After Sales Actual DH</td>
            {weeksandmonths.flatMap((w, i) => (
              <td style={{ backgroundColor: "black" }} key={w.week}>
                42
              </td>
            ))}
          </tr>
          <tr>
            <td>Attrition</td>
            {osdata.flatMap((y) =>
              y.weeks.flatMap((w) => {
                const data = w.After_Sales_ActualDH.Attrition;
                return (
                  <td key={w._id}>
                    <input placeholder={data || "-"} />
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>Transfer</td>
            {osdata.flatMap((y) =>
              y.weeks.flatMap((w) => {
                const data = w.After_Sales_ActualDH.Transfer;
                return (
                  <td key={w._id}>
                    <input placeholder={data || "-"} />
                  </td>
                );
              })
            )}
          </tr>
          <tr>
            <td>Hiring</td>
            {osdata.flatMap((y) =>
              y.weeks.flatMap((w) => {
                const data = w.After_Sales_ActualDH.Hiring;
                return (
                  <td key={w._id}>
                    <input placeholder={data || "-"} />
                  </td>
                );
              })
            )}
          </tr>
        </React.Fragment>
        <tr>
          <td>Gap</td>
          {weeksandmonths.flatMap((w, i) => (
            <td style={{ backgroundColor: "black" }} key={w.week}>
              -
            </td>
          ))}
        </tr>
      </tbody>
    </>
  );
};
export default OS_afm;
