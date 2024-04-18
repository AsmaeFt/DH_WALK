import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import car from '../assets/car.png';
 

 
const Vertical_table = () => {
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('K9 KSK');
 
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://10.236.150.19:8080/api/DATA');
      setData(response.data);
      const projectNames = [...new Set(response.data.flatMap(month => month.weeks.flatMap(week => week.projectData.map(project => project.projectName))))];
      setProjects(projectNames);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);
 
  useEffect(() => {
    fetchData();
  }, [fetchData]);
 
  return (
    <>
      <div className="header_container">
        <h2>DH Headcount Walk 2024</h2>
        <p>Weekly Walk</p>
      </div>
 
      <div className='projects'>
        {projects.map((projectName, i) => (
          <label key={i} onClick={() => setSelectedProject(projectName)}>
            <img src={car} alt="Car icon" />
            {projectName}
          </label>
        ))}
      </div>
 
      <div className="table_container">
        <table>
          <thead>
            <tr>
              <th>Attributes / Weeks</th>
              {data.flatMap(month => month.weeks).map((week, index) => (
                <th key={index}>{week.week_name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>{selectedProject} HC Required</td>
              {data.flatMap(month => month.weeks).map(week => {
                const project = week.projectData.find(p => p.projectName === selectedProject);
                if (!project) return <td key={week._id}>-</td>;
                const totalHC = project.family.reduce((acc, fam) => acc + ((fam.ME_DEFINITION + fam.ME_SUPPORT + fam.Rework + fam.Poly + fam.Back_Up + fam.Containment) * fam.crews + fam.SOS), 0);
                return <td key={week._id}>{totalHC}</td>;
              })}
            </tr>
            <tr>
              <td>{selectedProject}</td>
              {data.flatMap(month => month.weeks).map(week => (
                <td key={week._id}>{week.projectData.find(p => p.projectName === selectedProject)?.projectName}</td>
              ))}
            </tr>
          
            <tr>
              <td>Actual Direct Headcount (DH)</td>
              {data.flatMap(month => month.weeks).map(week => {
                const project = week.projectData.find(p => p.projectName === selectedProject);
                return <td key={week._id}>{project ? project.project_actual_DH.last_HC : '-'}</td>;
              })}
            </tr>
            <tr>
              <td>Gap</td>
              {data.flatMap(month => month.weeks).map(week => {
                const project = week.projectData.find(p => p.projectName === selectedProject);
                if (!project) return <td key={week._id}>-</td>;
                const totalHC = project.family.reduce((acc, fam) => acc + ((fam.ME_DEFINITION + fam.ME_SUPPORT + fam.Rework + fam.Poly + fam.Back_Up + fam.Containment) * fam.crews + fam.SOS), 0);
                const gap = project.project_actual_DH.last_HC - totalHC;
                return <td key={week._id} style={{ color: gap < 0 ? 'red' : 'green' }}>{gap}</td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </>

    
  );
};
 
export default Vertical_table;