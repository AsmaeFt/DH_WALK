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



  return (
    <>
      <tbody>
        <React.Fragment>
          <tr>
            <td>Proto & After Sales DH Required</td>
            {weeksandmonths.flatMap((w, i) => (
              <th key={w.week}>36</th>
            ))}
          </tr>
          <tr>
            <td> OS </td>
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
                  let OS = 0;

                  if (project) {
                    total = project.family.reduce((acc, f) => acc + f.SOS, 0);
                    OS += total;

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
            {weeksandmonths.flatMap((w, i) => (
              <td key={w.week}>21</td>
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
                        <input placeholder={data.value || "-"} />
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
            {weeksandmonths.flatMap((w, i) => (
              <th style={{ backgroundColor: "black" }} key={w.week}>
                0
              </th>
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
