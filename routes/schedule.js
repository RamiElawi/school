const router=require('express').Router();
const scheduleController=require('../controller/schedule');
const isAuth=require('../config/isAuth')
router.post('/addDate',isAuth,scheduleController.addDate);

router.put('/updateDate/:dateId',isAuth,scheduleController.updateDate);

router.delete('/deleteDate/:dateId',isAuth,scheduleController.deleteDate);

router.get("/getScheduleSection/:sectionId",isAuth,scheduleController.getScheduleSection)

router.get('/getAllSchedule',isAuth,scheduleController.getSchedule)

module.exports=router;