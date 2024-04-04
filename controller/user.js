const db=require('../models')

exports.addRate=async(req,res,next)=>{
    const{rate}=req.body
    const{userId}=req.params
    try{
        const rateUser=await db.rate.findOne({where:{userId1:req.userId,userId2:userId}})
        if(!rateUser){
            await db.rate.create({
                rate:rate,
                userId1:req.userId,
                userId2:userId
            })
            return res.status(200).json({message:'done',rate:rate})
        }
        rateUser.rate=rate;
        await user.save()
        return res.status(200).json({message:'done',rate:rate})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.getRate=async(req,res,next)=>{
    const {userId}=req.params
    try{
        const rate=await db.rate.sum('rate',{where:{userId2:userId}})
        const count=await db.rate.count({where:{userId2:userId}})
        console.log(rate)
        console.log(count)
        const user=await db.User.findOne({where:{id:userId}})
        if(!user){
            const error=new Error('this user is not found')
            error.statusCode=422;
            throw error;  
        }
        user.rate=rate/count;
        await user.save();
        return res.status(200).json({rate:rate/count})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.getProfile=async(req,res,next)=>{
    const {userId}=req.params
    let isMe=true;
    try{
        const user=await db.User.findOne({where:{id:userId},include:[{model:db.father}]})
        if(!user){
            const error=new Error('this user is not found')
            error.statusCode=422;
            throw error;
        }
        if(userId!=req.userId){
            isMe=false;
        }
        return res.status(200).json({user:user,Me:isMe})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.changeImage=async(req,res,next)=>{
    const {userId} =req.params;
    
    try{
        if(!req.file){
            const error=new Error('there is no file')
            error.statusCode=422;
            throw error;
        }
        const userImage=req.file.userImage
        const user=await db.User.findne({where:{id:userId}})
        if(!user){
            const error=new Error('this user is not found')
            error.statusCode=422;
            throw error;
        } 
        user.image=userImage
        await user.save()
        return res.status(200).josn({message:"change image is done"})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
}


exports.getUser=async(req,res,next)=>{
    const userType=req.params.userType
    try{
        const users=await db.User.findAll({where:{role:userType}})
        if(!users) users=`there is no ${userType} yet`
        return res.status(200).json({users:users})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
}