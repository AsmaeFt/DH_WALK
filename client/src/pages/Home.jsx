import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import car from '../Components/assets/car.png';
import Chart from '../Components/charts/Chart';

import './Home.css';



const Home = () => {
  const [DATA, setDATA] = useState([]);
  const [filtredData, setfiltredData] = useState([])
  
  const [project, setProject] = useState([]);
  const [totalProjectHC, setTotalProjectHC] = useState({});
  const [actualDH, setactualDH] = useState({});
  const [clickedPrpject, setclickedPrpject] = useState('K9 KSK');

  const [monthSelected, setmonthSelected] = useState('');
  const [weekSelected, setweekSelected] = useState('');

  const [Gap, setGap] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get('http://10.236.150.19:8080/api/DATA');
      const data = res.data;

      // Extract project names
      const projects = data.flatMap((w) => w.weeks.flatMap((pd) => pd.projectData.map((p) => p.projectName)));
      const uniqueProjects = [...new Set(projects)];
      setProject(uniqueProjects);

      // Filter and set data for specific project
      const k9kskData = data.map(month => ({
        month_name: month.month_name,
        weeks: month.weeks.map(week => ({
          week_name: week.week_name,
          projectData: week.projectData.filter(project => project.projectName === clickedPrpject)
        }))
      }));
      setDATA(k9kskData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [clickedPrpject]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const calculateTotalProjectHC = () => {

      const totalHCByWeek = {};
      const total_Actual_Dh={};
      let gapData = {} ;
      let previousLastHC = 0;

      DATA.forEach(month => {
        month.weeks.forEach(week => {
          let totalHC = 0;
          week.projectData.forEach(project => {

            const actual_dh = 
            (week.week_name.endsWith('-W01')
            ?  (project.project_actual_DH.last_HC - project.project_actual_DH.Attrition-project.project_actual_DH.Transfer+project.project_actual_DH.Hiring)
            : previousLastHC -
            project.project_actual_DH.Attrition -
            project.project_actual_DH.Transfer +
            project.project_actual_DH.Hiring);
            totalHC+=actual_dh
            previousLastHC=actual_dh
           
           const weekKey = `${month.month_name}-${week.week_name}`
           if (!total_Actual_Dh[weekKey]) {
            total_Actual_Dh[weekKey] = 0;
          }
            total_Actual_Dh[weekKey]+=totalHC
            project.family.forEach(fam => {
              const { ME_DEFINITION, ME_SUPPORT, Rework, Poly, Back_Up, Containment, crews, SOS } = fam;
              const hcCrews = ME_DEFINITION + ME_SUPPORT + Rework + Poly + Back_Up + Containment;
              const totalFamHc = (crews * hcCrews) + SOS;
              const weekKey = `${month.month_name}-${week.week_name}`;
            totalHCByWeek[weekKey] = (totalHCByWeek[weekKey] || 0) + totalFamHc;});


            const total_hc_project = totalHCByWeek[weekKey] ;
            const Total_Os = project.project_OS.Digitalization + project.project_OS.Daily_Kaizen + project.project_OS.OS_Auditing + project.project_OS.OS_Auditing_Data_Reporting;
            const total_special_list = project.project_special_list.Pregnant_women_out_of_the_plant + project.project_special_list.Maternity + project.project_special_list.Breastfeeding_leave + project.project_special_list.LTI_Long_term_weaknesses_LWD + project.project_special_list.Physical_incapacity_NMA;
            const total_required = total_hc_project + Total_Os + total_special_list

           
            const actualDH = total_Actual_Dh[weekKey] ;
            const gap = actualDH - total_required;
            gapData[weekKey] = gap
          



          });
        });
      });
      setTotalProjectHC(totalHCByWeek);
      setactualDH(total_Actual_Dh)
      setGap(gapData)
    };

    calculateTotalProjectHC();
  }, [DATA]);

 useEffect(()=>{
  const dataFilterd = DATA.filter((m)=> m.month_name===monthSelected || m.weeks.some((w)=> w.week_name===weekSelected))
  setDATA(dataFilterd)
  console.log(monthSelected);
 },[monthSelected,weekSelected])

