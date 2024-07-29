const express = require('express')
const router = express.Router()

const creditors = require('./creditors.route')

router.use('/v1', creditors)


module.exports = router
