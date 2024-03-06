const db=require('../models')
const { Op } = require("sequelize");
exports.createChat=async(req,res,next)=>{
    const {userId}=req.body
    try{
        const isExist=await db.group_user.findAll({where:{[Op.and]:[{userId:userId},{userId:req.userId}]}})
        if(isExist){
            return res.status(200).json({message:'done'})
        }
        const chat=await db.group.create({})
        await db.group_user.bulkCreate({userId:userId,groupId:chat.id},{userId:req.userId,groupId:chat.id})
        return res.status(200).json({message:'done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
}

exports.getChats=async(req,res,next)=>{
    try{
        const chats=await db.group_user.findAll({where:{userId:req.userId},include:[{model:db.group},{model:db.message},{model:db.user}]})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
}