console.log(DATA);
  return (
    <>
      <div className="header_container">
        <h2>DH Headcount Walk 2024</h2>
        <p>Weekly Walk</p>
      </div>

      <div className='projects'>
        {project.map((projectName, i) => (
          <label key={i} onClick={()=> setclickedPrpject(projectName)}><img src={car} alt="Car icon" />{projectName}</label>
        ))}
      </div>

      <div>
        <label>Filter By Month </label> <input type='month' value={monthSelected} onChange={(e)=> setmonthSelected(e.target.value)}/>
        <label>Filter By Week </label> <input type='week' value={weekSelected} onChange={(e)=> setweekSelected(e.target.value)}/>
      </div>

      <div className="table_container">
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Week</th>
              <th>Project</th>
              <th>HC Required</th>
              <th>Total HC project</th>
              <th>Family</th>
              <th>Indirects %</th>
              <th>Total HC</th>
              <th style={{ backgroundColor: 'black' }}>HC Crews</th>
              <th>Crews</th>
              <th>ME_DEFINITION</th>
              <th>ME_SUPPORT</th>
              <th>Rework</th>
              <th>Poly</th>
              <th>Back_Up</th>
              <th>Containment</th>
              <th>SOS</th>

              <th>Total OS</th>
              <th>Digitalization</th>
              <th>Daily Kaizen</th>
              <th>OS Auditing</th>
              <th>OS Auditing Data Reporting</th>

              <th>Total Special list</th>
              <th>Pregnant Women Out of the Plant</th>
              <th>Maternity</th>
              <th>Breastfeeding Leave</th>
              <th>LTI Long Term Weaknesses LWD</th>
              <th>Physical Incapacity NMA</th>

              <th>Actual DH</th>
              <th>Attrition</th>
              <th>Transfer</th>
              <th>Hiring</th>
              <th style={{backgroundColor:'red'}}>Gap</th>
            </tr>
          </thead>
          <tbody>
            {DATA.map(month => (
              month.weeks.map(week => (
                week.projectData.map(project => (
                  project.family.map((fam, index) => {
                    const { ME_DEFINITION, ME_SUPPORT, Rework, Poly, Back_Up, Containment, crews, SOS } = fam;
                    const hcCrews = ME_DEFINITION + ME_SUPPORT + Rework + Poly + Back_Up + Containment;
                    const totalFamHc = (crews * hcCrews) + SOS;
                    const Indirects = Math.round(((ME_SUPPORT + Rework + Poly + Back_Up + Containment + SOS) / ME_DEFINITION) * 100);

                    const totalProject = totalProjectHC[`${month.month_name}-${week.week_name}`] || 0;
                    const actual_dh = actualDH[`${month.month_name}-${week.week_name}`] || 0;
                    
                  
                 
                    const Total_Os = project.project_OS.Digitalization + project.project_OS.Daily_Kaizen + project.project_OS.OS_Auditing + project.project_OS.OS_Auditing_Data_Reporting;
                    const total_special_list = project.project_special_list.Pregnant_women_out_of_the_plant + project.project_special_list.Maternity + project.project_special_list.Breastfeeding_leave + project.project_special_list.LTI_Long_term_weaknesses_LWD + project.project_special_list.Physical_incapacity_NMA;
                    const Total_Hc_project = Total_Os + total_special_list + totalProject ;

                    const gap = actual_dh - Total_Hc_project

                  
                    
                     return (
                      
                       <tr key={`${project._id}-${fam.name}-${index}`}>
                        <td>{month.month_name}</td>
                        <td>{week.week_name}</td>
                        <td>{project.projectName}</td>
                        <td style={{ backgroundColor: 'black', color: 'green' }}>{Total_Hc_project}</td>

                        <td style={{ color: 'green' }}>{totalProject}</td>

                        <td>{fam.name}</td>
                        <td>{Indirects} %</td>
                        <td style={{ backgroundColor: 'black', color: hcCrews > 0 ? 'green' : 'red' }}>{totalFamHc}</td>
                        <td style={{ backgroundColor: 'black', color: hcCrews > 0 ? 'green' : 'red' }}>{hcCrews}</td>
                        <td>{crews}</td>
                        <td>{ME_DEFINITION}</td>
                        <td>{ME_SUPPORT}</td>
                        <td>{Rework}</td>
                        <td>{Poly}</td>
                        <td>{Back_Up}</td>
                        <td>{Containment}</td>
                        <td>{SOS}</td>


                        <td style={{backgroundColor:'black',color:'green'}}>{Total_Os}</td>
                        <td>{project.project_OS.Digitalization}</td>
                        <td>{project.project_OS.Daily_Kaizen}</td>
                        <td>{project.project_OS.OS_Auditing}</td>
                        <td>{project.project_OS.OS_Auditing_Data_Reporting}</td>

                        <td style={{backgroundColor:'black',color:'green'}}>{total_special_list}</td>
                        <td>{project.project_special_list.Pregnant_women_out_of_the_plant}</td>
                        <td>{project.project_special_list.Maternity}</td>
                        <td>{project.project_special_list.Breastfeeding_leave}</td>
                        <td>{project.project_special_list.LTI_Long_term_weaknesses_LWD}</td>
                        <td>{project.project_special_list.Physical_incapacity_NMA}</td>

                        <td style={{backgroundColor:'black',color:'green'}}>{actual_dh}</td>
                        <td>{project.project_actual_DH.Attrition}</td>
                        <td>{project.project_actual_DH.Transfer}</td>
                        <td>{project.project_actual_DH.Hiring}</td>
                        <td style={{color:gap>0? 'green':'red'}}>{gap}</td>

                        
                      </tr>
                    );
                  })
                ))
              ))
            ))}
          </tbody>
        </table>
      </div>
    
    </>
  );
};

export default Home;
