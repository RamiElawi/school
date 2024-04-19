const router=require('express').Router()
const chatController=require('../controller/chat')
const isAuth=require('../config/isAuth')
const multer=require('multer')
const storageFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/groupImage')
    },
    filename:(req,file,cb)=>{
        const uniqueSeffex=Date.now()+'-'+Math.random(Math.random()*1E9)
        cb(null,uniqueSeffex+'-'+file.originalname)
    }
})
const upload=multer({storage:storageFile})

router.post('/createSingleChat',chatController.createSingleChat)

router.post('/createGroup',upload.single('image'),chatController.createGroup)

router.get('/getAllGroup',chatController.getAllGroup)

router.get('/getGroup/:groupId',chatController.getGroup)

// router.post('/addUsers',chatController.addUsers)

router.post('/sendMessage',chatController.sendMessage)

router.get('/getAllMessage',chatController.getAllMessage)


module.exports=router;