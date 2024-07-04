const router=require('express').Router()
const attendanceController=require('../controller/attendace')


router.get('/getAttendance/:sectionId/:subjectId',attendanceController.getAttendace)


module.exports=router