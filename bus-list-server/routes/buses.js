const express = require('express')
const controller = require('../controllers/buses')
const router = express.Router()


router.post('/set-bus', controller.setBus)
router.get('/get-bus', controller.getBus)

module.exports = router