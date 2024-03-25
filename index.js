const express=require('express');
const app=express();
const Server=require('http').createServer(app)
const bodyPareser=require('body-parser')
const db=require('./models')
const allRoutes=require('./routes')
const cors=require('cors')
const path=require('path')
const io=require('socket.io')(Server)
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
let onlineUsers=[];
io.on('connection',socket=>{
    console.log('new connected',socket.id)
    socket.on('addNewUser',(userId)=>{
        onlineUsers.some((user)=> user.userId === userId)&&
        onlineUsers.push({
            userId,
            socketId:socket.id
        });
        console.log("onlineUsers",onlineUsers)
        io.emit('getOnlineUser',onlineUsers)  
    })

    socket.on("sendMessage",message=>{
        const user=onlineUsers.find(user=>user.userId === message.recipientId)
        if(user) io.to(user.socketId).emit("getMessage",message)
    })
    socket.on('disconnect',()=>{
        onlineUsers=onlineUsers.filter((user)=>user.socketId !== socket.id);
        io.emit("getOnlineUsers",onlineUsers)
    })
})


db.sequelize
.sync()
.then(()=>{
    const server=Server.listen(process.env.PORT || 8000,console.log('server is ready'));
})
.catch(err=>console.log(err))


