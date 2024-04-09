const express=require('express')
const data = require('../controller/data')
const project = require('../controller/project')
const route = express.Router()

route.post('/add_data',data.addNewData)
route.get('/DATA',data.GLOBALDATA)
route.post('/add_project',project.addProject)
route.get('/Get_project',project.GetProject)
7
module.exports=route