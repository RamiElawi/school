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

router.get('/getAllSubject',subjectController.getSubjects)

router.get('/getSubject/:subjectId',subjectController.getSubject)

router.post('/:subjectId/addRreferance',isAuth,upload.fields([{name:'file'}]),subjectController.addReferance)

router.put('/:subjectId/updateRreferance/:referanceId',isAuth,upload.single('file'),subjectController.updateReferance)

router.delete('/:subjectId/deleteReferance/:referanceId',isAuth,subjectController.deleteReferance)

router.get('/:subjectId/getReferance',isAuth,subjectController.getReferance)


// add another way to get a referance


module.exports=router;