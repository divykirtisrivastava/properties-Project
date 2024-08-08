const express = require('express')
const router  = express.Router()
let upload =  require('../multerConfig.js')
let clientistController  = require('../controller/clientComtroller.js')

router.post('/clientlistSave',upload.single('images'), clientistController.clientSave)
router.post('/clientlogin', clientistController.clientLogin)
router.post('/verify', clientistController.verify)

module.exports = router;
