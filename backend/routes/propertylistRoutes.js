const express = require('express')
const router  = express.Router()
let upload =  require('../multerConfig.js')
let propertylistController  = require('../controller/propertyListController.js')

router.post('/propertylistSave',upload.array('images', 4), propertylistController.propertylistSave)

router.get('/getpropertylist', propertylistController.getpropertylist)

router.delete('/deletepropertylist/:id', propertylistController.deletepropertylist)

router.get('/getpropertylistyId/:id', propertylistController.getpropertylistById)

router.put('/updatepropertylist/:id', propertylistController.updatepropertylist)

module.exports = router;

