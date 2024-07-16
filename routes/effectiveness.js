const router=require('express').Router()
const effectivenessController=require('../controller/effectiveness')
const isAuth=require('../config/isAuth')
const multer=require('multer')
const storageFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/effectImage')
    },
    filename:(req,file,cb)=>{
        const uniqueSeffex=Date.now()+'-'+Math.random(Math.random()*1E9)
        cb(null,uniqueSeffex+'-'+file.originalname)
    }
})

 const upload=multer({storage:storageFile})


router.post('/addEffectiveness',upload.single('image'),effectivenessController.addEffectiveness)

router.get('/getEffectiveness/:effectId',isAuth,upload.single('image'),effectivenessController.getEffectivenessId)

router.get('/allEffectiveness',isAuth,effectivenessController.getEffectiveness)

router.put('/updateEffectiveness/:effectivenessId',isAuth,effectivenessController.updateEffectiveness)

router.delete('/deleteEffectiveness/:effectivenessId',isAuth,effectivenessController.deleteEffectiveness)

module.exports=router