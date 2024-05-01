const db=require('../models')
const { Op, where } = require("sequelize");

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
        return res.status(200).json({chat:isExist})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.createGroup=async(req,res,next)=>{
    const {groupName}=req.body
    const users=JSON.parse(req.body.users)
    try{
        console.log(req.file)
        if(!req.file){
            const error=new Error('there is no file')
            error.statusCode=422;
            throw error;
        }
        const group=await db.group.create({groupName:groupName,groupImage:req.file.path,isGroup:true})
        users.forEach(async element => {
            await db.group_user.create({UserId:element,groupId:group.id})
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
        const newMessage=await db.message.create({text:message,groupId:groupId,UserId:senderId,date:Date.now()})
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
        const allMessage=await db.message.findAll({where:{groupId:groupId},include:{model:db.User}})
        return res.status(200).json({messages:allMessage})
    }catch(err){
        if(err.satatusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.getAllGroup=async(req,res,next)=>{
    try{
        const groups=await db.group.findAll({where:{isGroup:true},include:{model:db.User,through:{model:db.group_user}}})
        return res.status(200).json({groups:groups})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.getGroup=async(req,res,next)=>{
    const {groupId}=req.params
    try{
        const group=await db.group.findOne({where:{id:groupId},include:[{model:db.User,through:{model:db.group_user}}]})
        if(!group){
            const error=new Error('this group is not found')
            error.statusCode=422;
            throw error
        }
        return res.status(200).json({group:group})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}