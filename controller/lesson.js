const db=require('../models')


exports.addLesson=async(req,res,next)=>{
    const {name}=req.body
    const {subjectId}=req.params
    try{
        const lesson=await db.lesson.create({name:name,subjectId:subjectId})
        if(!req.file){
            console.log("there is no file here")
            const error=new Error('there is no file')
            error.statusCode=422;
            console.log(error)
            throw error;
        }
        console.log(req.file)
        const File=await db.file.create({fileableId:lesson.id
            ,fileableType:'Lesson'
            ,path:req.file.path,
            name:req.file.originalname.split('.')[0]
        })
        return res.status(200).json({message:'create lesson is done',lesson:lesson,file:File})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.updateLesson=async(req,res,next)=>{
    const name=req.body.name;
    const {lessonId}=req.params
    console.log("line 32",name,lessonId)
    try{
        const less=await db.lesson.findOne({where:{id:lessonId}})
        console.log(less)
        if(!less){
            const error=new Error('this lesson is not found')
            error.stausCode=422;
            throw error;
        }
        // console.log(less.name)
        less.name=name;
        // console.log(less.name)
        let lessonFile=await db.file.findOne({where:{fileableId:lessonId,fileableType:'Lesson'}})
        // console.log("44",lessonFile)
        // console.log("45",req.file)
        if(req.file && lessonFile){
            console.log('threw is file')
            lessonFile.path=req.file.path;
            lessonFile.name=req.file.originalname.split('.')[0]
            await lessonFile.save()
            await less.save()
            return res.status(200).json({message:'lesson has been updated'})
        }
        const newFile=await db.file.create({fileableId:less.id
            ,fileableType:'Lesson'
            ,path:req.file.path,
            name:req.file.originalname.split('.')[0]
        })               
        await less.save()
        return res.status(200).json({message:'lesson has been updated with newFile'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
}

exports.deleteLesson=async(req,res,next)=>{
    const {lessonId}=req.params
    // console.log(lessonId)
    try{
        const lesson=await db.lesson.findOne({where:{id:lessonId}})
        // console.log(lesson.id)
        if(!lesson){
            const error=new Error('this lesson is not found')
            error.statusCode=422;
            throw error;
        }
        
        const file=await db.file.findOne({where:{fileableId:lessonId,fileableType:'Lesson'}})
        if(!file){
            const error=new Error('this file is not found')
            error.statusCode=422;
            throw error;
        }

        require('../config/clearImage').clearImage(file.path)
        await file.destroy()
        await lesson.destroy()

        return res.status(200).json({message:'delete is done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
}

exports.getLesson=async(req,res,next)=>{
    const {lessonId}=req.params
    try{
        const lesson=await db.lesson.findOne({where:{id:lessonId},include:[db.file]})
        // console.log(lesson.id)
        if(!lesson){
            const error=new Error('this lesson is not found')
            error.statusCode=422;
            throw error;
        }
        return res.status(200).json({lesson:lesson})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
}

exports.getLessons=async(req,res,next)=>{
    const {subjectId}=req.params 
    try{
        const lessons=await db.lesson.findAll({where:{subjectId:subjectId},include:[db.file]})
        if(!lessons) lessons='there are no lesson'
        return res.status(200).json({lessons:lessons})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.allLessonToSection=async(req,res,next)=>{
    const {sectionId,subjectId}=req.body
    try{
        const lessons=await db.lesson.findAll({where:{sectionId:sectionId,subjectId:subjectId}})
        if(!lessons){
            lessons='there are no lessons'
        }
        return res.status(200).json({lessons:lessons})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}