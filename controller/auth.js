const db=require('../models')
const User=db.User;
const bcrypt=require('bcryptjs')
const {validationResult}=require('express-validator')
const generateToken=require('../config/generateToken')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const crypto=require('crypto')
const {Op}=require('sequelize')
const generateStudentNumber=require('../config/generateStudentNumber')
require('dotenv').config()


const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'elawirse@gmail.com',
        pass:'umpguizdudmypmvu'
    }
})

exports.signup=async(req,res,next)=>{
    try{
        const {firstName,midelName,lastName,email,password,role}=req.body;
        const Errors=validationResult(req);
        if(!Errors.isEmpty()){
            const error=new Error('validation faild')
            error.statusCode=422;
            error.data=Errors.array();
            throw error;
        }

        let studentN;
        const hashPassword=await bcrypt.hash(password,12);
        if(role == "STUDENT"){
            const {stn}=await generateStudentNumber()
            studentN=stn
        }
        const user=await User.create({
            firstName:firstName,
            lastName:lastName,
            midelName:midelName,
            email:email,
            password:hashPassword,
            role:role,
            studentNumber:studentN
        })
        return res.status(200).json({message:"signup is done"})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.login=async(req,res,next)=>{
    const {email,password}=req.body
    const errors=validationResult(req);
    try {
        if(!errors.isEmpty()){
            const error=new Error('validation fiald')
            error.statusCode=422;
            error.data=errors.array();
            throw error;
        }
        const user=await User.findOne({where:{email:email}})
        if(!user){
            const error=new Error('This email is not exsist')
            error.statusCode=422;
            throw error;
        }
        const isEqual=await bcrypt.compare(password,user.password)
        if(!isEqual){
            const error=new Error('this password is not correct');
            error.statusCode=422;
            throw error;
        }
        
        const {accessToken,refreshToken}=generateToken(user);
        return res.status(200).json({message:'correct login',accessToken:accessToken,refershToken:refreshToken,user:user});
    } catch (err) {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.refreshToken=async(req,res,next)=>{
    const {refreshToken}=req.body;

    try{
        const userToken=await db.token.findOne({where:{token:refreshToken}})
        if(!userToken){
            const error=new Error('This user is not found');
            error.statusCode=422;
            throw error;
        }
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
            if(err){
                return res.status(403).json({message:'user is not authenticate'})
            }
            User.findOne({where:{id:user.userId}})
            .then(requiredUser=>{
                const {accessToken,refreshToken}=generateToken(requiredUser)
                return res.status(200).json({accessToken:accessToken,refershToken:refreshToken})
            })
        })
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}
exports.resetPassword=async(req,res,next)=>{
    const {email}=req.body;
    try{

        const user=await User.findOne({where:{email:email}})
        if(!user){
            const error=new Error('This email is not found');
            error.statusCode=422;
            throw error;
        }
        await crypto.randomBytes(32,async(err,buffer)=>{
            if(err){
                throw err;
            }
            user.resetToken=buffer.toString('hex')
            user.resetTokenExpiration=Date.now() + 5*1000*60
            await user.save();
        })
        const mailOptions={
            from:'elawirse@gmail.com',
            to:email,
            subject:'reset password',
            html:`
            <p>Your request a password reset </p>
            <p>Click <a href='http://localhost:8000/api/auth/newPassword/${user.resetToken}'>here</a> to set a new password</p>
            `
        }
    
        transport.sendMail(mailOptions,(err,info)=>{
            if(err){
                throw err;
            }
            console.log(info);
        })
        return res.status(200).json({message:'we send you an email has a link '})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.newPassword=async(req,res,next)=>{
    const {newPassword}=req.body;
    const {resetToken}=req.params;
    console.log(resetToken)
    try{
        const user=await User.findOne({where:{resetToken:resetToken,resetTokenExpiration:{[Op.gt]:Date.now()}}})
    
        if(!user){
            const error=new Error('this user is not dound')
            error.statusCode=422
            throw error;
        }
        const hashPassword=await bcrypt.hash(newPassword,12);
        user.password=hashPassword;
        await user.save()
        return res.status(200).json({message:'chage password is done'})

    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.logout=async(req,res,next)=>{
    try{
        const {refershToken}=req.body
        const userToken=await db.token.findOne({where:{token:refershToken}})
        if(!userToken){
            return res.status(403).json({message:"User Not authenticated"})
        }
        await userToken.destroy()
        return res.status(200).json({message:"logout done"})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}