const express = require("express");

const project = require("../controller/project");
const dhwalk = require("../controller/dhwalk");
const oS_AfterM = require("../controller/afm");
const route = express.Router();

route.post("/add_project", project.addProject);
route.get("/Get_project", project.GetProject);

route.get("/assembly_project", dhwalk.getDhwalk);
route.post("/assembly_project", dhwalk.addProjectData);
route.post("/assembly_Family_Edit", dhwalk.editDataFamily);
route.post("/assembly_Others_Edits", dhwalk.editDataothers);

route.post("/addOSAFM", oS_AfterM.addData);
route.get("/GetOSAFM", oS_AfterM.getData);

route.get("/getfiltredata",dhwalk.getFiltredData)

module.exports = route;
