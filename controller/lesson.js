const db=require('../models')


exports.addLesson=async(req,res,next)=>{
    const {name}=req.body
    const {subjectId}=req.params
    try{
        const lesson=await db.lesson.create({name:name,subjectId:subjectId})
        if(!req.file){
            const error=new Error('there is no file')
            error.statusCode=422;
            throw error;
        }
        // console.log(req.file.originalname.split('.')[0]  ) 
        const file=await db.file.create({fileableId:lesson.id
            ,fileableType:'Lesson'
            ,path:req.file.path,
            name:req.file.originalname.split('.')[0]
        })
        // console.log(file,lesson)
        return res.status(200).json({message:'create lesson is done',lesson:lesson,file:file})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next()
    }
}

exports.updateLesson=async(req,res,next)=>{
    const name=req.body.name;
    const {lessonId}=req.params
    // console.log(name,lessonId)
    try{
        const less=await db.lesson.findOne({where:{id:lessonId}})
        if(!less){
            const error=new Error('this lesson is not found')
            error.stausCode=422;
            throw error;
        }
        // console.log(less.name)
        less.name=name;
        // console.log(less.name)
        let lessonFile=await db.file.findOne({where:{fileableId:lessonId,fileableType:'Lesson'}})
        console.log(lessonFile)
        console.log(req.file)
        if(!req.file){
            console.log('threw is file')
            lessonFile.path=req.file.path;
            lessonFile.name=req.file.originalname.split('.')[0]
            await lessonFile.save()
        }
        await less.save()
        // return res.status(200).json({message:'done'})
        return res.status(200).json({message:'lesson has been updated'})
        // return res.status(200).json({message:'update is done', lesson:lesson,file:lessonFile})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next();
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
    try{
        const lessons=await db.lesson.findAll({include:[db.file]})
        if(!lessons) lessons='there are no lesson'
        return res.status(200).json({lessons:lessons})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}