const express = require('express')
const router = express.Router()

const authUser = require('./auth.user.route')
const getUser = require('./user.route')

router.use('/v1', authUser)
router.use('/user', getUser)


module.exports = router
