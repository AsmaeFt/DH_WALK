import React, { useState, useCallback, useEffect } from "react";
import c from "./import.module.css";
import Select from "react-select";
import api from "../../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Data = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [listProject, setlistProject] = useState({});
  const [selectedProject, setselectedProject] = useState("K9 KSK");

  const [project, setProject] = useState({
    year: new Date().getFullYear(),
    weeks: [
      {
        week_name: new Date().getFullYear() + "-" + "w01",
        projectData: [
          {
            projectName: "",
            family: [
              {
                name: "",
                crews: 0,
                ME_DEFINITION: 0,
                ME_SUPPORT: 0,
                Rework: 0,
                Poly: 0,
                Back_Up: 0,
                Containment: 0,
                SOS: 0,
              },
            ],
            project_OS: {
              Digitalization: 0,
              Daily_Kaizen: 0,
              OS_Auditing: 0,
              OS_Auditing_Data_Reporting: 0,
            },
            project_special_list: {
              Pregnant_women_out_of_the_plant: 0,
              Maternity: 0,
              Breastfeeding_leave: 0,
              LTI_Long_term_weaknesses_LWD: 0,
              Physical_incapacity_NMA: 0,
            },
            project_actual_DH: {
              Attrition: 0,
              Transfer: 0,
              Hiring: 0,
              last_HC: 0,
            },
          },
        ],
      },
    ],
  });

  const [familyInputs, setFamilyInputs] = useState([]);

  const [projectOS, setProjectOS] = useState({
    Digitalization: "",
    Daily_Kaizen: "",
    OS_Auditing: "",
    OS_Auditing_Data_Reporting: "",
  });

  const [projectSpecialList, setProjectSpecialList] = useState({
    Pregnant_women_out_of_the_plant: "",
    Maternity: "",
    Breastfeeding_leave: "",
    LTI_Long_term_weaknesses_LWD: "",
    Physical_incapacity_NMA: "",
  });

  const [projectActualDH, setProjectActualDH] = useState({
    Attrition: "",
    Transfer: "",
    Hiring: "",
    last_HC: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const projects = await axios.get(`${api}/Get_project`);

      const projectNames = await projects.data.flatMap((p) => p.name);

      const p = projectNames.map((p) => ({
        value: p,
        label: p,
      }));
      setlistProject(p);

      //families
      const families = projects.data
        .filter((p) => p.name === selectedProject)
        .flatMap((f) => f.family)
        .map((f) => f.name);

      setFamilyInputs(
        families.map((family) => ({
          name: family,
          crews: "",
          ME_DEFINITION: "",
          ME_SUPPORT: "",
          Rework: "",
          Poly: "",
          Back_Up: "",
          Containment: "",
          SOS: "",
        }))
      );
    } catch (err) {
      console.error("error is ", err);
    }
  }, [selectedProject]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    setFamilyInputs((prev) =>
      prev.map((family, i) =>
        i === index ? { ...family, [field]: value } : family
      )
    );
  };

  const prev = () => {
    setStep(step - 1);
  };

  const submit = () => {
    if (step !== 5) {
      setStep(step + 1);
      setProject((prev) => ({
        ...prev,
        year: new Date().getFullYear(),
        weeks: [
          {
            week_name: new Date().getFullYear() + "-" + "w01",
            projectData: [
              {
                projectName: selectedProject,
                family: familyInputs,
                project_OS: projectOS,
                project_special_list: projectSpecialList,
                project_actual_DH: projectActualDH,
              },
            ],
          },
        ],
      }));

      console.log(JSON.stringify(project, null, 2));
    } else {
      axios
        .post(`${api}/assembly_project`, project)
        .then((res) => {
          console.log(res.data);
          message.success("data had been successully added");
          navigate("/");
        })
        .catch((err) => console.error(err));
    }
  };

  const handleChange = (e, field, setter) => {
    setter((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleChangeselect = (e) => {
    setselectedProject(e.value);
  };
  console.log(selectedProject);

  return (
    <>
      {step === 1 && (
        <div className={c.projects}>
          <Select
            placeholder={"Select a Project . . ."}
            options={listProject}
            onChange={handleChangeselect}
            styles={{
              option: (p) => ({
                ...p,
                color: "black",
              }),
              control: (p) => ({
                ...p,
                width: 300,
              }),
            }}
          />
        </div>
      )}

      <div className={c.form_content}>
        <div className={c.div_inputs}>
          {step != 5 && (
            <div className={c.inputs_}>
              {step === 1 &&
                familyInputs.map((family, index) => (
                  <div key={index}>
                    <label>Family : {family.name}</label>
                    <h5>Crews</h5>
                    <input
                      type="text"
                      placeholder="Crews"
                      value={family.crews}
                      onChange={(e) => handleInputChange(e, index, "crews")}
                    />
                    <h5>ME Definition</h5>
                    <input
                      type="text"
                      placeholder="ME Definition"
                      value={family.ME_DEFINITION}
                      onChange={(e) =>
                        handleInputChange(e, index, "ME_DEFINITION")
                      }
                    />
                    <h5>ME Support</h5>
                    <input
                      type="text"
                      placeholder="ME Support"
                      value={family.ME_SUPPORT}
                      onChange={(e) =>
                        handleInputChange(e, index, "ME_SUPPORT")
                      }
                    />
                    <h5>Rework</h5>
                    <input
                      type="text"
                      placeholder="Rework"
                      value={family.Rework}
                      onChange={(e) => handleInputChange(e, index, "Rework")}
                    />
                    <h5>Poly</h5>
                    <input
                      type="text"
                      placeholder="Poly"
                      value={family.Poly}
                      onChange={(e) => handleInputChange(e, index, "Poly")}
                    />
                    <h5>Back_Up</h5>
                    <input
                      type="text"
                      placeholder="Back Up"
                      value={family.Back_Up}
                      onChange={(e) => handleInputChange(e, index, "Back_Up")}
                    />
                    <h5>Containment</h5>
                    <input
                      type="text"
                      placeholder="Containment"
                      value={family.Containment}
                      onChange={(e) =>
                        handleInputChange(e, index, "Containment")
                      }
                    />
                    <h5>SOS</h5>
                    <input
                      type="text"
                      placeholder="SOS"
                      value={family.SOS}
                      onChange={(e) => handleInputChange(e, index, "SOS")}
                    />
                  </div>
                ))}
              {step === 2 && (
                <div>
                  <label>K9 KSK OS</label>
                  <h5>Digitalization</h5>
                  <input
                    type="text"
                    placeholder="Digitalization"
                    value={projectOS.Digitalization}
                    onChange={(e) =>
                      handleChange(e, "Digitalization", setProjectOS)
                    }
                  />
                  <h5>Daily Kaizen</h5>
                  <input
                    type="text"
                    placeholder="Daily Kaizen"
                    value={projectOS.Daily_Kaizen}
                    onChange={(e) =>
                      handleChange(e, "Daily_Kaizen", setProjectOS)
                    }
                  />
                  <h5>OS Auditing</h5>
                  <input
                    type="text"
                    placeholder="OS Auditing"
                    value={projectOS.OS_Auditing}
                    onChange={(e) =>
                      handleChange(e, "OS_Auditing", setProjectOS)
                    }
                  />
                  <h5>OS Auditing & Data Reporting</h5>
                  <input
                    type="text"
                    placeholder="OS Auditing & Data Reporting"
                    value={projectOS.OS_Auditing_Data_Reporting}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "OS_Auditing_Data_Reporting",
                        setProjectOS
                      )
                    }
                  />
                </div>
              )}
              {step === 3 && (
                <div>
                  <label>K9 KSK Special list out of the plant</label>
                  <h5>Pregnant women out of the plant</h5>
                  <input
                    type="text"
                    placeholder="Pregnant women out of the plant"
                    value={projectSpecialList.Pregnant_women_out_of_the_plant}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "Pregnant_women_out_of_the_plant",
                        setProjectSpecialList
                      )
                    }
                  />
                  <h5>Maternity</h5>
                  <input
                    type="text"
                    placeholder="Maternity"
                    value={projectSpecialList.Maternity}
                    onChange={(e) =>
                      handleChange(e, "Maternity", setProjectSpecialList)
                    }
                  />
                  <h5>Breastfeeding leave</h5>
                  <input
                    type="text"
                    placeholder="Breastfeeding leave"
                    value={projectSpecialList.Breastfeeding_leave}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "Breastfeeding_leave",
                        setProjectSpecialList
                      )
                    }
                  />
                  <h5>LTI: Long term weaknesses, LWD</h5>
                  <input
                    type="text"
                    placeholder="LTI: Long term weaknesses, LWD"
                    value={projectSpecialList.LTI_Long_term_weaknesses_LWD}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "LTI_Long_term_weaknesses_LWD",
                        setProjectSpecialList
                      )
                    }
                  />
                  <h5>Physical incapacity & NMA</h5>
                  <input
                    type="text"
                    placeholder="Physical incapacity & NMA"
                    value={projectSpecialList.Physical_incapacity_NMA}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "Physical_incapacity_NMA",
                        setProjectSpecialList
                      )
                    }
                  />
                </div>
              )}
              {step === 4 && (
                <div>
                  <label>K9 KSK Actual DH</label>
                  <h5>Attrition</h5>
                  <input
                    type="text"
                    placeholder="Attrition"
                    value={projectActualDH.Attrition}
                    onChange={(e) =>
                      handleChange(e, "Attrition", setProjectActualDH)
                    }
                  />
                  <h5>Transfer</h5>
                  <input
                    type="text"
                    placeholder="Transfer"
                    value={projectActualDH.Transfer}
                    onChange={(e) =>
                      handleChange(e, "Transfer", setProjectActualDH)
                    }
                  />
                  <h5>Hiring</h5>
                  <input
                    type="text"
                    placeholder="Hiring"
                    value={projectActualDH.Hiring}
                    onChange={(e) =>
                      handleChange(e, "Hiring", setProjectActualDH)
                    }
                  />
                  <h5>Latest HC</h5>
                  <input
                    type="text"
                    placeholder="Latest HC "
                    value={projectActualDH.last_HC}
                    onChange={(e) =>
                      handleChange(e, "last_HC", setProjectActualDH)
                    }
                  />
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div className={c.summary}>
              <React.Fragment>
                <div className={c.familyData}>
                  {familyInputs.map((family, index) => (
                    <div key={index}>
                      <label>Family : {family.name}</label>
                      <label>Crew : {family.crews}</label>
                      <label>ME Definition : {family.ME_DEFINITION}</label>
                      <label>ME Support : {family.ME_SUPPORT}</label>
                      <label>Rework : {family.Rework}</label>
                      <label>Poly : {family.Poly}</label>
                      <label>Back Up : {family.Back_Up}</label>
                      <label>Containment : {family.Containment}</label>
                      <label>SOS : {family.SOS}</label>
                    </div>
                  ))}
                </div>

                <div className={c.others}>
                  <div>
                    <h3>K9 KSK OS</h3>
                    <label>Digitalization :{projectOS.Digitalization}</label>
                    <label>Daily Kaizen : {projectOS.Daily_Kaizen}</label>
                    <label>OS Auditing : {projectOS.OS_Auditing}</label>
                    <label>
                      OS Auditing & Data Reporting:
                      {projectOS.OS_Auditing_Data_Reporting}
                    </label>
                  </div>

                  <div>
                    <h3>K9 KSK Special list out of the plant</h3>
                    <label>
                      Pregnant women out of the plant:
                      {projectSpecialList.Pregnant_women_out_of_the_plant}
                    </label>
                    <label>Maternity: {projectSpecialList.Maternity}</label>
                    <label>
                      Breastfeeding leave:
                      {projectSpecialList.Breastfeeding_leave}
                    </label>
                    <label>
                      LTI: Long term weaknesses, LWD:
                      {projectSpecialList.LTI_Long_term_weaknesses_LWD}
                    </label>
                    <label>
                      Physical incapacity & NMA:
                      {projectSpecialList.Physical_incapacity_NMA}
                    </label>
                  </div>

                  <div>
                    <h3>K9 KSK Actual DH</h3>
                    <label>Attrition: {projectActualDH.Attrition}</label>
                    <label>Transfer: {projectActualDH.Transfer}</label>
                    <label>Hiring: {projectActualDH.Hiring}</label>
                    <label>Lates HC : {projectActualDH.last_HC}</label>
                  </div>
                </div>
              </React.Fragment>
            </div>
          )}
        </div>

        <div className={c.next}>
          {step >= 2 && <button onClick={prev}> Previous </button>}
          <button onClick={submit}>
            {step !== 5 ? "Next" : "Confirm Weekly DH"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Data;
