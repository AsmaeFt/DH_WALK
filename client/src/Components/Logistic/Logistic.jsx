import React, { useCallback, useEffect, useState } from "react";
import c from "../FinalAssembl/FinalAssembly.module.css";
import TableHeader from "../UI/TableHeader";
import api from "../../services/api";
import axios from "axios";

const Logistic = () => {
  const [data, setdata] = useState([]);
  const [inputs, setinputs] = useState({});
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

  let DH_REQUIRED = [];
  let Total_DH = [];
  let Quality_SPL = [];
  let Total_Actual_DH = [];
  let prev = 0;

  let Gap = [];
  data.map((y) => {
    y.weeks.map((w) => {
      const Logistic_Dh =
        w.Logistic_DH.KSK_Printing_Orders +
        w.Logistic_DH.Sequencing +
        w.Logistic_DH.Reception_Warehouse +
        w.Logistic_DH.RM_DR +
        w.Logistic_DH.FG_Warehouse +
        w.Logistic_DH.FG_DR;
      Total_DH.push(Logistic_Dh);

      const Spl =
        w.Logistic_SPL.Pregnant_women_out_of_the_plant +
        w.Logistic_SPL.Maternity +
        w.Logistic_SPL.Breastfeeding_leave +
        w.Logistic_SPL.LTI_Long_term_weaknesses_LWD +
        w.Logistic_SPL.Physical_incapacity_NMA;
      Quality_SPL.push(Spl);

      let dh_required = 0;
      dh_required = Logistic_Dh + Spl;
      DH_REQUIRED.push(dh_required);
      let ActualDh;
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        ActualDh =
          w.Logistic_actual_Dh.Last_dh -
          w.Logistic_actual_Dh.Attrition -
          w.Logistic_actual_Dh.Transfer +
          w.Logistic_actual_Dh.Hiring;
        console.log(w.Logistic_DH.Last_dh);
      } else {
        ActualDh =
          prev -
          w.Logistic_actual_Dh.Attrition -
          w.Logistic_actual_Dh.Transfer +
          w.Logistic_actual_Dh.Hiring;
      }

      prev = ActualDh;
      Total_Actual_DH.push(ActualDh);
      let gap = 0;
      gap = ActualDh - dh_required;
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
          const res = await axios.post(`${api}/Modify_Logistic`, inputs);
          setdata(res.data);
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
                {DH_REQUIRED.map((p, i) => (
                  <td key={i}>{p}</td>
                ))}
              </tr>
            </React.Fragment>

            <React.Fragment>
              <tr className={c.total}>
                <td>MPC DH</td>
                {Total_DH.map((t, i) => (
                  <td key={i}>{t}</td>
                ))}
              </tr>
              <tr>
                <td>OPS</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.OPS;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_DH.OPS",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
              <tr>
                <td>KSK Printing Orders</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.KSK_Printing_Orders;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_DH.KSK_Printing_Orders",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
              <tr>
                <td>Sequencing</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.Sequencing;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_DH.Sequencing",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
              <tr>
                <td>Reception Warehouse</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.Reception_Warehouse;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_DH.Reception_Warehouse",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
              <tr>
                <td> RM DR</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.RM_DR;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_DH.RM_DR",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
              <tr>
                <td> FG Warehouse</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.FG_Warehouse;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_DH.FG_Warehouse",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
              <tr>
                <td> FG DR</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_DH.FG_DR;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_DH.FG_DR",
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

            <React.Fragment>
              <tr className={c.total}>
                <td>Quality Special list out of the plant</td>
                {Quality_SPL.map((s, i) => (
                  <td key={i}>{s}</td>
                ))}
              </tr>
              <tr>
                <td>Pregnant women of the plant</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_SPL.Pregnant_women_out_of_the_plant;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_SPL.Pregnant_women_out_of_the_plant",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
              <tr>
                <td>Maternity</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_SPL.Maternity;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_SPL.Maternity",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
              <tr>
                <td>Breastfeeding leave</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_SPL.Breastfeeding_leave;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_SPL.Breastfeeding_leave",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
              <tr>
                <td>LTI: Long term weaknesses, LWD,</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_SPL.LTI_Long_term_weaknesses_LWD;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_SPL.LTI_Long_term_weaknesses_LWD",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
              <tr>
                <td>Physical incapacity & NMA</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_SPL.Physical_incapacity_NMA;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_SPL.Physical_incapacity_NMA",
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

            <React.Fragment>
              <tr className={c.total}>
                <td>Quality Actual DH</td>
                {Total_Actual_DH.map((a, i) => (
                  <td key={i}>{a || "-"}</td>
                ))}
              </tr>
              <tr>
                <td>Attrition</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_actual_Dh.Attrition;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_actual_Dh.Attrition",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
              <tr>
                <td>Transfer</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_actual_Dh.Transfer;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_actual_Dh.Transfer",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    );
                  })
                )}
              </tr>
              <tr>
                <td>Hiring</td>
                {data.map((y) =>
                  y.weeks.map((w) => {
                    const data = w.Logistic_actual_Dh.Hiring;
                    return (
                      <td key={w._id}>
                        <input
                          placeholder={data}
                          onChange={(e) =>
                            handleChange(
                              w.week_name,
                              "Logistic_actual_Dh.Hiring",
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

            <tr className={c.total}>
              <td>Gap</td>
              {Gap.map((g, i) => (
                <td key={i}>{g}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Logistic;
