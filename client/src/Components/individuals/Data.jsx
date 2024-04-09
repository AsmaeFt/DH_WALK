import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import date from '../assets/dates.png';
import car from '../assets/car.png';


import { getWeek, handleChange } from '../functions/utilis';
import './Data.css';

const Data = () => {

  const [project, setProject] = useState({
    month_name: '',
    weeks: [
      {
        week_name: '',
        projectData: {
          projectName: '',
          family: [], 
          project_OS: {}, 
          project_special_list: {}, 
          project_actual_DH: {}
        }
      }
    ]
  });
  
  const [family, setFamily] = useState([]);
  const today = new Date();
  const weeknumber = getWeek(today);
  const [familyInputs, setFamilyInputs] = useState({});

  const [projectOS, setProjectOS] = useState({ 
    Digitalization: '',
    Daily_Kaizen: '',
    OS_Auditing: '',
    OS_Auditing_Data_Reporting: ''
  });
  const [projectSpecialList, setprojectSpecialList] = useState({
    Pregnant_women_out_of_the_plant:'',
    Maternity:'',
    Breastfeeding_leave:'',
    LTI_Long_term_weaknesses_LWD:'',
    Physical_incapacity_NMA:''

  });
  const [projectAcualDh, setprojectAcualDh] = useState({
        Attrition:'',
        Transfer:'',
        Hiring:''

  })

  const [step, setStep] = useState(1);

  const [totalHc, settotalHc] = useState({});

  const fetchProjectData = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:1200/api/Get_project');
      const projects = await res.data;

      const getProject = projects.filter((e) => e.name === 'K9 KSK')[0];
      if (getProject) {
        const families = getProject.family.map((f) => f.name);
        setFamily(families);
        setFamilyInputs(
          families.reduce((acc, family) => ({ ...acc, [family]: {} }), {})
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  const handleInputChange = (e, familyIndex, field) => {
    const { value } = e.target;
    const familyName = family[familyIndex];

    setFamilyInputs(prev => ({
      ...prev,
      [family[familyIndex]]: {
        ...prev[family[familyIndex]],
        [field]: value
      }
   
    }));

    settotalHc((prev)=> ({...prev,
    [familyName]:(prev[familyName] || 0)+parseInt(value)
  }));
  };


    const month = new Date().toLocaleString('en-US', { month: 'long' });
   const submit = () => {

   
    if(step!=5){
      setStep(step+1)
    
      setProject((prev) => ({
        ...prev,
        month_name: month,
        weeks:{week_name:'week:'+weeknumber,projectData:{projectName:'K9 HAB',family:[familyInputs],project_OS:{projectOS},project_special_list:{projectSpecialList},project_actual_DH:{projectAcualDh}}},
      }));
    
      console.log(project);

    }
    else {
      axios.post('http://localhost:1200/api/add_data',project)
      .then(res => {
        console.log(res.data);
      }).catch(err=> console.error(err))
    }
  };

  return (
    <div className="data_container">
      <div className="form_container">
        <div className="form">
          <div className="form_header">
            <img src={date} alt="date" />
            <label>
              Week: <span> {weeknumber} </span>
            </label>
            <label>
              Month: <span>{month}</span>
            </label>
            <label>
              Year: <span>{new Date().getFullYear()}</span>
            </label>
          </div>

          <div className="project">
            <img src={car} alt="car" />
            <label>
              Project: <span> K9 KSK </span>
            </label>
          </div>

          <div className="form_content">
            <div className="div1">
              <div>
              {step === 1 && (
                family.map((familyMember, index) => (
                  <form key={index}>
                    <label>Family : {familyMember}</label>
                    <br />
                    <hr />
                    <br />
                    <input type="text" placeholder="crews" onChange={(e) => handleInputChange(e, index, 'crews')} />
                    <input type="text" placeholder="ME definition" onChange={(e) => handleInputChange(e, index, 'ME_DEFINITION')} />
                    <input type="text" placeholder="ME support" onChange={(e) => handleInputChange(e, index, 'ME_SUPPORT')} />
                    <input type="text" placeholder="Rework" onChange={(e) => handleInputChange(e, index, 'Rework')} />
                    <input type="text" placeholder="Poly" onChange={(e) => handleInputChange(e, index, 'Poly')} />
                    <input type="text" placeholder="Back Up" onChange={(e) => handleInputChange(e, index, 'Back_Up')} />
                    <input type="text" placeholder="Containment" onChange={(e) => handleInputChange(e, index, 'Containment')} />
                    <input type="text" placeholder="SOS" onChange={(e) => handleInputChange(e, index, 'SOS')} />
 
                  </form>
                ))
              )}
              {step === 2 && (
                <form>
                  <label>K9 KSK OS </label>
                  <input type="text" placeholder="Digitalization" value={projectOS.Digitalization} onChange={(e) => handleChange(e,'Digitalization',setProjectOS)} />
                  <input type="text" placeholder="Daily Kaizen" value={projectOS.Daily_Kaizen} onChange={(e) => handleChange(e,'Daily_Kaizen',setProjectOS)} />
                  <input type="text" placeholder="OS Auditing" value={projectOS.OS_Auditing} onChange={(e) => handleChange(e,'OS_Auditing',setProjectOS)} />
                  <input type="text" placeholder="OS Auditing & Data Reporting" value={projectOS.OS_Auditing_Data_Reporting} onChange={(e) => handleChange(e, 'OS_Auditing_Data_Reporting',setProjectOS)} />
               
                </form>
              )}
              {step === 3 && (
                <form>
                  <label>K9 KSK Special list out of the plant</label>
                  <input type="text" placeholder="Pregnant women out of the plant" value={projectSpecialList.Pregnant_women_out_of_the_plant}  onChange={(e)=> handleChange(e,'Pregnant_women_out_of_the_plant',setprojectSpecialList)}/>
                  <input type="text" placeholder="Maternity" value={projectSpecialList.Maternity} onChange={(e)=> handleChange(e,'Maternity',setprojectSpecialList)}/>
                  <input type="text" placeholder="Breastfeeding leave"value={projectSpecialList.Breastfeeding_leave}  onChange={(e)=> handleChange(e,'Breastfeeding_leave',setprojectSpecialList)}/>
                  <input type="text" placeholder="LTI: Long term weaknesses, LWD," value={projectSpecialList.LTI_Long_term_weaknesses_LWD} onChange={(e)=> handleChange(e,'LTI_Long_term_weaknesses_LWD',setprojectSpecialList)}/>
                  <input type="text" placeholder="Physical incapacity & NMA" value={projectSpecialList.Physical_incapacity_NMA} onChange={(e)=> handleChange(e,'Physical_incapacity_NMA',setprojectSpecialList)}/>
                 
                
                </form>
              )}
              {step === 4 && (
                <form>
                  <label>K9 KSK Actual DH</label>
                  <input type="text" placeholder="Attrition" value={projectAcualDh.Attrition} onChange={(e)=> handleChange(e,'Attrition',setprojectAcualDh)} />
                  <input type="text" placeholder="Transfer"  value={projectAcualDh.Transfer} onChange={(e)=> handleChange(e,'Transfer',setprojectAcualDh)}/>
                  <input type="text" placeholder="Hiring"  value={projectAcualDh.Hiring} onChange={(e)=> handleChange(e,'Hiring',setprojectAcualDh)}/>
                
                </form>
              )}
              {step === 5 && (
                
                      <div className="summary">
                       
                          <div className='family_'>

                            {Object.keys(familyInputs).map((family, i) => (
                              <div key={i}>
                                <label>Family: {family}</label>
                                <label>Crew: {familyInputs[family].crews}</label>
                                <label>ME Definition: {familyInputs[family].Me_Definition}</label>
                                <label>ME Support: {familyInputs[family].Me_Support}</label>
                                <label>Rework: {familyInputs[family].Rework}</label>
                                <label>Poly: {familyInputs[family].Poly}</label>
                                <label>Back Up: {familyInputs[family].Back_up}</label>
                                <label>Containment: {familyInputs[family].Containment}</label>
                                <label>SOS: {familyInputs[family].SOS}</label>
                              </div>
                            ))}
                          </div>

                                <div className='others_'> 
                                <div>
                          <h3>K9 KSK OS</h3>
                          <label>Digitalization: <span>{projectOS.Digitalization}</span> </label>              
                          <label>Daily Kaizen: <span>{projectOS.Daily_Kaizen}</span></label>
                          <label>OS Auditing:  <span>{projectOS.OS_Auditing}</span></label>
                          <label>OS Auditing & Data Reporting: <span>{projectOS.OS_Auditing_Data_Reporting}</span></label>
                          </div>

                          <div> 
                          <h3>K9 KSK Special list out of the plant</h3>
                          <label>Pregnant women out of the plant:  <span>{projectSpecialList.Pregnant_women_out_of_the_plant}</span></label>
                          <label>Maternity:  <span>{projectSpecialList.Maternity}</span></label>
                          <label>Breastfeeding leave: <span>{projectSpecialList.Breastfeeding_leave}</span></label>
                          <label>LTI: Long term weaknesses, LWD: <span>{projectSpecialList.LTI_Long_term_weaknesses_LWD}</span></label>
                          <label>Physical incapacity & NMA: <span>{projectSpecialList.Physical_incapacity_NMA}</span></label>
                          </div> 
                      
                          <div> 
                              <h3>K9 KSK Actual DH</h3>
                                <label>Attrition: <span>{projectAcualDh.Attrition}</span></label>
                                <label>Transfer:  <span>{projectAcualDh.Transfer}</span></label>
                                <label>Hiring: <span>{projectAcualDh.Hiring}</span></label>
                          </div>
                          </div>
                        

                     </div>
                     )}
            
              </div>

              <div className="next">
                <button onClick={submit}>{step !== 5 ? 'Next' : 'Confirm Weekly DH'}</button>
              </div>

             
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;