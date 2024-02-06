const db=require('../models')

exports.addRate=async(req,res,next)=>{
    const{rate,userId}=req.body
    try{
        await db.rate.create({
            rate:rate,
            userId1:req.userId,
            userId2:userId
        })
        return res.status(200).json({message:'done',rate:rate})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}