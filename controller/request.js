const db=require('../models')

exports.addRequest=async(req,res,next)=>{
    const {effectId}=req.params;
    const {weight,length}=req.body
    try{
        await db.request.create({
            effectivenessId:effectId,
            UserId:req.userId,
            status:"unacceptable",
            weight:weight,lenght:length
        })
        return res.status(200).json({message:'done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}
exports.changeStatus=async(req,res,next)=>{
    const {requestId}=req.params
    const {status}=req.body
    try{
        const request=await db.request.findOne({id:requestId})
        if(!request){
            const error=new Error("this request is not exists")
            error.statusCode=422;
            throw error;
        }
        request.status=status;
        await request.save()
        return res.status(200).json({message:'done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err) 
    }
}

exports.deleteRequest=async(req,res,next)=>{
    const {requestId}=req.params;
    try{
        const request=await db.request.findOne({id:requestId})
        if(!request){
            const error=new Error("this request is not exists")
            error.statusCode=422;
            throw error;
        }
        await request.destroy()
        return res.status(200).json({message:'request has been deleted'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err) 
    }
}

exports.getRequest=async(req,res,next)=>{
    const {requestId}=req.params
    try{
        const request=await db.request.findOne({where:{id:requestId}})
        if(!request){
            const error=new Error("this request is not exists")
            error.statusCode=422;
            throw error;
        }
        return res.status(200).json({request:request})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err) 
    }
}

exports.getAllRequest=async(req,res,next)=>{
    const {effectId}=req.params
    try{
        const requests=await db.request.findOne({where:{effectivenessId:effectId}})
        if(!requests){
            const error=new Error("there are no request")
            error.statusCode=422;
            throw error;
        }
        return res.status(200).json({requests:requests})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)  
    }
}

exports.getMyRequest=async(req,res,next)=>{
    try{
        const requests=await db.request.findOne({where:{userId:req.userId}})
        if(!requests){
            const error=new Error("there are no requests")
            error.statusCode=422;
            throw error;
        }
        return res.status(200).json({requests:requests})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err) 
    }
}

exports.getAcceptRequest=async(req,res,next)=>{
    const {effectId}=req.params
    try{
        const requests=await db.request.findAll({where:{status:'acceptable',effectivenessId:effectId}})
        if(!request){
            const error=new Error("there are no requests")
            error.statusCode=422;
            throw error;
        }
        return res.status(200).json({requests:requests})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err) 
    }  
}
exports.getUnAcceptRequest=async(req,res,next)=>{
    const {effectId}=req.params
    try{
        const requests=await db.request.findOne({where:{status:'unacceptable',effectivenessId:effectId}})
        if(!requests){
            const error=new Error("there are no requests")
            error.statusCode=422;
            throw error;
        }
        return res.status(200).json({requests:requests})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err) 
    }  
}
exports.getUnthinkRequest=async(req,res,next)=>{
    const {effectId}=req.params
    try{
        const requests=await db.request.findOne({where:{status:'NULL',effectivenessId:effectId}})
        if(!requests){
            const error=new Error("there are no requests")
            error.statusCode=422;
            throw error;
        }
        return res.status(200).json({requests:requests})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err) 
    }  
}
