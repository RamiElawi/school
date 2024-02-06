const db=require('../models')

exports.addDate=async(req,res,next)=>{
    const {hour,day,date,subjectId,sectionId,teacherId}=req.body;

    try{
        const date1=await db.schedule.findOne({where:{hour:hour,day:day,date:date}})
        if(date1){
            const error=new Error('there are another date in this time')
        }
        const sameTeacher=await db.schedule.findOne({where:{teacherId:teacherId,day:day,hour:hour,date:date}})
        if(sameTeacher){
            const error=new Error('this teacher has another lesson in this date')
        }
        await db.schedule.create({
            hour:hour,
            day:day,
            date:date,
            teacherId:teacherId,
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
    const {hour,day,date,teacherId,subjectId,sectionId}=req.body;
    
    try{
        const date1=await db.schedule.findOne({where:{hour:time,day:day,date:date}})
        if(date1){
            const error=new Error('there are another date in this time')
        }
        const Subject=await db.schedule.findOne({where:{subjectId:subjectId,sectionId:sectionId,hour:hour,day:day,date:date}})
        if(!Subject){
            const error=new Error('this date is not exsits')
        }
        Subject.hour=hour
        Subject.day=day;
        Subject.date=date
        Subject.teacherId=teacherId
        Subject.sectionId=sectionId
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
    const {subjectId,sectionId,hour,day,date}=req.params;
    try{
        const Subject=await db.schedule.findOne({where:{subjectId:subjectId,sectionId:sectionId,hour:hour,day:day,date:date}})
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