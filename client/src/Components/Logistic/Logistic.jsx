import React, { useCallback, useEffect, useState } from "react";
import c from "../FinalAssembl/FinalAssembly.module.css";
import TableHeader from "../UI/TableHeader";
import { generateWeeks } from "../functions/utilis";
import api from "../../services/api";
import axios from "axios";

const Logistic = () => {
  const weeks = generateWeeks();
  const [data, setdata] = useState([]);

  const FetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${api}/get_Logistic`);
      setdata(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    FetchData();
  }, [FetchData]);
  console.log(data);

  return (
    <>
      <div className={c.header}>
        <h2>Logistic </h2>
      </div>
      <br />
      <div className={c.table}>
        <table>
          <TableHeader />
          <tbody>
            <React.Fragment>
              <tr>
                <td>MPC DH Required</td>
                {weeks.map((w, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total}>
                <td>MPC DH</td>
                {weeks.map((w, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>OPS</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.OPS;
                    return <td key={w._id}>
                    
                      <input
                      placeholder={data}
                      />
                      </td>;
                  })
                )}
              </tr>
              <tr>
                <td>KSK Printing Orders</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.KSK_Printing_Orders;
                    return <td key={w._id}>
                    
                      <input
                      placeholder={data}
                      />
                      </td>;
                  })
                )}
              </tr>
              <tr>
                <td>Sequencing</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.Sequencing;
                    return <td key={w._id}>
                      <input
                      placeholder={data}
                      />
                      </td>;
                  })
                )}
              </tr>
              <tr>
                <td>Reception Warehouse</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.Reception_Warehouse;
                    return <td key={w._id}>
                    
                      <input
                      placeholder={data}
                      />
                      </td>;
                  })
                )}
              </tr>
              <tr>
                <td> RM DR</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.RM_DR;
                    return <td key={w._id}>
                    
                      <input
                      placeholder={data}
                      />
                      </td>;
                  })
                )}
              </tr>
              <tr>
                <td> FG Warehouse</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.FG_Warehouse;
                    return <td key={w._id}>
                    
                      <input
                      placeholder={data}
                      />
                      </td>;
                  })
                )}
              </tr>
              <tr>
                <td> FG DR</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.FG_DR;
                    return <td key={w._id}>
                    
                      <input
                      placeholder={data}
                      />
                      </td>;
                  })
                )}
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total}>
                <td>Quality Special list out of the plant</td>
                {weeks.map((w, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>Pregnant women of the plant</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_SPL.Pregnant_women_out_of_the_plant;
                    return <td key={w._id}>
                    
                      <input
                      placeholder={data}
                      />
                      </td>;
                  })
                )}
              </tr>
              <tr>
                <td>Maternity</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_SPL.Maternity;
                    return <td key={w._id}>
                    
                      <input
                      placeholder={data}
                      />
                      </td>;
                  })
                )}
              </tr>
              <tr>
                <td>Breastfeeding leave</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_SPL.Breastfeeding_leave;
                    return <td key={w._id}>
                    
                      <input
                      placeholder={data}
                      />
                      </td>;
                  })
                )}
              </tr>
              <tr>
                <td>LTI: Long term weaknesses, LWD,</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_SPL.LTI_Long_term_weaknesses_LWD;
                    return <td key={w._id}>
                    
                      <input
                      placeholder={data}
                      />
                      </td>;
                  })
                )}
              </tr>
              <tr>
                <td>Physical incapacity & NMA</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_SPL.Physical_incapacity_NMA;
                    return <td key={w._id}>
                    
                      <input
                      placeholder={data}
                      />
                      </td>;
                  })
                )}
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total}>
                <td>Quality Actual DH</td>
                {weeks.map((w, i) => (
                  <td key={i}>-</td>
                ))}
              </tr>
              <tr>
                <td>Attrition</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_actual_Dh.Attrition;
                    return <td key={w._id}>
                      <input
                      placeholder={data}
                      />
                      </td>
                  })
                )}
              </tr>
              <tr>
                <td>Transfer</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_actual_Dh.Transfer;
                    return <td key={w._id}>
                      <input
                      placeholder={data}
                      />
                      </td>
                  })
                )}
              </tr>
              <tr>
                <td>Hiring</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_actual_Dh.Hiring;
                    return <td key={w._id}>
                      <input
                      placeholder={data}
                      />
                      </td>
                  })
                )}
              </tr>
            </React.Fragment>

            <tr className={c.total}>
              <td>Gap</td>
              {weeks.map((w, i) => (
                <td key={i}>-</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Logistic;
