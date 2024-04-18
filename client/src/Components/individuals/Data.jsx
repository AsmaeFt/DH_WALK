import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import date from '../assets/dates.png';
import car from '../assets/car.png';
import { getWeek } from '../functions/utilis';
import './Data.css'


const Data = () => {
  const [project, setProject] = useState({
    month_name: '',
    weeks: [
      {
        week_name: '',
        projectData: [
          {
            projectName: '',
            family: [
              {
                name: '',
                crews:0,
                ME_DEFINITION: 0,
                ME_SUPPORT: 0,
                Rework: 0,
                Poly: 0,
                Back_Up: 0,
                Containment: 0,
                SOS: 0
              }
            ],
            project_OS: {
              Digitalization: 0,
              Daily_Kaizen: 0,
              OS_Auditing: 0,
              OS_Auditing_Data_Reporting: 0
            },
            project_special_list: {
              Pregnant_women_out_of_the_plant: 0,
              Maternity: 0,
              Breastfeeding_leave: 0,
              LTI_Long_term_weaknesses_LWD: 0,
              Physical_incapacity_NMA: 0
            },
            project_actual_DH: {
              Attrition: 0,
              Transfer: 0,
              Hiring: 0,
              last_HC:0
            }
          }
        ]
      }
    ]
  });

  const [month, setmonth] = useState('');
  const [week, setweek] = useState('');

  const [familyInputs, setFamilyInputs] = useState([]);
  const [projectOS, setProjectOS] = useState({
    Digitalization: '',
    Daily_Kaizen: '',
    OS_Auditing: '',
    OS_Auditing_Data_Reporting: ''
  });
  const [projectSpecialList, setProjectSpecialList] = useState({
    Pregnant_women_out_of_the_plant: '',
    Maternity: '',
    Breastfeeding_leave: '',
    LTI_Long_term_weaknesses_LWD: '',
    Physical_incapacity_NMA: ''
  });
  const [projectActualDH, setProjectActualDH] = useState({
    Attrition: '',
    Transfer: '',
    Hiring: '',
    last_HC:'',
  });
  const [step, setStep] = useState(1);

  useEffect(() => {
    fetchProjectData();
    setweek(`${new Date().getFullYear()}-W${getWeek(new Date()).toString().padStart(2, '0')}`);
    setmonth(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`);
  }, []);

  const fetchProjectData = async () => {
    try {
      const res = await axios.get('http://10.236.150.19:8080/api/Get_project');
      const projects = await res.data;
      const getProject = projects.filter((e) => e.name === 'K9 KSK')[0];
      if (getProject) {
        const families = getProject.family.map((f) => f.name);
        
        setFamilyInputs(
          families.map((family) => ({
            name: family,
            crews: '',
            ME_DEFINITION: '',
            ME_SUPPORT: '',
            Rework: '',
            Poly: '',
            Back_Up: '',
            Containment: '',
            SOS: ''
          }))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    setFamilyInputs((prev) =>
      prev.map((family, i) =>
        i === index ? { ...family, [field]: value } : family
      )
    );
  };

  const submit = () => {
    if (step !== 5) {
      setStep(step + 1);
      setProject((prev) => ({
        ...prev,
        month_name: month,
        weeks: [
          {
            week_name: week,
            projectData: [
              {
                projectName: 'K9 HAB',
                family: familyInputs,
                project_OS: projectOS,
                project_special_list: projectSpecialList,
                project_actual_DH: projectActualDH
              }
            ]
          }
        ]
      }));

      console.log(JSON.stringify(project,null,2));
    } else {
      axios
        .post('http://10.236.150.19:8080/api/add_data', project)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => console.error(err));
    }
  };

  const handleChange = (e, field, setter) => {
    setter((prev) => ({ ...prev, [field]: e.target.value }));
  };

  
  const isFirstWeekOfYear = useCallback(() => {
    const curentYEAR = new Date().getFullYear();
    return (week === `${curentYEAR}-W01` && month === `${curentYEAR}-01`) 
  
  }, [week, month]);
  
  useEffect(() => {
    isFirstWeekOfYear();
  }, [week, month,isFirstWeekOfYear]);

  console.log(week,month);

 
  return (
    <div className="data_container">
      <div className="form_container">
        <div className="form">
          <div className="form_header">
            <img src={date} alt="date" />
            <label>
              Week: <input type='week' value={week}  onChange={(e) => setweek(e.target.value)} />
            </label>
            <label>
              Month: <input type='month' value={month} onChange={(e) => setmonth(e.target.value)} />
            </label>
          
          </div>

          <div className="project">
            <img src={car} alt="car" />
            <label>
              Project: <span>K9 KSK</span>
            </label>
          </div>

          <div className="form_content">
          <div className="div_inputs">
          <div className='inputs_'>
              {step === 1 && (
                familyInputs.map((family, index) => (
                  <form key={index}>
                    <label>Family: {family.name}</label>
                    <input
                      type="text"
                      placeholder="Crews"
                      value={family.crews}
                      onChange={(e) => handleInputChange(e, index, 'crews')}
                    />
                    <input
                      type="text"
                      placeholder="ME Definition"
                      value={family.ME_DEFINITION}
                      onChange={(e) => handleInputChange(e, index, 'ME_DEFINITION')}
                    />
                    <input
                      type="text"
                      placeholder="ME Support"
                      value={family.ME_SUPPORT}
                      onChange={(e) => handleInputChange(e, index, 'ME_SUPPORT')}
                    />
                    <input
                      type="text"
                      placeholder="Rework"
                      value={family.Rework}
                      onChange={(e) => handleInputChange(e, index, 'Rework')}
                    />
                    <input
                      type="text"
                      placeholder="Poly"
                      value={family.Poly}
                      onChange={(e) => handleInputChange(e, index, 'Poly')}
                    />
                    <input
                      type="text"
                      placeholder="Back Up"
                      value={family.Back_Up}
                      onChange={(e) => handleInputChange(e, index, 'Back_Up')}
                    />
                    <input
                      type="text"
                      placeholder="Containment"
                      value={family.Containment}
                      onChange={(e) => handleInputChange(e, index, 'Containment')}
                    />
                    <input
                      type="text"
                      placeholder="SOS"
                      value={family.SOS}
                      onChange={(e) => handleInputChange(e, index, 'SOS')}
                    />
                  </form>
                ))
              )}
              {step === 2 && (
                <form>
                  <label>K9 KSK OS</label>
                  <input
                    type="text"
                    placeholder="Digitalization"
                    value={projectOS.Digitalization}
                    onChange={(e) => handleChange(e, 'Digitalization', setProjectOS)}
                  />
                  <input
                    type="text"
                    placeholder="Daily Kaizen"
                    value={projectOS.Daily_Kaizen}
                    onChange={(e) => handleChange(e, 'Daily_Kaizen', setProjectOS)}
                  />
                  <input
                    type="text"
                    placeholder="OS Auditing"
                    value={projectOS.OS_Auditing}
                    onChange={(e) => handleChange(e, 'OS_Auditing', setProjectOS)}
                  />
                  <input
                    type="text"
                    placeholder="OS Auditing & Data Reporting"
                    value={projectOS.OS_Auditing_Data_Reporting}
                    onChange={(e) => handleChange(e, 'OS_Auditing_Data_Reporting', setProjectOS)}
                  />
                </form>
              )}
              {step === 3 && (
                <form>
                  <label>K9 KSK Special list out of the plant</label>
                  <input
                    type="text"
                    placeholder="Pregnant women out of the plant"
                    value={projectSpecialList.Pregnant_women_out_of_the_plant}
                    onChange={(e) => handleChange(e, 'Pregnant_women_out_of_the_plant', setProjectSpecialList)}
                  />
                  <input
                    type="text"
                    placeholder="Maternity"
                    value={projectSpecialList.Maternity}
                    onChange={(e) => handleChange(e, 'Maternity', setProjectSpecialList)}
                  />
                  <input
                    type="text"
                    placeholder="Breastfeeding leave"
                    value={projectSpecialList.Breastfeeding_leave}
                    onChange={(e) => handleChange(e, 'Breastfeeding_leave', setProjectSpecialList)}
                  />
                  <input
                    type="text"
                    placeholder="LTI: Long term weaknesses, LWD"
                    value={projectSpecialList.LTI_Long_term_weaknesses_LWD}
                    onChange={(e) => handleChange(e, 'LTI_Long_term_weaknesses_LWD', setProjectSpecialList)}
                  />
                  <input
                    type="text"
                    placeholder="Physical incapacity & NMA"
                    value={projectSpecialList.Physical_incapacity_NMA}
                    onChange={(e) => handleChange(e, 'Physical_incapacity_NMA', setProjectSpecialList)}
                  />
                </form>
              )}
              {step === 4 && (
                <form>
                  <label>K9 KSK Actual DH</label>
                  <input
                    type="text"
                    placeholder="Attrition"
                    value={projectActualDH.Attrition}
                    onChange={(e) => handleChange(e, 'Attrition', setProjectActualDH)}
                  />
                  <input
                    type="text"
                    placeholder="Transfer"
                    value={projectActualDH.Transfer}
                    onChange={(e) => handleChange(e, 'Transfer', setProjectActualDH)}
                  />
                  <input
                    type="text"
                    placeholder="Hiring"
                    value={projectActualDH.Hiring}
                    onChange={(e) => handleChange(e, 'Hiring', setProjectActualDH)}
                  />
                   { isFirstWeekOfYear() && (
                    <input
                    type="text"
                    placeholder="Latest HC "
                    value={projectActualDH.last_HC}
                    onChange={(e) => handleChange(e, 'last_HC', setProjectActualDH)}
                  />)}
                </form>
              )}
              {step === 5 && (
                <div className="summary">
                  <div className="family_">
                    {familyInputs.map((family, index) => (
                      <div className='inputs_summary' key={index}>
                        <label>Family: {family.name}</label>
                        <label>Crew: {family.crews}</label>
                        <label>ME Definition: {family.ME_DEFINITION}</label>
                        <label>ME Support: {family.ME_SUPPORT}</label>
                        <label>Rework: {family.Rework}</label>
                        <label>Poly: {family.Poly}</label>
                        <label>Back Up: {family.Back_Up}</label>
                        <label>Containment: {family.Containment}</label>
                        <label>SOS: {family.SOS}</label>
                      </div>
                    ))}
                  </div>
                  <div className="others_">
                    <div className='inputs_summary'>
                      <h3>K9 KSK OS</h3>
                      <label>
                        Digitalization: <span>{projectOS.Digitalization}</span>
                      </label>
                      <label>
                        Daily Kaizen: <span>{projectOS.Daily_Kaizen}</span>
                      </label>
                      <label>
                        OS Auditing: <span>{projectOS.OS_Auditing}</span>
                      </label>
                      <label>
                        OS Auditing & Data Reporting:{' '}
                        <span>{projectOS.OS_Auditing_Data_Reporting}</span>
                      </label>
                    </div>
                    <div className='inputs_summary'>
                      <h3>K9 KSK Special list out of the plant</h3>
                      <label>
                        Pregnant women out of the plant:{' '}
                        <span>{projectSpecialList.Pregnant_women_out_of_the_plant}</span>
                      </label>
                      <label>
                        Maternity: <span>{projectSpecialList.Maternity}</span>
                      </label>
                      <label>
                        Breastfeeding leave:{' '}
                        <span>{projectSpecialList.Breastfeeding_leave}</span>
                      </label>
                      <label>
                        LTI: Long term weaknesses, LWD:{' '}
                        <span>{projectSpecialList.LTI_Long_term_weaknesses_LWD}</span>
                      </label>
                      <label>
                        Physical incapacity & NMA:{' '}
                        <span>{projectSpecialList.Physical_incapacity_NMA}</span>
                      </label>
                    </div>
                    <div className='inputs_summary'>
                      <h3>K9 KSK Actual DH</h3>
                      <label>
                        Attrition: <span>{projectActualDH.Attrition}</span>
                      </label>
                      <label>
                        Transfer: <span>{projectActualDH.Transfer}</span>
                      </label>
                      <label>
                        Hiring: <span>{projectActualDH.Hiring}</span>
                      </label>
                      <label>
                        Lates HC : <span>{projectActualDH.last_HC}</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
             </div>
              <div className="next">
                <button onClick={submit}>
                  {step !== 5 ? 'Next' : 'Confirm Weekly DH'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
