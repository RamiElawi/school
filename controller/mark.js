const db=requrie('../models')
exports.addMark=async(req,res,next)=>{
    const {studentId,studentFirstName,studentLastName,mark,subjectId}=req.body;
    let status='falt';
    try{
        if(mark<0||mark>100){
            const error=new Error('you should add mark between 0-100')
            error.statusCode=422;
            throw error;
        }
        const student=await db.user.fineOne({where:{studentId:studentId,firstName:studentFirstName,lastName:studentLastName}})
        if(!student){
            const error=new Error('this student is not found')
            error.statusCode=422;
            throw error;
        }
        const subject=await db.subject.findOne({where:{id:subjectId}})
        if(mark>=subject.minimum_success){
            status='successful'
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
    const {mark,studentId,studentFirstName,studentLastname,subjectId}=req.body
    try{

        if(mark>100||mark<0){
            const error=new Error('you should add mark between 0-100')
            error.statusCode=422;
            throw error;
        }

        const student=await db.user.findOne({where:{studentId:studentId,firstName:studentFirstName,lastName:studentLastname}})
        if(!student){
            const error=new Error('this student is not found')
            error.statusCode=422;
            throw error;
        }
        const studnetMark=await db.mark.findOne({studentId:studentId,subjectId:subjectId})
        if(!studnetMark){
            const error=new Error('this student is not found')
            error.statusCode=422;
            throw error;
        }
        studnetMark.mark=mark;
        return res.status(200).json({message:'done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=422;
        }
        next(err);
    }
}

exports.deleteMark=async(req,res,next)=>{
    const {mark,studentId,studentFirstName,studentLastname,subjectId}=req.body
    try{

        if(mark>100||mark<0){
            const error=new Error('you should add mark between 0-100')
            error.statusCode=422;
            throw error;
        }

        const student=await db.user.findOne({where:{studentId:studentId,firstName:studentFirstName,lastName:studentLastname}})
        if(!student){
            const error=new Error('this student is not found')
            error.statusCode=422;
            throw error;
        }
        const studnetMark=await db.mark.findOne({studentId:studentId,subjectId:subjectId})
        if(!studnetMark){
            const error=new Error('this student is not found')
            error.statusCode=422;
            throw error;
        }
        studnetMark.destroy();
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
        const marks=await db.mark.findAll({where:{subjectId:subjectId,year:year}})
        return res.status(200).json({marks:marks})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.getStudentMark=async(req,res,next)=>{
    const {studentId,subjectId}=req.body;
    try{
        const student=await db.user.findOne({where:{studentId:studentId}})
        const mark=await db.mark.findOne({where:{studentId:student.studentId,subjectId:subjectId}})

        return res.status(200).json({mark:mark})
    }catch(err){

    }
}

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