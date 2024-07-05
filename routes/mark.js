const router=require('express').Router();
const markController=require('../controller/mark')
const isAuth=require('../config/isAuth')

// router.post('/addMark',isAuth,markController.addMark)

router.put('/updateMark/:studentId',isAuth,markController.updateMark)

router.delete('/deleteMark/:studentId',isAuth,markController.deleteMark)

router.post('/getSubjectMarks/:subjectId',isAuth,markController.getSubjectMarks)

router.post('/getStudentMark',isAuth,markController.getStudentMark)

router.post('/getStudentMarks',isAuth,markController.getStudentMarks)

router.post('/getStudentMarksByName',isAuth,markController.getStudentMakrsByName)

// add another way to get mark

module.exports=router;