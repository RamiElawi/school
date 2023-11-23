const router=require('express').Router();
const subjectController=require('../controller/subject')
const multer=require('multer');
const storageFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/subjectImage')
    },
    filename:(req,file,cb)=>{
        const uniqueSeffex=Date.now()+'-'+Math.random(Math.random()*1E9)
        cb(null,uniqueSeffex+'-'+file.originalname)
    }
})

 const upload=multer({storage:storageFile})

// router.post('/addSubject',isAuth,upload.single('image'),subjectController);

// router.put('/updateSubject/:subjectId',isAuth,single('image'),subjectController)

// router.delete('/deleteSubject/:subjectId',isAuth,subjectController)

// router.get('/getAllSubject',subjectController)

// router.get('/getSubject/:subjectId',subjectController)

// router.post('/:subjectId/addRreferance',isAuth,upload.fields([{name:'file'}]),subjectController)

// router.put('/:subjectId/updateRreferance/:referanceId',isAuth,upload.single('file'),subjectController)

// router.delete('/:subjectId/deleteReferance/:referanceId',isAuth,subjectController)

// router.get('/:subjectId/getReferance',isAuth,subjectController)




module.exports=router;