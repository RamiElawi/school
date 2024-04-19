const db=require('../models')
const { Op } = require("sequelize");

exports.createSingleChat=async(req,res,next)=>{
    const{senderId,reciverId}=req.body
    try{

        const one=`${senderId}-${reciverId}`;
        const two=`${reciverId}-${senderId}`
        const isExist=await db.group.findOne({where:{
            groupName:{[Op.or]:[one ,two]}
        }})

            // console.log(isExist)
        if(isExist == null){
           const chat=await db.group.create({groupName:one,isGroup:false})
           const user1=await db.group_user.create({groupId:chat.id,userId:senderId})
           const user2=await db.group_user.create({groupId:chat.id,userId:reciverId})
            return res.status(200).json({chat:chat}) 
        }
        return res.status(200).json(isExist)
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.createGroup=async(req,res,next)=>{
    const {groupName,users}=req.body
    try{
        if(!req.file){
            const error=new Error('there is no file')
            error.statusCode=422;
            throw error;
        }
        const group=await db.group.create({groupName:groupName,groupImage:req.file.image,isGroup:true})
        users.forEach(async element => {
            await db.group_user.create({userId:element,groupId:group.id})
        });
        return res.status(200).json({group:group})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
}

exports.addUsers=async(req,res,next)=>{
    const {userId,groupId}=req.body
    try{
        const users=await db.group_user.create({userId:userId,groupId:groupId})
        return res.status(200).json({message:'done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.sendMessage=async(req,res,next)=>{
    const {message,senderId,groupId}=req.body;
    try{
        const newMessage=await db.message.create({text:message,groupId:groupId,userId:senderId,date:Date.now()})
        return res.status(200).json({message:newMessage})
    }catch(err){
        if(err.satatusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.getAllMessage=async(req,res,next)=>{
    const {groupId}=req.body;
    try{
        const allMessage=await db.message.findAll({where:{groupId:groupId}})
        return res.status(200).json({messages:allMessage})
    }catch(err){
        if(err.satatusCode){
            err.statusCode=500
        }
        next(err)
    }
}