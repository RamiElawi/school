const db=require('../models')

exports.addEffectiveness=async(req,res,next)=>{
    const {title,description,allowedNumber}=req.body
    try{
        if(allowedNumber <= 1){
            const error=new Error('this is illegeal')
            error.statusCode=422;
            throw error;
        }
        await db.effectiveness.create({title,description,allowedNumber})
        return res.status(200).json({message:'done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    }
}

exports.getEffectiveness=async(req,res,next)=>{
    try{
        const effects=await db.effectiveness.findAll()
        if(!effects){
            effects='there are no effectiveness'
        }
        return res.status(200).json({effects:effects})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.getEffectivenessId=async(req,res,next)=>{
    const {effectId}=req.params
   try{
       const effect=await db.effectiveness.findOne({id:effectId})
       if(!effect){
           const error=new Error('this effectiveness is not found')
           error.status=422;
           throw error
       }
       return res.status(200).json({effect:effect})
   }catch(err){
    if(!err.statusCode){
        err.statusCode=500
    }
    next(err)
   }
}

exports.updateEffectiveness=async(req,res,next)=>{
    const {title,description,allowedNumber}=req.body
    const {effectivenessId}=req.params
    try{
        const effect=await db.effectiveness.findOne({id:effectivenessId})
        if(!effect){
            const error=new Error('this effect is not found')
            error.statusCode=422
            throw error
        }
        effect.title=title;
        effect.description=description;
        effect.allowedNumber=allowedNumber
        await effect.save()
        return res.status(200).json({message:"effect has been updated"})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}

exports.deleteEffectiveness=async(req,res,next)=>{
    const {effectivenessId}=req.params
    try{
        const effect=await db.effectiveness.findOne({id:effectivenessId})
        if(!effect){
            const error=new Error('this effect is not found')
            error.statusCode=422
            throw error
        }
        await effect.destroyed()
        return res.status(200).json({message:'effect has been deleted'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}