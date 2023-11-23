const db=require('../models')

exports.addDat=async(req,res,next)=>{
    const {time,day,subjectId,sectionId}=req.body;

    try{
        const date=await db.schedule.findOne({where:{time:time,day:day}})
        if(date){
            const error=new Error('there are another date in this time')
        }
        const sameSubject=await db.schedule.findOne({where:{subjectId:subjectId,sectionId:sectionId}})
        if(sameSubject){
            const error=new Error('this subject ')
        }
        await db.schedule.create({
            time:time,
            day:day,
            subjectId:subjectId,
            sectionId:sectionId
        })
        return res.status(200).json({message:"done"})
    }catch(err){
        if(!err.statusCode){
            err.satusCode=500;
        }
        next(err);
    }
}

exports.updateDate=async(req,res,next)=>{
    const {time,day,subjectId,sectionId}=req.body;
    
    try{
        const date=await db.schedule.findOne({where:{time:time,day:day}})
        if(date){
            const error=new Error('there are another date in this time')
        }
        const Subject=await db.schedule.findOne({where:{subjectId:subjectId,sectionId:sectionId}})
        if(!Subject){
            const error=new Error('this date is not exsits')
        }
        Subject.time=time,
        Subject.day=day;
        Subject.sectionId=sectionId,
        Subject.subjectId=subjectId
        await Subject.save();
        return res.status(200).json({message:'done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
}
exports.deleteDate=async(req,res,next)=>{
    const {subjectId,sectionId}=req.params;
    try{
        const Subject=await db.schedule.findOne({where:{subjectId:subjectId,sectionId:sectionId}})
        if(!Subject){
            const error=new Error('this date is not exsits')
        }
        await Subject.destroy();
        return res.status(200).json({message:'done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
}