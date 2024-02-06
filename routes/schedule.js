const router=require('express').Router();
const scheduleController=require('../controller/schedule');
const isAuth=require('../config/isAuth')
router.post('/addDate',isAuth,scheduleController.addDate);

router.put('/updateDate',isAuth,scheduleController.updateDate);

router.delete('/deleteDate',isAuth,scheduleController.deleteDate);

module.exports=router;