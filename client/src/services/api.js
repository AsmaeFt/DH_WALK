import axios from "axios";
const api = "http://10.236.150.19:8080/api";

export const DATA = async () => {
  const res = await axios.get(`${api}/assembly_project`);
  return res.data;
};

export const GettheProject = async (selectedProject) => {
    const res = await axios.get(`${api}/Get_project`);
    const proj = await res.data.flatMap((p) => p.name);
    const fam = await res.data
    .filter((p) => p.name === selectedProject)
    .flatMap((p) => p.family)
    .map((f) => f.name);
  return {proj , fam}
};
