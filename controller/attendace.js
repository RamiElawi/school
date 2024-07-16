 const db=require('../models')

exports.getAttendace=async (req,res,next)=>{
    const sectionId=req.params.sectionId
    const subjectId=req.params.subjectId
    try{  
        let lessonsId=[];
        let lessonName=[];
        let student=[];
        let studentName=[];
        let atte=[]
        let last=[]
        let n=2;
        const lessons=await db.lesson.findAll({where:{subjectId:subjectId,sectionId:sectionId}})
        lessons.forEach(element => {
            lessonsId.push(element.id)
            lessonName.push(element.name)
        });
        const users=await db.User.findAll({where:{sectionId:sectionId}})
        users.forEach(user=>{
            studentName.push(`${user.firstName} ${user.midelName} ${user.lastName}`)
        })
        const att=await db.attendance.findAll({where:{lessonId:lessonsId},include:[{model:db.User},{model:db.lesson}]})
        att.forEach( element=>{
            student.push([`${element.User.firstName} ${element.User.midelName} ${element.User.lastName}`,element.User.studentNumber,element.status])
        })
        await studentName.forEach(async u=>{
            await student.forEach(s=>{
                if(u === s[0]){
                    atte.push(s[2])
                }
            })
        })
        for(let i=0 ;i <atte.length;i+=lessonName.length){
            last.push(atte.slice(i,lessonName.length+i))
        }

        return res.status(200).json({lessonName:lessonName,studentName:studentName,atte:atte,last:last})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}