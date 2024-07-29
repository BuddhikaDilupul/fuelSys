const express = require('express')
const router = express.Router()

const pump = require('./pump.route')
const history = require('./history.routes') 

router.use('/v1/pump', pump)
router.use('/v1/history', history)


module.exports = router
