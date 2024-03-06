const router=require('express').Router()
const chatController=require('../controller/chat')
const isAuth=require('../config/isAuth')

router.post('/createChat',isAuth,chatController.createChat)

router.get('/allChats',isAuth,chatController.getChats)


module.exports=router;