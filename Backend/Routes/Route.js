const express = require('express')

const router = express.Router()


const {registerUser,loginUser, forgotPassword, resetPassword} = require('../Controllers/userController')
const { jwtAuthMiddleWare } = require('../jwt')

router.route('/registeruser').post(registerUser)
router.route('/loginuser').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(jwtAuthMiddleWare,resetPassword)


module.exports = router