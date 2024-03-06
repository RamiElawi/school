const express=require('express');
const app=express();
const Server=require('http').createServer(app)
const bodyPareser=require('body-parser')
const db=require('./models')
const allRoutes=require('./routes')
const cors=require('cors')
const path=require('path')
const socket=require('socket.io')
require('dotenv').config()

app.use(cors({
    origin:'*',
    methods:'GET,POST,DELETE,PUT,PATCH',
    allowedHeaders:'Content-Type,Authorization,Content-Range,Accept-Ranges,Content-Length,range'
}))
app.use('/public',express.static(path.join(__dirname,'public')))
app.use(bodyPareser.urlencoded({extended:true}))
app.use(bodyPareser.json())

app.use('/api',allRoutes)



app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.statusCode).json({
        message:err.message,
        data:err.data,
        statusCode:err.statusCode
    })
})



db.sequelize
.sync()
.then(()=>{
    const server=Server.listen(process.env.PORT || 8000,console.log('server is ready'));
})
.catch(err=>console.log(err))


