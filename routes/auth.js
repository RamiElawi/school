const router=require('express').Router();
const authController=require('../controller/auth')
const {body}=require('express-validator')
const db=require('../models')
let User=db.User;
const isAuth=require('../config/isAuth')
const multer=require('multer');
const storageFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/userFile')
    },
    filename:(req,file,cb)=>{
        const uniqueSeffex=Date.now()+'-'+Math.random(Math.random()*1E9)
        cb(null,uniqueSeffex+'-'+file.originalname)
    }
})

 const upload=multer({storage:storageFile})

router.post('/signup',
[
    // body('email')
    // .isEmail()
    // .withMessage('This email is not valid')
    // .custom(async(value,{req})=>{
    //     const user=await User.findOne({where:{email:value}})
    //     if(user){
    //         const error=new Error('This email is already exists')
    //         error.statusCode=422;
    //         throw error;
    //     }
    //     return true;
    // }),
    body("password")
    .trim()
    .isLength({max:6}),
    body('confirmPassword')
    .trim()
    .isLength({max:6})
    .custom(async(value,{req})=>{
        if(value!=req.body.password){
            const error=new Error('This password is not match')
            error.statusCode=422;
            throw error;
        }
        return true;
    })
],
upload.fields([{name:'file'},{name:'image'}])
,authController.signup)

router.post('/login',
[
    body('email')
    .isEmail()
    .withMessage('This emai is not valid'),
    body('password')
    .trim()
    .isLength({max:6})
]
,authController.login)


router.post('/refreshToken',authController.refreshToken)


router.post('/resetPssword',
[
    body('email')
    .isEmail()
    .withMessage('This is not valid')
]
,authController.resetPassword)

router.put('/newPassword/:resetToken',
[
    body('newPassword')
    .trim()
    .isLength({max:6}),
    body('confirmPassword')
    .trim()
    .isLength({max:6})
    .custom(async(value,{req})=>{
        if(value!=req.body.newPassword){
            const error=new Error('This password is not match')
            error.statusCode=422;
            throw error;
        }
    })
]
,authController.newPassword);

router.delete('/logout',isAuth,authController.logout)

router.get('/getRequest/:status',authController.getUserRequest)

router.delete('/deleteRequest/:requestId',authController.deleteRequest)

router.post('/changeStatus',authController.changeStatus)

router.post('/signupParents',upload.single('image'),authController.signupParents)

module.exports=router;