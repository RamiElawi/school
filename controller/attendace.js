 const db=require('../models')

exports.getAttendace=async (req,res,next)=>{
    const sectionId=req.params.sectionId
    const subjectId=req.params.subjectId
    try{  
        let lessonsId=[];
        const lessons=await db.lesson.findAll({where:{subjectId:subjectId,sectionId:sectionId}})
        lessons.forEach(element => {
            lessonsId.push(element.id)
        });
        const att=await db.attendance.findAll({where:{lessonId:lessonsId},include:[{model:db.User},{model:db.lesson}]})
        return res.status(200).json({att:att})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}