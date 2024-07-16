const db=require('../models')

exports.addEffectiveness=async(req,res,next)=>{
    const {title,description,startDate,endDate}=req.body
    try{
        if(endDate<=startDate){
            const error=new Error('this is wrroing')
            error.statusCode=422;
            throw error;
        }
        if(!req.file){
            const error=new Error('you dont choose file')
            error.statusCode=422;
            throw error;
        }
        await db.effectiveness.create({title,description,startDate,endDate,image:req.file.path})
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
       const effect=await db.effectiveness.findOne({where:{id:effectId}})
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
    const {title,description,startDate,endDate}=req.body
    const {effectivenessId}=req.params
    try{
        const effect=await db.effectiveness.findOne({where:{id:effectivenessId}})
        if(!effect){
            const error=new Error('this effect is not found')
            error.statusCode=422
            throw error
        }
        if(endDate<=startDate){
            const error=new Error('this is wrroing')
            error.statusCode=422;
            throw error;
        }  
        let eff_image=effect.image;
        if(req.file){
            require('../config/clearImage').clearImage(eff_image)
            eff_image=req.file.path;
        }
        subject.image=eff_image;
        effect.title=title;
        effect.description=description;
        effect.startDate=startDate
        effect.endDate=endDate
        effect.image=req.file.path
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
        const effect=await db.effectiveness.findOne({where:{id:effectivenessId}})
        if(!effect){
            const error=new Error('this effect is not found')
            error.statusCode=422
            throw error
        }
        await effect.destroy()
        return res.status(200).json({message:'effect has been deleted'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}