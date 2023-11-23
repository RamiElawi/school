const db=require('../models')
const clearImage=require('../config/clearImage')
exports.addSubject=async(req,res,next)=>{
    const {name}=req.body;
    try{
        if(!req.file){
            const error=new Error('there is no file')
            error.statusCode=422;
            throw error;
        }
        const subject=await db.subject.create({
            name:name,
            subjectImage:req.file.image
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
    const {name}=req.body;
    const subjectId=req.params.subjectId;

    try{
        const subject=await db.subject.findById(subjectId)
        if(!subject){
            const error=new Error('this subject is not found')
            error.statusCode=422;
            throw error;
        }
        let subject_image=subject.subjectImage;
        if(req.file.image){
            subject_image=req.file.image;
        }
        subject.subjectImage=subject_image;
        subject.name=name;
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
        const subject=await db.subject.findById(subjectId)
        if(!subject){
            const error=new Error('this subject is not found')
            error.statusCode=422;
            throw error;
        }
        await clearImage(subject.subjectImage)
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
try{
    const subject=await db.subject.findById(subjectId);
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
    const {description}=req.body;
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
            path:req.files.file[0].path
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
    const {description}=req.body;
    const subjectId=req.params.subjectId
    const referanceId=req.params.referanceId
    let file;
    try{
        const subject=await db.subject.findOne({where:{id:subject}})
        if(!subject){

        }
        const referance=await db.referance.findOne({where:{id:referanceId}})
        if(!referance){

        }
        file=referance.path;
        if(req.files.file){
            file=req.files.file[0].path;
        }
        referance.path=file;
        referance.description=description;
        await referance.save();
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}
exports.deleteReferance=async(req,res,next)=>{
    const referanceId=req.params.referanceId;
    const subjectId=req.params.subjectId;
    try{
        const subject=await db.subject.findOne({where:{id:subjectId}})
        if(!subject){

        }
        const referance=await db.referance.findOne({where:{id:referanceId}})
        if(!referance){
    
        }
        await referance.destroy()
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
        return res.status(200).json({referances:referances})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);    
    }
}