const db=require('../models')

exports.addQuestion=async (req,res,next)=>{
    const {text,rightAnswer,answers,mark}=req.body
    const {type,id}=req.params
    console.log(answers)
    try{
        const question=await db.question.create({
            title:text,
            questionableType:type,
            questionableId:id,
            mark:mark
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
    const {text,rightAnswer,Answers,mark}=req.body
    const {questionId}=req.params
    try{
        const question=await db.question.findOne({id:questionId})
        if(!question){
            const error=new Error('this question is not exsits')
            error.statusCode=422;
            throw error
        }
        question.text=text;
        question.mark=makr;
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
    let studentMark=0.0;
    try{
        // const questionNumber=await db.question.count({where:{questionableId:id,questionableType:type}})
        // const halfQuestionNumber=Math.floor(questionNumber/2)
        await answers.forEach(async (answer)=>{
            const questionId=answer.question;
            const answerId=answer.answer
            const question=await db.question.findOne({where:{id:questionId}})
            if(!question){
                const error=new Error('this questin is not found')
                error.statusCode=422;
                throw error;
            }
            if(question.rightAnswer == answerId){
                studentMark+=question.mark
            }
            await db.user_answer.create({
                UserId:req.userId,
                answerId:answer.answer
            })
        })
        const subject=await db.subject.findOne({where:{id:id}})
        if(studentMark>=subject.minimumSuccess){
            subjectStatus='SUCCESSFUL'
        }
        const mark=await db.Mark.findOne({where:{studentId:req.userId,subjectId:id}})
        console.log(new Date().getFullYear())
        const thisYear= parseInt(new Date().getFullYear())
        const newYear=new Date(thisYear,0,1)

        console.log(newYear)
        if(!mark){
            await db.Mark.create({
                studentId:req.userId,
                mark:studentMark,
                teacherId:subject.teacherId,
                subjectId:id,
                year:`${thisYear}`,
                status:subjectStatus
            })
            return res.status(200).json({message:'done'})
        }
        mark.mark=studentMark;
        mark.status=subjectStatus;
        mark.year=`${thisYear}`
        console.log(mark.year)
        await mark.save()
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
    let status=false
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
        await db.user_answer.create({
            UserId:req.userId,
            answerId:answer.answer
        })
        const rightAnswer=await db.answer.findOne({where:{id:question.rightAnswer}})
        return res.status(200).json({status:status,rightAnswer:rightAnswer.answer})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    }
}