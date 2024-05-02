const router=require('express').Router()
const effectivenessController=require('../controller/effectiveness')
const isAuth=require('../config/isAuth')

router.post('/addEffectiveness',isAuth,effectivenessController.addEffectiveness)

router.get('/getEffectiveness/:effectId',isAuth,effectivenessController.getEffectivenessId)

router.get('/allEffectiveness',isAuth,effectivenessController.getEffectiveness)

router.put('/updateEffectiveness/:effectivenessId',isAuth,effectivenessController.updateEffectiveness)

router.delete('/deleteEffectiveness/:effectivenessId',isAuth,effectivenessController.deleteEffectiveness)

module.exports=router