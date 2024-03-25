const db=require('../models')
exports.addSubject=async(req,res,next)=>{
    const {name,minimumSuccess,teacherId}=req.body;
    try{
        if(!req.file){
            const error=new Error('there is no file')
            error.statusCode=422;
            throw error;
        }
        console.log(req.file)
        const subject=await db.subject.create({
            name:name,
            image:req.file.image,
            minimumSuccess:minimumSuccess,
            teacherId:teacherId,
            image:req.file.path
        })
        return res.status(200).json({message:'the subject has been created'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.updateSubject=async(req,res,next)=>{
    const {name,minimumSuccess}=req.body;
    const subjectId=req.params.subjectId;

    try{
        const subject=await db.subject.findOne({Id:subjectId})
        if(!subject){
            const error=new Error('this subject is not found')
            error.statusCode=422;
            throw error;
        }
        let subject_image=subject.subjectImage;
        if(req.file){
            subject_image=req.file.path;
        }
        subject.subjectImage=subject_image;
        subject.name=name;
        subject.minimumSuccess=minimumSuccess
        await subject.save();
        return res.status(200).json({message:'subject has been updated'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.deleteSubject=async(req,res,next)=>{
    const subjectId=req.params.subjectId;
    try{
        const subject=await db.subject.findOne({where:{id:subjectId}})
        if(!subject){
            const error=new Error('this subject is not found')
            error.statusCode=422;
            throw error;
        }
        require('../config/clearImage').clearImage(subject.image)
        await subject.destroy();
        return res.status(200).json({message:"subject has been deleted"})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}


exports.getSubjects=async(req,res,next)=>{
    try{
        const subjects=await db.subject.findAll();
        if(!subjects){
            subjects='there are no subjects'
        }
        return res.status(200).json({subjects:subjects})
    }catch(err){
        if(!err.statusCode){
            err.statuCode=500;
        }
        next(err);
    }
}

exports.getSubject=async(req,res,next)=>{
    const subjectId=req.params.subjectId;
    console.log(subjectId)
try{
    const subject=await db.subject.findOne({where:{id:subjectId}});
    if(!subject){
        const error=new Error('this subject is not found')
        error.statusCode=422;
        throw error;
    }
    return res.status(200).json({subject:subject});

}catch(err){
    if(!err.statusCode){
        err.statusCode=500
    }
    next(err);
}
}

exports.addReferance=async(req,res,next)=>{
    const {description,name}=req.body;
    const subjectId=req.params.subjectId;

    try{
        
        if(!req.files.file){
            const error=new Error('you dont choose file')
            error.statusCode=422;
            throw error;
        }
        await db.referance.create({
            description:description,
            subjectId:subjectId,
            path:req.files.file[0].path,
            name:name,
            teacherId:req.userId
        })
    
        return res.status(200).json({message:'done'})
}catch(err){
    if(!err.statusCode){
        err.statusCode=500;
    }
    next(err);
}
}

exports.updateReferance=async(req,res,next)=>{
    const {description,name}=req.body;
    const subjectId=req.params.subjectId
    const referanceId=req.params.referanceId
    let file;
    try{
        const subject=await db.subject.findOne({where:{id:subject}})
        if(!subject){
            const error=new Error('this subject is not found')
            error.statusCode=422;
            throw error;
        }
        const referance=await db.referance.findOne({where:{id:referanceId}})
        if(!referance){
            const error=new Error('this referance is not found')
            error.statusCode=422;
            throw error;
        }
        file=referance.path;
        if(req.files.file){
            file=req.files.file[0].path;
        }
        referance.path=file;
        referance.description=description;
        referance.name=name;
        referance.subjectId=subjectId
        await referance.save();
        return res.status(200).json({message:'referance has been updated'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}
exports.deleteReferance=async(req,res,next)=>{
    const referanceId=req.params.referanceId;
    try{
        const referance=await db.referance.findOne({where:{id:referanceId}})
        if(!referance){
            const error=new Error('this referance is not found')
            error.statusCode=422;
            throw error;
        }
        await referance.destroy()
        return res.status(200).json({message:'referance has been deleted'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.getReferance=async(req,res,next)=>{
    const subjectId=req.parms.subjectId;
    try{
        const referances=await db.referance.findAll({where:{subjectId:subjectId}})
        if(!referances){
            const error=new Error('there are no referances')
            error.statusCode=422;
            throw error;
        }
        return res.status(200).json({referances:referances})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);    
    }
}