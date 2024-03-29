const db=require('../models')

exports.addMark=async(req,res,next)=>{
    const {studentNumber,studentFirstName,studentLastName,mark,subjectId}=req.body;
    let status='FAILED';
    try{
        if(mark<0||mark>100){
            const error=new Error('you should add mark between 0-100')
            error.statusCode=422;
            throw error;
        }
        const student=await db.user.fineOne({where:{studentNumber:studentNumber,firstName:studentFirstName,lastName:studentLastName}})
        if(!student){
            const error=new Error('this student is not found')
            error.statusCode=422;
            throw error;
        }
        const subject=await db.subject.findOne({where:{id:subjectId}})
        if(mark>=subject.minimum_success){
            status='SUCCESSFUL'
        }
        await db.Mark.create({
            studentId:student.id,
            mark:mark,
            subjectId:subjectId,
            status:status,
            year:Date.now()
        })
        return res.status(200).json({message:'done'})

    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.updateMark=async(req,res,next)=>{
    const {mark,studentId,subjectId}=req.body
    let status='FAILED';
    try{

        if(mark>100||mark<0){
            const error=new Error('you should add mark between 0-100')
            error.statusCode=422;
            throw error;
        }

        const student=await db.user.findOne({where:{studentId:studentId}})
        if(!student){
            const error=new Error('this student is not found')
            error.statusCode=422;
            throw error;
        }
        const studentMark=await db.mark.findOne({studentId:studentId,subjectId:subjectId})
        if(!studentMark){
            const error=new Error('this student is not found')
            error.statusCode=422;
            throw error;
        }
        const subject=await db.subject.findOne({where:{id:subjectId}})
        if(mark>=subject.minimum_success){
            status='SUCCESSFUL'
        }
        studentMark.mark=mark;
        studentMark.status=status
        await studentMark.save()
        return res.status(200).json({message:'done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=422;
        }
        next(err);
    }
}

exports.deleteMark=async(req,res,next)=>{
    const {studentId,subjectId}=req.body
    try{
        const student=await db.user.findOne({where:{studentId:studentId}})
        if(!student){
            const error=new Error('this student is not found')
            error.statusCode=422;
            throw error;
        }
        const studentMark=await db.mark.findOne({studentId:studentId,subjectId:subjectId})
        if(!studentMark){
            const error=new Error('this student is not found')
            error.statusCode=422;
            throw error;
        }
        await studentMark.destroy();
        return res.status(200).json({message:"done"})
}catch(err){    
    if(!err.statusCode){
        err.statusCode=500;
    }
    next(err);
}
}

exports.getSubjectMarks=async(req,res,next)=>{
    const subjectId=req.params.subjectId;
    const year=req.body.year;
    try{
        const marks=await db.mark.findAll({where:{subjectId:subjectId,year:year},include:{model:db.User}})
        return res.status(200).json({marks:marks})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}
// i should now in any way i should get it 
exports.getStudentMark=async(req,res,next)=>{
    const {studentId,subjectId}=req.body;
    try{
        const student=await db.user.findOne({where:{studentId:studentId}})
        const mark=await db.mark.findOne({where:{studentId:student.studentId,subjectId:subjectId}})

        return res.status(200).json({mark:mark})
    }catch(err){

    }
}
// also
exports.getStudentMarks=async(req,res,next)=>{
    const {studentId}=req.body;
    try{
        const student=await db.user.findOne({where:{studentId:studentId}})
        const marks=await db.mark.findOne({where:{studnetId:student.studentId}})
        return res.status(200).json({marks:marks})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}