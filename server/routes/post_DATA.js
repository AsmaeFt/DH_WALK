const express=require('express')
const data = require('../controller/data')
const project = require('../controller/project')
const dhwalk = require('../controller/dhwalk')
const route = express.Router()

route.post('/add_data',data.addNewData)
route.get('/DATA',data.GLOBALDATA)
route.post('/add_project',project.addProject)
route.get('/Get_project',project.GetProject)
route.post('/editable',data.editData)
route.post('/addDhwalk',dhwalk.addData)
route.get('/gatDhwalk',dhwalk.getDhwalk)  
route.post('/add',dhwalk.addDatanew)  



module.exports=route