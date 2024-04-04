const route=require('express').Router();
const lessonController=require('../controller/lesson')
const isAuth=require('../config/isAuth');
const multer=require('multer')
const storageFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/lessonFile')
    },
    filename:(req,file,cb)=>{
        const uniqueSeffex=Date.now()+'-'+Math.random(Math.random()*1E9)
        cb(null,uniqueSeffex+'-'+file.originalname)
    }
})

const upload=multer({storage:storageFile})

route.post('/addLesson/:subjectId',isAuth,upload.single('file'),lessonController.addLesson)

route.put('/updateLesson/:lessonId',isAuth,upload.single('newFile'),lessonController.updateLesson)

route.get('/allLesson',isAuth,lessonController.getLessons)

route.get('/:lessonId',isAuth,lessonController.getLesson)

route.delete('/deleteLesson/:lessonId',isAuth,lessonController.deleteLesson)




module.exports=route;