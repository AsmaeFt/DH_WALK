import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import car from '../Components/assets/car.png'
import './Home.css';
import { generateWeeks } from '../Components/functions/utilis';

const Home = () => {
  const [DATA, setDATA] = useState([]);
  const [project, setproject] = useState([])
  const [family, setfamily] = useState([])

  const fetchedData = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:1200/api/DATA');
      const projectss= res.data.map((x)=> x.weeks.map((b)=> b.projectData.map((f)=> f.family)))
      console.log(projectss);
      setDATA(res.data);

      const projects = await axios.get('http://localhost:1200/api/Get_project');
      const GetProject = await projects.data.map((project)=> project.name)
      const Project = await projects.data.filter((v)=>v.name==='K9 KSK')
      const families = await Project.map((f)=> f.family.map((m)=> m.name))
      setfamily(families)
     
      setproject(GetProject)
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchedData();
  }, [fetchedData]);


 

const week = generateWeeks();

  return (
    <>
      <div className="header_container">
        <h2>DH Headcount Walk 2024</h2>
        <p>Weekly Walk</p>
      </div>

      <div className='projects'>
       {
        project.map((project,i)=>(
          <label key={i}><img src={car}/>{project}</label>
        ))
       }
      </div>

      <div className="table_container">

        <table>
        <thead>
      <tr>
      <th></th>
        {week.map((week, i) => (
          <th key={i}>{week.month}</th>
        ))}
      </tr>
      <tr>
        <th></th>
        {week.map((week, i) => (
          <th key={i}>{week.date}</th>
        ))}
      </tr>
      <tr>
      <th></th>
        {week.map((week, i) => (
          <th key={i}>{week.week}</th>
        ))}
      </tr>
    </thead>
    <tbody>
    <tr>
      <td>DH_Required</td>
        {week.map((_, i) => (
          <td key={i}>1921</td>
        ))}
    </tr>
      <tr>
        <td>Project</td>
        {week.map((_, i) => (
            <td key={i}>1869</td>
          ))}
      </tr>
   
      {family.flat().map((f, i) => (
         <tr key={i}><td>{f}</td></tr>
      ))}

   
    </tbody>
        </table>

      {/*   <table>
          <thead>
           
            <tr>
              <th>Month</th>
              <th>Week</th>
              <th>Project</th>
              <th>Family</th>
              <th>Crews</th>
              <th>ME_DEFINITION</th>
              <th>ME_SUPPORT</th>
              <th>Rework</th>
              <th>Poly</th>
              <th>Back_Up</th>
              <th>Containment</th>
              <th>SOS</th>
             
              <th>Digitalization</th>
              <th>Daily Kaizen</th>
              <th>OS Auditing</th>
              <th>OS Auditing Data Reporting</th>
              <th>Pregnant Women Out of the Plant</th>
              <th>Maternity</th>
              <th>Breastfeeding Leave</th>
              <th>LTI Long Term Weaknesses LWD</th>
              <th>Physical Incapacity NMA</th>
              <th>Attrition</th>
              <th>Transfer</th>
              <th>Hiring</th>
            </tr>
          </thead>
          <tbody>
            {DATA.map(month => (
              month.weeks.map(week => (
                week.projectData.map(project => (
                  project.family.map(fam => (
                    <tr key={project._id + fam.name}>
                      <td>{month.month_name}</td>
                      <td>{week.week_name}</td>
                      <td>{project.projectName}</td>
                      <td>{fam.name}</td>
                      <td>{fam.crews}</td>
                      <td>{fam.ME_DEFINITION}</td>
                      <td>{fam.ME_SUPPORT}</td>
                      <td>{fam.Rework}</td>
                      <td>{fam.Poly}</td>
                      <td>{fam.Back_Up}</td>
                      <td>{fam.Containment}</td>
                      <td>{fam.SOS}</td>
                      <td>{project.project_OS.Digitalization}</td>
                      <td>{project.project_OS.Daily_Kaizen}</td>
                      <td>{project.project_OS.OS_Auditing}</td>
                      <td>{project.project_OS.OS_Auditing_Data_Reporting}</td>
                      <td>{project.project_special_list.Pregnant_women_out_of_the_plant}</td>
                      <td>{project.project_special_list.Maternity}</td>
                      <td>{project.project_special_list.Breastfeeding_leave}</td>
                      <td>{project.project_special_list.LTI_Long_term_weaknesses_LWD}</td>
                      <td>{project.project_special_list.Physical_incapacity_NMA}</td>
                      <td>{project.project_actual_DH.Attrition}</td>
                      <td>{project.project_actual_DH.Transfer}</td>
                      <td>{project.project_actual_DH.Hiring}</td>
                    </tr>
                  ))
                ))
              ))
            ))}
          </tbody>
        </table> */}
      </div>
    </>
  );
};

export default Home;
