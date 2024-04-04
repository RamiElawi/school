const route=require('express').Router();

const authRouter=require('./auth')
const userRouter=require('./user')
const subjectRouter=require('./subject')
const markRouter=require('./mark')
const question=require('./question')
const effectiveness=require('./effectiveness');
const request= require('./request');
const chatRouter=require('./chat')
const lessonRouter=require('./lesson')

route.use('/auth',authRouter);
route.use('/user',userRouter);
route.use('/subject',subjectRouter);
route.use('/mark',markRouter);
route.use('/question',question);
route.use('/effectiveness',effectiveness)
route.use('/request',request)
route.use('/lesson',lessonRouter)
// route.use('/chat',chatRouter)
module.exports=route;