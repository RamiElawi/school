const db=require('../models')

exports.addDate=async(req,res,next)=>{
    const {hour,day,date,subjectId,sectionId,teacherId}=req.body;

    try{
        const date1=await db.schedules.findOne({where:{hour:hour,day:day,date:date}})
        if(date1){
            const error=new Error('there are another date in this time')
            error.statusCode=422;
            throw error
        }
        const sameTeacher=await db.schedules.findOne({where:{teacherId:teacherId,day:day,hour:hour,date:date}})
        if(sameTeacher){
            const error=new Error('this teacher has another lesson in this date')
            error.statusCode=422;
            throw error;
        }
        await db.schedules.create({
            hour:hour,
            day:day,
            date:date,
            teacherId:teacherId,
            subjectId:subjectId,
            SectionId:sectionId
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
    const {dateId}=req.params
    
    try{
        const date1=await db.schedules.findOne({where:{hour:hour,day:day,date:date}})
        if(date1){
            const error=new Error('there are another date in this time')
            error.statusCode=422;
            throw error;
        }
        const Subject=await db.schedules.findOne({where:{id:dateId}})
        if(!Subject){
            const error=new Error('this date is not exsits')
            error.statusCode=422;
            throw error
        }
        const sameTeacher=await db.schedules.findOne({where:{teacherId:teacherId,day:day,hour:hour,date:date}})
        if(sameTeacher){
            const error=new Error('this teacher has another lesson in this date')
            error.statusCode=422;
            throw error;
        }
        Subject.hour=hour
        Subject.day=day;
        Subject.date=date
        Subject.teacherId=teacherId
        Subject.SectionId=sectionId
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
    const {dateId}=req.params
    try{
        const Subject=await db.schedules.findOne({where:{id:dateId}})
        if(!Subject){
            const error=new Error('this date is not exsits')
            error.satusCode=404;
            throw error;
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

exports.getScheduleSection=async(req,res,next)=>{
    const {sectionId}=req.params
    try{
        const schedule=await db.schedules.findAll({where:{SectionId:sectionId},inculde:[{model:db.User},{model:db.Section},{model:db.subject}]})
        return res.status(200).json({schedule:schedule})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.getSchedule=async(req,res,next)=>{
    try{
        const allschedule=await db.schedules.findAll({include:[{model:db.User},{model:db.Section},{model:db.subject}]})
        return res.status(200).json({schedule:allschedule})
    }catch(err){
        if(!err.statusCode){
            error.statusCode=500
        }
        next(err)
    }
}