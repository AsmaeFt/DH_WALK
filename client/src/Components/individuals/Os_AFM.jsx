import React, { useState, useCallback, useEffect } from "react";
import { OS_calculs } from "../functions/Get_calculations";
import { generateWeeks } from "../functions/utilis";
import { getOSafm } from "../../services/api";
const Os_AFM = ({ project, data }) => {
  const [osdata, setosdata] = useState([]);
  const weeksandmonths = generateWeeks();

  const fetchData = useCallback(async () => {
    const res = await getOSafm();
    setosdata(res);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <tbody>
      <tr style={{background:'orangered'}}>
        <td>Proto & After Sales DH Required</td>
        {weeksandmonths.flatMap((w, i) => (
          <th key={w.week}>36</th>
        ))}
      </tr>
      <tr>
        <td style={{ backgroundColor: "black" }}>OS</td>
        {weeksandmonths.flatMap((w, i) => (
          <th style={{ backgroundColor: "black" }} key={w.week}>
            18
          </th>
        ))}
      </tr>

      {project.flatMap((pr, i) => (
        <tr key={i}>
          <td>{pr}</td>
          {weeksandmonths.flatMap((w, i) => {
            const totalOs = OS_calculs(data, pr);
            return <td key={w.week}>{totalOs[i] || "-"}</td>;
          })}
        </tr>
      ))}

      <tr>
        <td style={{ backgroundColor: "black" }}>After Sales</td>{" "}
        {weeksandmonths.flatMap((w, i) => (
          <th style={{ backgroundColor: "black" }} key={w.week}>
            21
          </th>
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
      <tr>
        <td style={{ backgroundColor: "black" }}>
          After Sales Special list out of the plant
        </td>
        {weeksandmonths.flatMap((w, i) => (
          <th style={{ backgroundColor: "black" }} key={w.week}>
            0
          </th>
        ))}
      </tr>
      <tr>
        <td>Pregnant women out of the plant</td>
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
        <td>Maternity</td>
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
        <td>Breastfeeding leave</td>
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
        <td>LTI: Long term weaknesses, LWD</td>
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
      <tr>
        <td style={{ backgroundColor: "black" }}>After Sales Actual DH</td>
        {weeksandmonths.flatMap((w, i) => (
          <th style={{ backgroundColor: "black" }} key={w.week}>
            42
          </th>
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
      <tr style={{background:'orangered'}}>
        <td>Gap</td>
        {
          weeksandmonths.flatMap((w)=>(
            <td key={w.week}>-10</td>
          ))
        }
        
        </tr>
    </tbody>
  );
};
export default Os_AFM;
