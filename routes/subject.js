const router=require('express').Router();
const subjectController=require('../controller/subject')
const isAuth=require('../config/isAuth')
const multer=require('multer');
const chechRole = require('../config/chechRole');
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

router.post('/addSubject',isAuth,chechRole(['ADMIN']),upload.single('image'),subjectController.addSubject);

router.put('/updateSubject/:subjectId',isAuth,chechRole(['ADMIN']),upload.single('image'),subjectController.updateSubject)

router.delete('/deleteSubject/:subjectId',isAuth,chechRole(['ADMIN']),subjectController.deleteSubject)

router.get('/getAllSubject/:classId',subjectController.getSubjects)

router.get('/getSubject/:subjectId',subjectController.getSubject)

router.post('/addRreferance',isAuth,upload.fields([{name:'file'},{name:'image'}]),subjectController.addReferance)

router.put('/updateRreferance/:referanceId',isAuth,upload.fields([{name:'file'},{name:'image'}]),subjectController.updateReferance)

router.delete('/deleteReferance/:referanceId',isAuth,subjectController.deleteReferance)

router.get('/getReferance',isAuth,subjectController.getReferance)

router.get('/filterReferance/:type',isAuth,subjectController.filterReferance)

// add another way to get a referance


module.exports=router;