const db=require('../models')

exports.addDate=async(req,res,next)=>{
    const {hour,date,subjectId,sectionId,teacherId}=req.body;

    try{
        const date1=await db.schedules.findOne({where:{hour:hour,date:date}})
        if(date1){
            const error=new Error('there are another date in this time')
            error.statusCode=422;
            throw error
        }
        const sameTeacher=await db.schedules.findOne({where:{teacherId:teacherId,hour:hour,date:date}})
        if(sameTeacher){
            const error=new Error('this teacher has another lesson in this date')
            error.statusCode=422;
            throw error;
        }
        await db.schedules.create({
            hour:hour,
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
    const {hour,date,teacherId,subjectId,sectionId}=req.body;
    const {dateId}=req.params
    
    try{
        const date1=await db.schedules.findOne({where:{hour:hour,date:date}})
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
        const sameTeacher=await db.schedules.findOne({where:{teacherId:teacherId,hour:hour,date:date}})
        if(sameTeacher){
            const error=new Error('this teacher has another lesson in this date')
            error.statusCode=422;
            throw error;
        }
        Subject.hour=hour
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
    let daysOfWeek=[]
    let TimeSlots=[]
    let Date=[]
    let subjects=[]
    try{
        const schedule=await db.schedules.findAll({where:{SectionId:sectionId},include:[{model:db.User},{model:db.Section,include:{model:db.Class}},{model:db.subject}]})
        // console.log(schedule)
        schedule.forEach(sch=>{
            TimeSlots.push(sch.hour)
            let newDate=`${sch.date}`
            Date.push(newDate.slice(4,15))
            daysOfWeek.push(newDate.slice(0,3))
            subjects.push([sch.id,sch.subject.name,`${sch.Section.Class.name}-${sch.Section.sectionNumber}`,`${sch.User.firstName} ${sch.User.lastName}`])
        })
        return res.status(200).json({days:daysOfWeek,time:TimeSlots,Date:Date,subjects:subjects})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.getSchedule=async(req,res,next)=>{
    let daysOfWeek=[]
    let TimeSlots=[]
    let Date=[]
    let subjects=[]
    try{
        const allschedule=await db.schedules.findAll({include:[{model:db.User},{model:db.Section,include:{model:db.Class}},{model:db.subject}]})
        allschedule.forEach(sch=>{
            TimeSlots.push(sch.hour)
            let newDate=`${sch.date}`
            Date.push(newDate.slice(4,15))
            daysOfWeek.push(newDate.slice(0,3))
            subjects.push([sch.id,sch.subject.name,`${sch.Section.Class.name}-${sch.Section.sectionNumber}`,`${sch.User.firstName} ${sch.User.lastName}`])
        })        
        return res.status(200).json({days:daysOfWeek,time:TimeSlots,Date:Date,subjects:subjects})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}