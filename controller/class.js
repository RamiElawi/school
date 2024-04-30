const db=require('../models')

exports.addClass=async (req,res,next)=>{
    const {name}=req.body
    try{
        const isExits=await db.Class.findOne({where:{name:name}})
        if(isExits){
            const error=new Error('this class is already exits')
            error.statusCode=422;
            throw error
        }
        const newClass=await db.Class.create({name:name})
        return res.status(200).json({message:'create done',class:newClass})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}
exports.updateClass=async(req,res,next)=>{
    const {classId}=req.params
    const {name}=req.body
    try{
        const oldClass=await db.Class.findOne({where:{id:classId}})
        if(!oldClass){
            const error=new Error('this class is not found')
            error.statusCode=422;
            throw error
        }
        const isExits=await db.Class.findOne({where:{name:name}})
        if(isExits){
            const error=new Error('this class is already exits')
            error.statusCode=422;
            throw error
        }
        oldClass.name=name;
        await oldClass.save()
        return res.status(200).json({message:"update is done"})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.AllClass=async(req,res,next)=>{
    try{
        const allCalsses=await db.Class.findAll()
        if(!allCalsses){
            allCalsses="there are no classes"
        }
        return res.status(200).json({allCalsses:allCalsses})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.deleteClass=async(req,res,next)=>{
    const {classId}=req.params
    try{    
        const oldClass=await db.Class.findOne({where:{id:classId}})
        if(!oldClass){
            const error=new Error('this class is not found')
            error.statusCode=404;
            throw error;
        }
        await oldClass.destroy()
        return res.status(200).json({message:"delete is done"})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}