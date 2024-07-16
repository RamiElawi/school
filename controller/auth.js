const db=require('../models')
const User=db.User;
const bcrypt=require('bcryptjs')
const {validationResult}=require('express-validator')
const generateToken=require('../config/generateToken')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const crypto=require('crypto')
const {Op}=require('sequelize')
const {generateStudentNumber,generateLoginToken}=require('../config/generateStudentNumber');
const { request } = require('http');
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
        const {firstName,midelName,lastName,motherName,phone,date,address,email,password,role}=req.body;
        console.log("body",req.body)
        const Errors=validationResult(req);
        const isExsit=await User.findOne({where:{email:email}})
        if(isExsit){
            const error=new Error('this email is alredy exist')
            error.statusCode=422;
            throw error;
        }
        if(!Errors.isEmpty()){
            const error=new Error('validation faild')
            error.statusCode=422;
            error.data=Errors.array();
            throw error;
        }
        let studentN;
        const hashPassword=await bcrypt.hash(password,12);
        // if(role == "STUDENT"){
        //     const {stn}=await generateStudentNumber()
        //     studentN=stn
        // }
        const user=await User.create({
            firstName:firstName,
            lastName:lastName,
            midelName:midelName,
            email:email,
            password:hashPassword,
            role:role,
            studentNumber:studentN,
            motherName:motherName,
            address:address,
            phone:phone,
            Date:date,
            status:null,
            image:req.files.image[0].path
        })
        const file=await  db.file.create({
            fileableId:user.id
            ,fileableType:'Personal'
            ,path:req.files.file[0].path,
            name:req.files.file[0].originalname.split('.')[0]
        });
        return res.status(200).json({message:"signup is done"})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.login=async(req,res,next)=>{
    const {email,password,loginToken}=req.body
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
        console.log(user.loginToken)
        console.log(loginToken)
        if(!(user.loginToken == loginToken)){
            const error=new Error('this loginToken is not correct');
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
exports.changeStatus=async(req,res,next)=>{
    const {status,userId}=req.body;
    try{
        const user=await User.findOne({where:{id:userId}})
        if(status == 'accepted'){
            const {loginToken,studentNumber}=await generateLoginToken()
            if(!user){
                const error=new Error('this user is not found')
                error.statusCode=422;
                throw error;
            }
            user.loginToken=loginToken;
            user.studentNumber=studentNumber;
            user.status=status
            await user.save()
            const mailOptions={
                from:'elawirse@gmail.com',
                to:user.email,
                subject:'login token',
                html:`
                <p>Your login token </p>
                <p>Thank you for join us in our school MES and your login token is : ${user.loginToken}</p>
                `
            }
        
            transport.sendMail(mailOptions,(err,info)=>{
                if(err){
                    throw err;
                }
                console.log(info);
            })
            return res.status(200).json({message:'done'})
        }
        user.status=status
        await user.save()
        return res.status(200).json({message:'done'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err)
    }
}

exports.getUserRequest=async(req,res,next)=>{
    const {status}=req.params;
    try{
        if(status == 'null'){
            const requests=await User.findAll({where:{status:null},include:{model:db.file}})
            return res.status(200).json({requests:requests})
        }
        const requests=await User.findAll({where:{status:status},include:{model:db.file}})
        return res.status(200).json({requests:requests})
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
        const request= await User.findOne({where:{id:requestId}})
        if(!request){
            const error=new Error('this request is not found')
            error.statusCode=422;
            throw error;
        }
        await request.destroy()
        return res.status(200).json({message:'request is deleted'})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
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
    try{const user=await User.findOne({where:{email:email}})
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

exports.signupParents=async (req,res,next)=>{
    const {firstName,lastName,midelName,email,address,phone,motherName,password,sonNumber}=req.body
    try{
        const isExsit=await User.findOne({where:{email:email}})
        if(isExsit){
            const error=new Error('this email is alredy exist')
            error.statusCode=422;
            throw error;
        }
        const son=await User.findOne({where:{studentNumber:sonNumber}})
        if(!son){
            const error=new Error('this stundent is not found')
            error.statusCode=422;
            throw error;
        }
        const hashPassword=await bcrypt.hash(password,12);
        const user=await User.create({
            firstName:firstName,
            lastName:lastName,
            midelName:midelName,
            motherName:motherName,
            email:email,
            password:hashPassword,
            role:'PARENT',
            address:address,
            phone:phone,
            status:null,
            image:req.file.path
        })
        const father=await db.father.create({
            fatherId:user.id,
            studentId:son.id
        })
        return res.status(200).json({message:"signup is done"})
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
}