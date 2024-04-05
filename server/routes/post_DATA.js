const express=require('express')
const data = require('../controller/data')
const route = express.Router()

route.post('/add_data',data.addNewData)
module.exports=route