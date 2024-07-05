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
const users = {};
const socketToRoom = {};
io.on('connection',socket=>{
    console.log('new connected',socket.id)
    socket.on('addNewUser',(user)=>{
        console.log("userId",user.userId)
        onlineUsers.some((u)=> u.userId === user.userId)
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
        
        if(data.roomID != null){
            const userId=data.userId;
            const lessonId=data.lessonId;
            const user=await db.User.findOne({where:{id:userId}})
            if(user.role == 'STUDENT'){
                const att=await db.attendance.findOne({where:{UserId:userId,lessonId:lessonId}})
                att.status='a'
                await att.save()
                // await db.attendance.create({UserId:userId,lessonId:lessonId,status:'a'})
            }
            if (users[data.roomID]) {
                const length = users[data.roomID].length;
                // if (length === 4) {
                //     socket.emit("room full");
                //     return;
                // }
                users[data.roomID].push([socket.id,data.userId,user.role]);
                console.log("userslll",users)
            } else {
                users[data.roomID] = [[socket.id,userId,user.role]];
            }
            socketToRoom[socket.id] = data.roomID;
            const usersInThisRoom = users[data.roomID].filter(id => id[0] !== socket.id);
    
            socket.emit("all users", usersInThisRoom);
            console.log("userIN this room",usersInThisRoom)
            console.log("users",users)
        }

        // console.log("io room",[...io.sockets.adapter.rooms.get(18)].length)
    })
    
    socket.on('sendMessageToRoom',messageData=>{
        // console.log("this data is inside ",data)
        console.log(messageData)
        sendData={message:messageData.text,sender:messageData.userId}
        let room=parseInt(messageData.room)
        io.to(room).emit('getMessageToRoom',sendData)
    })
    // console.log("io socket",io.sockets)
    // console.log("io room",io.sockets.adapter.rooms)
    // socket.on("callUser", ({ userToCall, signalData, from, name }) => {
  //   socket.emit('numberStudent',[...io.sockets.adapter.rooms.get(18)])
    //     io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  // });

  // socket.on("answerCall", (data) => {
  //   io.to(data.to).emit("callAccepted", data.signal)
  // });
    // console.log(socket)

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect',()=>{
        console.log(socket.id)
        onlineUsers=onlineUsers.filter((user)=>user.socketId !== socket.id);
        console.log(onlineUsers)
        io.emit("getOnlineUsers",onlineUsers)

        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id[0] !== socket.id);
            users[roomID] = room;
        }
        console.log("dis users",users)
    })
})


db.sequelize
.sync()
.then(()=>{
    const server=Server.listen(process.env.PORT ||  8000,console.log('server is ready'));
})
.catch(err=>console.log(err))