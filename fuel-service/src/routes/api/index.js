const express = require('express')
const router = express.Router()

const fuel = require('./fuel.route')

router.use('/v1', fuel)


module.exports = router
