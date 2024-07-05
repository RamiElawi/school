 const db=require('../models')

exports.getAttendace=async (req,res,next)=>{
    const sectionId=req.params.sectionId
    const subjectId=req.params.subjectId
    try{  
        let lessonsId=[];
        let lessonName=[];
        let student=[];
        const lessons=await db.lesson.findAll({where:{subjectId:subjectId,sectionId:sectionId}})
        lessons.forEach(element => {
            lessonsId.push(element.id)
            lessonName.push(element.name)
        });
        const att=await db.attendance.findAll({where:{lessonId:lessonsId},include:[{model:db.User},{model:db.lesson}]})
        att.forEach( element=>{
            student.push([`${element.User.firstName} ${element.User.midelName} ${element.User.lastName} `,element.User.studentNumber,element.status])
        })
        return res.status(200).json({lessonName:lessonName,student:student})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}