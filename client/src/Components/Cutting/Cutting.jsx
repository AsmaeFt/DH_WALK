import React, { useCallback, useEffect, useState } from "react";
import c from "../FinalAssembl/FinalAssembly.module.css";
import TableHeader from "../UI/TableHeader";
import api from "../../services/api";
import axios from "axios";
import Legend from "../UI/Legend";
import Title from "../UI/Title";
import { toogle } from "../hooks/Average";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { CheckGap } from "../functions/utilis";


const Cutting = () => {
  const [data, setdata] = useState([]);
  const [inputs, setinputs] = useState({});
  const [Toogle, setToogle] = useState({});

  const FetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${api}/get_Cutting`);
      setdata(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    FetchData();
  }, [FetchData]);

  let LastDH;
  let Cutting_DH_Required = [];
  let Polyvalents = [];
  let Cutting_Actual_DH = [];
  let prev = 0;
  let Gap = [];

  let LP_Dh_Required = [];
  let LP_Actual_DH = [];
  let prevLP = 0;
  let GapLP = [];

  let Cutt_LP_DHrequired = [];
  let Cuutt_Lp_ActualDh = [];

  let Plnat_Attrition = [];
  let Plnat_Transfert = [];
  let Plnat_Hiring = [];
  let PrevPlant = 0;
  let i = 1;
  let Gap_Plant = [];

  data.map((y) => {
    y.weeks.map((w) => {
      //Cutting
      let Machins_Calculs = w.Cutting_DH_Required.Machines_FT_s_Projection / 5;
      let polyvalents = Machins_Calculs > 24 ? 24 : Machins_Calculs;
      Polyvalents.push(polyvalents);

      const Dh_Required =
        w.Cutting_DH_Required.Machines_FT_s_Projection +
        polyvalents +
        w.Cutting_DH_Required.Contention +
        w.Cutting_DH_Required.Absenteeism +
        w.Cutting_DH_Required.Training +
        w.Cutting_DH_Required.Big_Brother +
        w.Cutting_DH_Required.Long_Term_Illness +
        w.Cutting_DH_Required.Attrition_Backup +
        w.Cutting_DH_Required.SOS +
        w.Cutting_DH_Required.D_C_Pre_set_up_Reception_delivery +
        w.Cutting_DH_Required.Rework_pagode_Scrap_stock_aken;
      Cutting_DH_Required.push(Dh_Required);

      let ActualDh;
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        ActualDh =
          w.Cutting_Actual_DH.Last_dh -
          w.Cutting_Actual_DH.Attrition -
          w.Cutting_Actual_DH.Transfer +
          w.Cutting_Actual_DH.Hiring;
      } else {
        ActualDh =
          prev -
          w.Cutting_Actual_DH.Attrition -
          w.Cutting_Actual_DH.Transfer +
          w.Cutting_Actual_DH.Hiring;
      }

      prev = ActualDh;
      Cutting_Actual_DH.push(ActualDh);

      let gap = 0;
      gap = ActualDh - Dh_Required;
      Gap.push(gap);

      //LP
      const Lp_DH_Required =
        w.LP_DH_Required.LP_HD +
        w.LP_DH_Required.Polyvalents +
        w.LP_DH_Required.Contention +
        w.LP_DH_Required.Absenteeism +
        w.LP_DH_Required.Long_Term_Illness +
        w.LP_DH_Required.Training +
        w.LP_DH_Required.Attrition_Backup +
        w.LP_DH_Required.SOS +
        w.LP_DH_Required.Prototypes +
        w.LP_DH_Required.DR +
        w.LP_DH_Required.LP_Support_Internal_DR_Die_centre +
        w.LP_DH_Required.Rework;
      LP_Dh_Required.push(Lp_DH_Required);

      let ActualDhLP;
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        ActualDhLP =
          w.LP_ActualDH.Last_dh -
          w.LP_ActualDH.Attrition -
          w.LP_ActualDH.Transfer +
          w.LP_ActualDH.Hiring;
      } else {
        ActualDhLP =
          prevLP -
          w.LP_ActualDH.Attrition -
          w.LP_ActualDH.Transfer +
          w.LP_ActualDH.Hiring;
      }

      prevLP = ActualDhLP;
      LP_Actual_DH.push(ActualDhLP);

      let gaplp = 0;
      gaplp = ActualDhLP - Lp_DH_Required;
      GapLP.push(gaplp);

      //Plant
      const PlantDhrequire = ActualDhLP + Dh_Required;
      Cutt_LP_DHrequired.push(PlantDhrequire);

      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        LastDH = w.Cutting_Actual_DH.Last_dh + w.LP_ActualDH.Last_dh;
      }
      const attri = w.Cutting_Actual_DH.Attrition + w.LP_ActualDH.Attrition;
      const trans = w.Cutting_Actual_DH.Transfer + w.LP_ActualDH.Transfer;
      const hir = w.Cutting_Actual_DH.Hiring + w.LP_ActualDH.Hiring;

      Plnat_Attrition.push(attri);
      Plnat_Transfert.push(trans);
      Plnat_Hiring.push(hir);

      let Cut_Lp_ActualDh;
      if (w.week_name === `${new Date().getFullYear()}-W01`) {
        Cut_Lp_ActualDh =
          LastDH - Plnat_Attrition[0] - Plnat_Transfert[0] + Plnat_Hiring[0];
      } else {
        Cut_Lp_ActualDh =
          PrevPlant - Plnat_Attrition[i] - Plnat_Transfert[i] + Plnat_Hiring[i];
        i++;
      }
      PrevPlant = Cut_Lp_ActualDh;
      Cuutt_Lp_ActualDh.push(Cut_Lp_ActualDh);

      const gapPlant = Cut_Lp_ActualDh - PlantDhrequire;
      Gap_Plant.push(gapPlant);
    });
  });

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
      <div className={c.header}>
        <h2>  </h2>
      </div>
      <Title title={"Cutting"} />
      <Legend />
      <Title title={"Total Plant"} />
      <div className={c.table}>
        <table>
          <TableHeader />
          <tbody>
            <tr className={c.actualDh}>
              <td>Cutt & LP Actual DH</td>
              {Cuutt_Lp_ActualDh.map((v, i) => (
                <td key={i}>{v}</td>
              ))}
            </tr>
            <tr>
              <td>Attrition</td>
              {Plnat_Attrition.map((v, i) => {
                const color = v > 0 ? "red" : "";
                return (
                  <td key={i} style={{ backgroundColor: color }}>
                    {v}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td>Transfer</td>
              {Plnat_Transfert.map((v, i) => {
                const color = v > 0 ? "red" : "";
                return (
                  <td key={i} style={{ backgroundColor: color }}>
                    {v}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td>Hiring</td>
              {Plnat_Hiring.map((v, i) => {
                const color = v > 0 ? "#fdfdca" : "";
                return (
                  <td key={i} style={{ backgroundColor: color }}>
                    {v}
                  </td>
                );
              })}
            </tr>

            <tr style={{ backgroundColor: "#c5c5c5" }}>
              <td>Total Plant GAP </td>
              {Gap_Plant.map((g, i) => (
                <td key={i} style={{ color: CheckGap(Gap_Plant, i) }}>
                  {g}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <Title title={"Total Cutting"} />

      <div className={c.table}>
        <table>
          <TableHeader />
          <tbody>
            <React.Fragment>
              <tr className={c.total_dh_required}>
                <td>Cutt & LP Required </td>
                {Cutt_LP_DHrequired.map((v, i) => (
                  <td
                    key={i}
                    style={{ color: CheckTdVal(Cutt_LP_DHrequired, i) }}
                  >
                    {v}
                  </td>
                ))}
              </tr>
              <tr className={c.total_dh_required}>
                <td>
                  <span onClick={() => setToogle((prev) => toogle(prev, "DH"))}>
                    {toggling("DH")}
                  </span>
                  Cutting DH Required
                </td>
                {Cutting_DH_Required.map((v, i) => (
                  <td
                    key={i}
                    style={{ color: CheckTdVal(Cutting_DH_Required, i) }}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            </React.Fragment>
            {Toogle["DH"] && (
              <React.Fragment>
                <tr className={c.Show_hidens}>
                  <td>Machines FTs Projection</td>
                  {data.map((y) =>
                    y.weeks.map((w) => {
                      const data =
                        w.Cutting_DH_Required.Machines_FT_s_Projection;
                      return (
                        <td key={w._id}>
                          <input placeholder={data} />
                        </td>
                      );
                    })
                  )}
                </tr>
                <tr className={c.Show_hidens}>
                  <td>Polyvalents</td>
                  {Polyvalents.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
                <tr className={c.Show_hidens}>
                  <td>Contention</td>
                  {data.map((y) =>
                    y.weeks.map((w) => {
                      const data = w.Cutting_DH_Required.Contention;
                      return (
                        <td key={w._id}>
                          <input placeholder={data} />
                        </td>
                      );
                    })
                  )}
                </tr>
                <tr className={c.Show_hidens}>
                  <td>Absenteeism</td>
                  {data.map((y) =>
                    y.weeks.map((w) => {
                      const data = w.Cutting_DH_Required.Absenteeism;
                      return (
                        <td key={w._id}>
                          <input placeholder={data} />
                        </td>
                      );
                    })
                  )}
                </tr>
                <tr className={c.Show_hidens}>
                  <td>Training</td>
                  {data.map((y) =>
                    y.weeks.map((w) => {
                      const data = w.Cutting_DH_Required.Training;
                      return (
                        <td key={w._id}>
                          <input placeholder={data} />
                        </td>
                      );
                    })
                  )}
                </tr>
                <tr className={c.Show_hidens}>
                  <td>Big Brother</td>
                  {data.map((y) =>
                    y.weeks.map((w) => {
                      const data = w.Cutting_DH_Required.Big_Brother;
                      return (
                        <td key={w._id}>
                          <input placeholder={data} />
                        </td>
                      );
                    })
                  )}
                </tr>
                <tr className={c.Show_hidens}>
                  <td>Long Term Illness</td>
                  {data.map((y) =>
                    y.weeks.map((w) => {
                      const data = w.Cutting_DH_Required.Long_Term_Illness;
                      return (
                        <td key={w._id}>
                          <input placeholder={data} />
                        </td>
                      );
                    })
                  )}
                </tr>
                <tr className={c.Show_hidens}>
                  <td>Attrition Backup</td>
                  {data.map((y) =>
                    y.weeks.map((w) => {
                      const data = w.Cutting_DH_Required.Attrition_Backup;
                      return (
                        <td key={w._id}>
                          <input placeholder={data} />
                        </td>
                      );
                    })
                  )}
                </tr>
                <tr className={c.Show_hidens}>
                  <td>SOS</td>
                  {data.map((y) =>
                    y.weeks.map((w) => {
                      const data = w.Cutting_DH_Required.SOS;
                      return (
                        <td key={w._id}>
                          <input placeholder={data} />
                        </td>
                      );
                    })
                  )}
                </tr>
                <tr className={c.Show_hidens}>
                  <td>D/C (Pre set up + Reception + delivery)</td>
                  {data.map((y) =>
                    y.weeks.map((w) => {
                      const data =
                        w.Cutting_DH_Required.D_C_Pre_set_up_Reception_delivery;
                      return (
                        <td key={w._id}>
                          <input placeholder={data} />
                        </td>
                      );
                    })
                  )}
                </tr>
                <tr className={c.Show_hidens}>
                  <td>Rework + pagode + Scrap + stock taken</td>
                  {data.map((y) =>
                    y.weeks.map((w) => {
                      const data =
                        w.Cutting_DH_Required.Rework_pagode_Scrap_stock_aken;
                      return (
                        <td key={w._id}>
                          <input placeholder={data} />
                        </td>
                      );
                    })
                  )}
                </tr>
              </React.Fragment>
            )}

            <React.Fragment>
              <tr className={c.actualDh}>
                <td>
                  <span
                    onClick={() => setToogle((prev) => toogle(prev, "ACD"))}
                  >
                    {toggling("ACD")}
                  </span>
                  Cutting Actual DH
                </td>
                {Cutting_Actual_DH.map((v, i) => (
                  <td key={i}>{v}</td>
                ))}
              </tr>
              {Toogle["ACD"] && (
                <React.Fragment>
                  <tr
                    style={{ backgroundColor: "#ffe99a" }}
                    className={c.Show_hidens}
                  >
                    <td>Attrition</td>
                    {data.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Cutting_Actual_DH.Attrition;
                        return (
                          <td key={w._id}>
                            <input placeholder={data} />
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
                    {data.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Cutting_Actual_DH.Transfer;
                        return (
                          <td key={w._id}>
                            <input placeholder={data} />
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
                    {data.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.Cutting_Actual_DH.Hiring;
                        const color = data > 0 ? "#333399" : "";

                        return (
                          <td key={w._id} style={{ backgroundColor: color }}>
                            <input placeholder={data} />
                          </td>
                        );
                      })
                    )}
                  </tr>
                </React.Fragment>
              )}
            </React.Fragment>

            <tr style={{ backgroundColor: "#c5c5c5" }}>
              <td> Gap </td>
              {Gap.map((v, i) => (
                <td key={i} style={{ color: CheckGap(Gap, i) }}>
                  {v}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <Title title={"Total LP"} />
      <div className={c.table}>
        <table>
          <TableHeader />
          <tbody>
            <React.Fragment>
              <tr className={c.total_dh_required}>
                <td>
                  <span
                    onClick={() => setToogle((prev) => toogle(prev, "LPDH"))}
                  >
                    {toggling("LPDH")}
                  </span>
                  LP DH Required
                </td>
                {LP_Dh_Required.map((v, i) => (
                  <td key={i}>{v}</td>
                ))}
              </tr>
              {Toogle["LPDH"] && (
                 <React.Fragment>
                   <tr className={c.Show_hidens}>
                   <td>LP HD</td>
                   {data.map((y) =>
                     y.weeks.map((w) => {
                       const data = w.LP_DH_Required.LP_HD;
                       return (
                         <td key={w._id}>
                           <input placeholder={data} />
                         </td>
                       );
                     })
                   )}
                 </tr>
                  <tr className={c.Show_hidens}>
                   <td>Polyvalents</td>
                   {data.map((y) =>
                     y.weeks.map((w) => {
                       const data = w.LP_DH_Required.Polyvalents;
                       return (
                         <td key={w._id}>
                           <input placeholder={data} />
                         </td>
                       );
                     })
                   )}
                 </tr>
                  <tr className={c.Show_hidens}>
                   <td>Contention</td>
                   {data.map((y) =>
                     y.weeks.map((w) => {
                       const data = w.LP_DH_Required.Contention;
                       return (
                         <td key={w._id}>
                           <input placeholder={data} />
                         </td>
                       );
                     })
                   )}
                 </tr>
                   <tr className={c.Show_hidens}>
                   <td>Absenteeism</td>
                   {data.map((y) =>
                     y.weeks.map((w) => {
                       const data = w.LP_DH_Required.Absenteeism;
                       return (
                         <td key={w._id}>
                           <input placeholder={data} />
                         </td>
                       );
                     })
                   )}
                 </tr>
                   <tr className={c.Show_hidens}>
                   <td>Long Term Illness</td>
                   {data.map((y) =>
                     y.weeks.map((w) => {
                       const data = w.LP_DH_Required.Long_Term_Illness;
                       return (
                         <td key={w._id}>
                           <input placeholder={data} />
                         </td>
                       );
                     })
                   )}
                 </tr>
                  <tr className={c.Show_hidens}>
                   <td>Training</td>
                   {data.map((y) =>
                     y.weeks.map((w) => {
                       const data = w.LP_DH_Required.Training;
                       return (
                         <td key={w._id}>
                           <input placeholder={data} />
                         </td>
                       );
                     })
                   )}
                 </tr>
                   <tr className={c.Show_hidens}>
                   <td>Attrition Backup</td>
                   {data.map((y) =>
                     y.weeks.map((w) => {
                       const data = w.LP_DH_Required.Attrition_Backup;
                       return (
                         <td key={w._id}>
                           <input placeholder={data} />
                         </td>
                       );
                     })
                   )}
                 </tr>
                   <tr className={c.Show_hidens}>
                   <td>SOS</td>
                   {data.map((y) =>
                     y.weeks.map((w) => {
                       const data = w.LP_DH_Required.SOS;
                       return (
                         <td key={w._id}>
                           <input placeholder={data} />
                         </td>
                       );
                     })
                   )}
                 </tr>
                   <tr className={c.Show_hidens}>
                   <td>Prototypes</td>
                   {data.map((y) =>
                     y.weeks.map((w) => {
                       const data = w.LP_DH_Required.Prototypes;
                       return (
                         <td key={w._id}>
                           <input placeholder={data} />
                         </td>
                       );
                     })
                   )}
                 </tr>
                   <tr className={c.Show_hidens}>
                   <td>DR</td>
                   {data.map((y) =>
                     y.weeks.map((w) => {
                       const data = w.LP_DH_Required.DR;
                       return (
                         <td key={w._id}>
                           <input placeholder={data} />
                         </td>
                       );
                     })
                   )}
                 </tr>
                  <tr className={c.Show_hidens}>
                   <td>LP Support (Internal DR + Die centre)</td>
                   {data.map((y) =>
                     y.weeks.map((w) => {
                       const data =
                         w.LP_DH_Required.LP_Support_Internal_DR_Die_centre;
                       return (
                         <td key={w._id}>
                           <input placeholder={data} />
                         </td>
                       );
                     })
                   )}
                 </tr>
                   <tr className={c.Show_hidens}>
                   <td>Rework</td>
                   {data.map((y) =>
                     y.weeks.map((w) => {
                       const data = w.LP_DH_Required.Rework;
                       return (
                         <td key={w._id}>
                           <input placeholder={data} />
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
                    onClick={() => setToogle((prev) => toogle(prev, "LPACD"))}
                  >
                    {toggling("LPACD")}
                  </span>
                  LP DH Actual
                </td>
                {LP_Actual_DH.map((v, i) => (
                  <td key={i}>{v}</td>
                ))}
              </tr>

              {Toogle["LPACD"] && (
                <React.Fragment>
                  <tr
                    style={{ backgroundColor: "#ffe99a" }}
                    className={c.Show_hidens}
                  >
                    <td>Attrition</td>
                    {data.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.LP_ActualDH.Attrition;
                        return (
                          <td key={w._id}>
                            <input placeholder={data} />
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
                    {data.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.LP_ActualDH.Transfer;
                        return (
                          <td key={w._id}>
                            <input placeholder={data} />
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
                    {data.map((y) =>
                      y.weeks.map((w) => {
                        const data = w.LP_ActualDH.Hiring;
                        return (
                          <td key={w._id}>
                            <input placeholder={data} />
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
              {GapLP.map((g, i) => (
                <td key={i} style={{ color: CheckGap(GapLP, i) }}>
                  {g || "-"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Cutting;
