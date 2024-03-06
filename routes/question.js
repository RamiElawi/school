const router=require('express').Router()
const isAuth=require('../config/isAuth')
const questionController=require('../controller/question')

router.post('/addQuestion/:type/:id',isAuth,questionController.addQuestion)

router.get('/AllQuestion/:type/:id',isAuth,questionController.getQuestions)

router.put('/updateQuestion/:questionId',isAuth,questionController.updateQuestion)

router.delete('/deleteQuestion/:questionId',isAuth,questionController.deleteQuestion)

router.post('/chooseSubjectAnswer/:id',isAuth,questionController.chooseSubjectAnswer)//for subject

router.post('/chooseLessonAnswer',isAuth,questionController.chooseLessonAnswer)

module.exports=router