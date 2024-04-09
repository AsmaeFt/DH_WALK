
const DATA = require('../models/DATA')
const createError = require('../utilitis/globalError')


exports.addNewData = async (req,res,next)=>{

    try{
        const newData= new DATA(req.body)
        await newData.save()
        res.status(201).json(newData)
 
    }catch(err){next(err)}
}
exports.GLOBALDATA = async (req,res,next)=> {

    try{
        const Data_Global = await DATA.find({})
      if (Data_Global.length === 0) {
      return res.status(404).json({ error: 'No data found in the database' });
    }
    
     res.status(201).json(Data_Global)
    }catch(err){next(err)}
}
