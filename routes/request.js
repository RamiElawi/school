const route=require('express').Router()
const isAuth=require('../config/isAuth')
const requestController=require('../controller/request')

route.post('/:effectId/addRequest',isAuth,requestController.addRequest)

route.put('/changeStatus/:requestId',isAuth,requestController.changeStatus)

route.delete('/deleteRequest/:requestId',isAuth,requestController.deleteRequest)

route.get('/getRequest/:requestId',isAuth,requestController.getRequest)

route.get('/:effectId/allRequest',isAuth,requestController.getAllRequest)

route.get('/getMyRequest',isAuth,requestController.getMyRequest)

route.get('/:effectId/getAcceptRequest',isAuth,requestController.getAcceptRequest)

route.get('/:effectId/getUnAcceptRequest',isAuth,requestController.getUnAcceptRequest)

route.get('/:effectId/getUnthinkRequest',isAuth,requestController.getUnthinkRequest)

module.exports=route;