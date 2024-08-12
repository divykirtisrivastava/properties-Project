const express = require('express')
const router  = express.Router()
let upload =  require('../multerConfig.js')
let propertylistController  = require('../controller/propertyListController.js')

router.post('/propertylistSave/:adminName',upload.array('images', 4), propertylistController.propertylistSave)

router.get('/getpropertylist', propertylistController.getpropertylist)
router.get('/getadminpropertylist/:adminName', propertylistController.getadminpropertylist)

router.delete('/deletepropertylist/:id/:adminname', propertylistController.deletepropertylist)

router.get('/getpropertylistyId/:id', propertylistController.getpropertylistById)
router.get('/getadminpropertylistyId/:id/:adminName', propertylistController.getadminpropertylistById)

router.put('/updatepropertylist/:id/:adminName', propertylistController.updatepropertylist)
router.put('/updatepaymentstatus/:id/:data', propertylistController.updatepyamentStatus)

router.get('/checkpaymentstatus/:email', propertylistController.checkpyamentStatus)

router.post('/adminSave',upload.single('images'), propertylistController.adminSave)
router.post('/adminLogin', propertylistController.adminLogin)
router.post('/adminVerify', propertylistController.adminverify)

module.exports = router;

