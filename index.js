const express=require('express');
const app=express();
const Server=require('http').createServer(app)
const bodyPareser=require('body-parser')
const db=require('./models')
const allRoutes=require('./routes')
const cors=require('cors')
const path=require('path')
const io=require('socket.io')(Server,{
    cors:{
        origin:'*'
    }
})
require('dotenv').config()
const { Op } = require("sequelize");

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
    socket.on('addNewUser',(user)=>{
        console.log("userId",user.userId)
        onlineUsers.some((u)=> u.userId === user.userId)||
        onlineUsers.push({
            userId:user.userId,
            socketId:socket.id
        });
        console.log("onlineUsers",onlineUsers)
        io.emit('getOnlineUser',onlineUsers)  
    })

    socket.on("sendMessage",message=>{
        console.log(message)
        const user=onlineUsers.find(user=>user.userId === message.recipientId)
        console.log(user)
        if(user) io.to(user.socketId).emit("getMessage",message)
    })
    // console.log(socket)
    socket.on('enterRoom',async data=>{
        if(data.sender != null){
            const one=`${data.sender}-${data.receiver}`
            const two=`${data.receiver}-${data.sender}`
            const chat= await db.group.findOne({where:{groupName:{[Op.or]:[one,two]}}})
            // console.log(chat)
            socket.join(chat.id)
            console.log(data.sender,"=",socket.rooms)
        }
        if(data.chatId != null){
            socket.join(data.chatId)
            console.log(data.userId,"=",socket.rooms)
        }
    })
    
    socket.on('sendMessageToRoom',messageData=>{
        // console.log("this data is inside ",data)
        console.log(messageData)
        sendData={message:messageData.text,sender:messageData.userId}
        let room=parseInt(messageData.room)
        io.to(room).emit('getMessageToRoom',sendData)
    })
    // console.log(socket)
    socket.on('disconnect',()=>{
        console.log(socket.id)
        onlineUsers=onlineUsers.filter((user)=>user.socketId !== socket.id);
        console.log(onlineUsers)
        io.emit("getOnlineUsers",onlineUsers)
    })
})


db.sequelize
.sync()
.then(()=>{
    const server=Server.listen(process.env.PORT || 8000,console.log('server is ready'));
})
.catch(err=>console.log(err))


