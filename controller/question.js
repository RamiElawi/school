const db=require('../models')

exports.addQuestion=async (req,res,next)=>{
    const {text,rightAnswer,answers}=req.body
    const {type,id}=req.params
    console.log(answers)
    try{
        const question=await db.question.create({
            title:text,
            questionableType:type,
            questionableId:id
        })
         answers.forEach(async (answer)=>{
            await db.answer.create({
                answer:answer,
                questionId:question.id
            })
        })
        const theRightAnswer=await db.answer.create({
            answer:rightAnswer,
            questionId:question.id
        })
        question.rightAnswer=theRightAnswer.id
        await question.save()
        return res.status(200).json({message:'create question done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.updateQuestion=async(req,res,next)=>{
    const {text,rightAnswer,Answers}=req.body
    const {questionId}=req.params
    try{
        const question=await db.question.findOne({id:questionId})
        if(!question){
            const error=new Error('this question is not exsits')
            error.statusCode=422;
            throw error
        }
        question.text=text;
        await question.save()
        const answers=await db.answer.findAll({where:{questionId:questionId}})
        if(!answers){
            const error=new Error('there are no answers')
            error.statusCode=422;
            throw error
        }
        answers.forEach(async (answer)=>{
            await answer.destroy()
        })
        Answers.forEach(async (answer)=>{
            await db.answer.create({
                answer:answer,
                questionId:question.id
            })
        })
        const theRightAnswer=await db.answer.create({
            answer:rightAnswer,
            questionId:question.id
        })
        question.rightAnswer=theRightAnswer.id
        await question.save()
        return res.status(200).json({message:'question has been updated'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.getQuestions=async(req,res,next)=>{
    const {type,id}=req.params
    try{
        const questions=await db.question.findAll({where:{questionableId:id,questionableType:type},include:[db.answer]})
        if(!questions){
            const error=new Error('there are no questions')
            error.statusCode=422;
            throw error;
        }
        return res.status(200).json({questions:questions})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}
exports.deleteQuestion=async(req,res,next)=>{
    const {questionId}=req.params
    try{
        const question=await db.question.findOne({where:{id:questionId}})
        if(!question){
            const error=new Error('the question is not exists')
            error.statusCode=422;
            throw error;
        }
        await question.destroy()
        return res.status(200).json({message:'question has been deleted'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.chooseSubjectAnswer=async (req,res,next)=>{
    const {answers}=req.body;//[{question:1,answer:1},{question:2,answer:2}]
    const {id}=req.params;
    const subjectStatus='FAILED'
    // const studentMark=0;
    try{
        // const questionNumber=await db.question.count({where:{questionableId:id,questionableType:type}})
        // const halfQuestionNumber=Math.floor(questionNumber/2)
        await answers.foreach(async (answer)=>{
            const questionId=answer.question;
            const answerId=answer.answer
            const question=await db.question.findOne({where:{id:questionId}})
            if(!question){
                const error=new Error('this questin is not found')
                error.statusCode=422;
                throw error;
            }
            if(question.rightAnswer == answerId){
                // studentMark+=question.mark
            }
            await db.answer.create({
                userId:req.userId,
                answerId:answer.answer
            })
        })
        const subject=await db.subject.findOne({where:{id:id}})
        if(studentMark>=subject.minimumSuccess){
            subjectStatus='SUCCESSFUL'
        }
        await db.Mark.create({
            studentId:req.userId,
            mark:studentMark,
            teacherId,
            subjectId:id,
            year,
            status:subjectStatus
        })
        return res.status(200).json({message:'done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.chooseLessonAnswer=async(req,res,next)=>{
    const {answer}=req.body//{question:1,answer:1}'
    const status=false
    try{    
        const question=await db.question.findOne({where:{id:answer.question}})
        if(!question){
            const error=new Error('this questin is not found')
            error.statusCode=422;
            throw error;
        }
        if(question.rightAnswer==answer.answer){
            status=true
        }
        await db.answer.create({
            userId:req.userId,
            answerId:answer.answer
        })
        return res.status(200).json({status:status,right:question.rightAnswer})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    }
}