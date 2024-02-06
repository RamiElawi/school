const route=require('express').Router()
const isAuth=require('../config/isAuth')
const sectionController=require('../controller/section')

route.post('/addSection',isAuth,sectionController)

route.put('/updateSection',isAuth,sectionController)

route.get('/allSections',isAuth,sectionController)

route.get('/getSection',isAuth,sectionController)

route.delete('/deleteSection',isAuth,sectionController)

module.exports=route