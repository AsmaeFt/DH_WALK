const Project = require('../models/Project')
const createError = require('../utilitis/globalError')

exports.addProject = async (req,res,next)=> {

    try{
        
        const project= await Project.findOne({name:req.body.name});
        if(project){return next (new createError('Project alredy exist ',409))}

        const newProject = new Project(req.body)
        await newProject.save()
        res.status(201).json(newProject)
       
    }
    catch (err) {next(err)} 
}

exports.GetProject = async(req,res,next)=>{
    try{
        const project = await Project.find({})
        res.status(201).json(project)

    }catch (err) {next (err)}
}