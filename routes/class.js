const router=require('express').Router()
const isAuth=require('../config/isAuth')
const checkRole=require('../config/chechRole')
const classController=require('../controller/class')

router.post('/addClass',isAuth,checkRole(['ADMIN']),classController.addClass)

router.put('/updateClass/:classId',isAuth,checkRole(['ADMIN']),classController.updateClass)

router.get('/AllClass',isAuth,classController.AllClass)

router.delete('/deleteClass/:classId',isAuth,checkRole(['ADMIN']),classController.deleteClass)


module.exports=router