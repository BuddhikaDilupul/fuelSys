const express = require('express')
const router = express.Router()

const atm = require('./atm.route')
const cash = require('./cash.route')
const credit = require('./creditors.route')
const report = require('./report.route')

router.use('/v1-atm', atm)
router.use('/v1-cash', cash)
router.use('/v1-credit', credit)
router.use('/v1-report', report)


module.exports = router
