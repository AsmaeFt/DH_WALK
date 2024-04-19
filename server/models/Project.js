const mongoose = require('mongoose');



const familySchema = new mongoose.Schema({

    name:{type:String ,  required: true}
})
const project_Schema = new mongoose.Schema({

    name:{type:String , required:true},
    family:{type :[familySchema],}
})

const project = mongoose.model('Project',project_Schema)
module.exports=project

