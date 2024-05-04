const db=require('../models')

exports.addDate=async(req,res,next)=>{
    const {hour,day,subjectId,sectionId}=req.body;

    try{
        const date1=await db.schedules.findOne({where:{hour:hour,day:day,SectionId:sectionId}})
        if(date1){
            const error=new Error('there are another date in this time')
            error.statusCode=422;
            throw error
        }
        await db.schedules.create({
            hour:hour,
            day:day,
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
    const {hour,day,subjectId,sectionId}=req.body;
    const {dateId}=req.params
    
    try{
        const date=await db.schedules.findOne({where:{id:dateId}})
        if(!date){
            const error=new Error('there are no date')
            error.statusCode=422;
            throw error;
        }
        const date1=await db.schedules.findOne({where:{hour:hour,day:day,SectionId:sectionId}})
        if(date1){
            const error=new Error('there are another date in this time')
            error.statusCode=422;
            throw error;
        }
        date.hour=hour
        date.day=day
        date.SectionId=sectionId
        date.subjectId=subjectId
        await date.save();
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
    let subjects=[]
    try{
        const schedule=await db.schedules.findAll({where:{SectionId:sectionId},include:[{model:db.Section,include:{model:db.Class}},{model:db.subject,include:{ association: 'User'}}],order:[['hour','ASC']]})
        schedule.forEach(sch=>{
            // console.log(sch.subject.Users[0])
            TimeSlots.push(sch.hour)
            daysOfWeek.push(sch.day)
            subjects.push([sch.id,sch.subject.name,`${sch.Section.Class.name}-${sch.Section.sectionNumber}`,`${sch.subject.User.firstName} ${sch.subject.User.lastName}`])
        })
        return res.status(200).json({days:daysOfWeek,time:TimeSlots,subjects:subjects})
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
    let subjects=[]
    try{
        const allschedule=await db.schedules.findAll({include:[{model:db.User},{model:db.Section,include:{model:db.Class}},{model:db.subject}]})
        allschedule.forEach(sch=>{
            TimeSlots.push(sch.hour)
            daysOfWeek.push(sch.day)
            subjects.push([sch.id,sch.subject.name,`${sch.Section.Class.name}-${sch.Section.sectionNumber}`,`${sch.User.firstName} ${sch.User.lastName}`])
        })        
        return res.status(200).json({days:daysOfWeek,time:TimeSlots,subjects:subjects})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}