const router=require('express').Router();
const userController=require('../controller/user')
const isAuth=require('../config/isAuth')
const multer=require('multer');

const storageFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/userImage')
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix=Date.now()+'-'+Math.random(Math.random*1E9)
        cb(null,uniqueSuffix+'-'+file.originalname)
    }
})

const upload=multer({storage:storageFile})

router.get('/changeImage/:userId',isAuth,upload.single('userImage'),userController.changeImage)

router.get('/getProfile/:userId',isAuth,userController.getProfile);

router.post('/addRate/:userId',isAuth,userController.addRate)

router.get('/getRate/:userId',isAuth,userController.getRate)

module.exports=router;