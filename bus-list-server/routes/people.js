const express = require('express')
const controller = require('../controllers/people')
const router = express.Router()

router.post('/set-people', controller.setPeople)
router.get('/get-people', controller.getPeople)

module.exports = router