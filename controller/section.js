const { where } = require('sequelize');
const db=require('../models')

exports.addSection=async(req,res,next)=>{
    const {classId,maxNumberOfStudent,sectionNumber}=req.body;
    try{
        const isExits=await db.Section.findOne({where:{sectionNumber:sectionNumber,ClassId:classId}})
        if(isExits){
            const error=new Error('this section is already exits')
            error.statusCode=422;
            throw error;
        }
        const section=await db.Section.create({
            Classd:classId,maxNumberOfStudent,sectionNumber
        })
        return res.status(200).json({message:'create section is done',section:section})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.updateSection=async(req,res,next)=>{
    const {classId,maxNumberOfStudent,sectionNumber}=req.body
    const {sectionId}=req.params
    try{
        const section=await db.Section.findOne({where:{id:sectionId}})
        if(!section){
            const error=new Error('this sectin is not exits')
            error.statusCode=422;
            throw error;
        }
        const isExits=await db.Section.findOne({where:{sectionNumber:sectionNumber,ClassId:classId}})
        if(isExits){
            const error=new Error('this section is already exits')
            error.statusCode=422;
            throw error;
        }
        section.ClassId=classId;
        section.maxNumberOfStudent=maxNumberOfStudent;
        section.sectionNumber=sectionNumber;
        await section.save();
        return res.status(200).json({message:'update section is done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.deleteSection=async(req,res,next)=>{
    const {sectionId}=req.params
    try{
        const section=await db.Section.findOne({where:{id:sectionId}})
        if(isExits){
            const error=new Error('this section is not found')
            error.statusCode=404;
            throw error
        }
        await section.destroy()
        return res.status(200).json({message:'delete section is done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.getAllSection=async(req,res,next)=>{
    const classId=req.body.classId
    try{
        const sections=await db.Section.findAll({where:{ClassId:classId}})
        if(!sections){
            sections='there are no sections'
        }
        return res.status(200).json({sections:sections})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.addStudentToSection=async(req,res,next)=>{
    const {userId,sectionId}=req.body
    try{
        const user=await db.User.findOne({where:{id:userId}})
        if(!user){
            const error=new Error('this user is not found')
            error.statusCode=404;
            throw error
        }
        user.SectionId=sectionId
        await user.save()
        const section=await db.Section.findOne({where:{id:sectionId}})
        return res.status(200).json({message:`student ${user.firstName} ${user.lastName} added to:${section.sectionNumber}`})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.updateSectionStudent=async(req,res,next)=>{
    const {userId,sectionId}=req.body
    try{
        const user=await db.User.findOne({where:{id:userId}})
        if(!user){
            const error=new Error('this user is not found')
            error.statusCode=404;
            throw error
        }
        user.SectionId=sectionId
        await user.save()
        const section=await db.Section.findOne({where:{id:sectionId}})
        return res.status(200).json({message:`student ${user.firstName} ${user.lastName} added to:${section.sectionNumber}`})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.deleteStudentFromSection=async(req,res,next)=>{
    const {userId}=req.body;
    try{
        const user=await db.User.findOne({where:{id:userId}})
        if(!user){
            const error=new Error('this user is not found')
            error.statusCode=404;
            throw error
        }
        user.SectionId=null;
        await user.save()
        return res.status(200).json({message:"done"})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.getStudentSection=async(req,res,next)=>{
    const {sectionId}=req.params;
    try{
        const users=await db.User.findAll({where:{SectionId:sectionId}})
        if(!users){
            users='there are no users in this section'
        }
        return res.status(200).json({users:users})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}