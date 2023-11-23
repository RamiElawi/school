const route=require('express').Router();

const authRouter=require('./auth')
const userRouter=require('./user')
const subjectRouter=require('./subject')
const markRouter=require('./mark')


route.use('/auth',authRouter);
route.use('/user',userRouter);
route.use('/subject',subjectRouter);
route.use('/mark',markRouter);

module.exports=route;