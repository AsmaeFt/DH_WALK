export const DH_Calculs = (data, sproject) => {
  const weekly_DH = [];
  data.flatMap((y) => {
    y.weeks.flatMap((w) => {
      const project = w.projectData.find((p) => p.projectName === sproject);
      if (project) {
        let familyTotal = 0;
        let DHRequired = 0;
        let totalSOS = 0;
        let actualDH = 0;

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
            totalSOS += fam.SOS;
          }

          DHRequired = totalOS + totalSP + familyTotal;
        });

        weekly_DH.push({
          DHRequired,
          totalOS,
          totalSP,
          totalSOS,
        });
      }
    });
  });
  return weekly_DH;
};
export const OS_calculs = (data, pr) => {
  return data.flatMap((y) =>
    y.weeks.flatMap((w) => {
      const project = w.projectData.find((p) => p.projectName === pr);
      let totalSOS = 0;
      project.family.flatMap((fam) => {
        if (fam != null) {
          totalSOS += Math.floor(fam.SOS);
        }
      });
      
      return totalSOS;
    })
  );
};




