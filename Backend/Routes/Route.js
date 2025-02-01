const express = require('express')

const router = express.Router()


const {registerUser,loginUser, forgotPassword, resetPassword, isLogin, getUserDetails, updatePassword, updateProfile, getAllUsers, updateUser, getUser, deleteUser} = require('../Controllers/userController')
const { jwtAuthMiddleWare, authorizationRole } = require('../jwt')

router.route('/registeruser').post(registerUser)
router.route('/loginuser').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/password/update').put(jwtAuthMiddleWare,updatePassword)
router.route('/islogin').get(jwtAuthMiddleWare,isLogin)
router.route('/me').get(jwtAuthMiddleWare,getUserDetails)
router.route('/me/update').put(jwtAuthMiddleWare,updateProfile)

router.route('admin/users').get(jwtAuthMiddleWare,authorizationRole('admin'),getAllUsers)

router.route('/admin/user/:id').get(jwtAuthMiddleWare,authorizationRole('admin'),getUser)
router.route('/admin/user/:id').put(jwtAuthMiddleWare,authorizationRole('admin'),updateUser)
router.route('/admin/user/:id').delete(jwtAuthMiddleWare,authorizationRole('admin'),deleteUser)

module.exports = router