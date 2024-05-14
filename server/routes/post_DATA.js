const express = require("express");

const project = require("../controller/project");
const dhwalk = require("../controller/dhwalk");
const oS_AfterM = require("../controller/afm");
const quality = require("../controller/qualiy");
const logistic = require("../controller/logistic")

const route = express.Router();

route.post("/add_project", project.addProject);
route.get("/Get_project", project.GetProject);

route.get("/assembly_project", dhwalk.getDhwalk);
route.post("/assembly_project", dhwalk.addProjectData);

route.post("/assembly_Family_Edit", dhwalk.editDataFamily);
route.post("/assembly_Others_Edits", dhwalk.editDataothers);

route.post("/addOSAFM", oS_AfterM.addData);
route.get("/GetOSAFM", oS_AfterM.getData);
route.post("/edit-osAfm", oS_AfterM.editData);

route.get("/getfiltredata", dhwalk.getFiltredData);

route.post("/add_quality", quality.addData);
route.get("/get_Quality", quality.getQuality_Data);

route.post("/add_Logistic", logistic.addData);
route.get("/get_Logistic", logistic.GetData);

module.exports = route;
