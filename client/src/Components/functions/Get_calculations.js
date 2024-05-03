
export const calculate_DH_Required = (data, sproject) => {
  const weekly_DHRequired = [];
  data.flatMap((y) =>
    y.weeks.flatMap((w) => {
      const project = w.projectData.find((p) => p.projectName === sproject);
      if (project) {
        let familyTotal = 0;
        let DHRequired = 0;
        const totalOS =
            project.project_OS.Digitalization +
            project.project_OS.Daily_Kaizen +
            project.project_OS.OS_Auditing +
            project.project_OS.OS_Auditing_Data_Reporting;

             
          const totalSP =
          project.project_special_list.Pregnant_women_out_of_the_plant +
          project.project_special_list.Maternity +
          project.project_special_list.Breastfeeding_leave +
          project.project_special_list.LTI_Long_term_weaknesses_LWD +
          project.project_special_list.Physical_incapacity_NMA;


        project.family.map((fam) => {
          if (fam != null) {
            const HC_Crew =
              fam.ME_DEFINITION +
              fam.ME_SUPPORT +
              fam.Rework +
              fam.Poly +
              fam.Back_Up +
              fam.Containment;
            const totalF = HC_Crew * fam.crews + fam.SOS;
            familyTotal += totalF;
          }
        
           DHRequired = totalOS + totalSP + familyTotal;
         
        
        });
        weekly_DHRequired.push({
          DHRequired , totalOS
        })
      }
    })
  );
  return weekly_DHRequired;
};
