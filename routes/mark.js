const router=require('express').Router();
const markController=require('../controller/mark')
const isAuth=require('../config/isAuth')

// router.post('/addMark',isAuth,markController.addMark)

router.put('/updateMark/:studentId',isAuth,markController.updateMark)

router.delete('/deleteMark/:studentId',isAuth,markController.deleteMark)

router.get('/getSubjectMarks/:subjectId',isAuth,markController.getSubjectMarks)

router.get('/getStudentMark',isAuth,markController.getStudentMark)

router.get('/getStudentMarks/:studentId',isAuth,markController.getStudentMarks)

router.get('/getStudentMarksByName',isAuth,markController.getStudentMakrsByName)

// add another way to get mark

module.exports=router;