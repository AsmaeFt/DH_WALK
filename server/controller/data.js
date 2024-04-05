const DATA = require('../models/DATA')
const createError = require('../utilitis/globalError')


exports.addNewData = async (req,res,next)=>{

    try{
        const newData= new DATA(req.body)
        await newData.save()
        res.status(201).json(newData)
 
    }catch(err){next(err)}
}