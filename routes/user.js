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

// router.get('/getProfile/:userId',isAuth,upload.single('userImage'),userController)

// router.post('/changeImage',isAuth,userController);

// router.post('/')

// router.post('/addRate/:userId',isAuth,userController)

// router.put('/updateRate/:userId',isAuth,userController)
module.exports=router;