const route=require('express').Router()
const isAuth=require('../config/isAuth')
const sectionController=require('../controller/section')


route.post('/addSection',isAuth,sectionController.addSection)

route.put('/updateSection/:sectionId',isAuth,sectionController.updateSection)

route.post('/allSections',isAuth,sectionController.getAllSection)

route.post('/addStudentToSection',isAuth,sectionController.addStudentToSection)

route.delete('/deleteSection/:sectionId',isAuth,sectionController.deleteSection)

route.delete('/deleteUserFromSection',isAuth,sectionController.deleteStudentFromSection)

route.put('/updateSectionStudent',isAuth,sectionController.updateSectionStudent)

route.get('/getStudentSection/:sectionId',isAuth,sectionController.getStudentSection)




module.exports=route