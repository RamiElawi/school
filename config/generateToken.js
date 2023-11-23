const db=require('../models')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const generateToken=(user)=>{
    
    try{
        const accessToken=jwt.sign({
            userId:user.id,
            email:user.email,
            role:user.role
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
        const refreshToken=jwt.sign({
            userId:user.id,
            email:user.email,
            role:user.role
        },process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'})

        db.token.findOne({where:{userId:user.id}})
        .then(userToken=>{
            if(userToken){
                userToken.destroy();
            }
            db.token.create({
                userId:user.id,
                token:refreshToken
            })
        })
        return {accessToken,refreshToken};
    }catch(err){
        console.log(err);
        return Promise.reject(err);
    }
}

module.exports=generateToken;