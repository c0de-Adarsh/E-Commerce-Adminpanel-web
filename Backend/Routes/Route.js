const express = require('express')

const router = express.Router()


const {registerUser,loginUser, forgotPassword, resetPassword, isLogin, getUserDetails, updatePassword, updateProfile, getAllUsers, updateUser, getUser, deleteUser} = require('../Controllers/userController')
const { jwtAuthMiddleWare, authorizationRole } = require('../jwt')
const { createProduct, getAllProducts, getCategoryProducts, getAdminProducts, deleteProduct, updateProduct, getProductDetails, createProductReview, getProductReview, getEveryProduct, delteReview } = require('../Controllers/productController')
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../Controllers/orderControllers')
const { processPayment, sendStripeApiKey } = require('../Controllers/paymentController')

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




//product 
router.route('/product/new').post(jwtAuthMiddleWare,authorizationRole('admin'),createProduct)
router.route('/productbycategory').get(getCategoryProducts)
router.route('/products').get(getAllProducts)
router.route('/admin/products').get(jwtAuthMiddleWare,authorizationRole('admin'),getAdminProducts)
router.route('/products/:id').delete(jwtAuthMiddleWare,authorizationRole('admin'),deleteProduct)
router.route('/products/:id').put(jwtAuthMiddleWare,authorizationRole('admin'),updateProduct)
router.route('/products/:id').get(getProductDetails)
router.route('/review/create').post(jwtAuthMiddleWare,createProductReview)
router.route('/reviews').get(getProductReview)
router.route('/reviews').delete(jwtAuthMiddleWare,delteReview)
router.route('/review').put(jwtAuthMiddleWare,createProductReview)

//payment routes
router.route('/geteveryproduct').get(getEveryProduct)


//product route

router.route('/order/new').post(jwtAuthMiddleWare,newOrder)
router.route('/order/:id').get(jwtAuthMiddleWare,getSingleOrder)
router.route('/orders/me').get(jwtAuthMiddleWare,myOrders)
router.route('/admin/orders').get(jwtAuthMiddleWare,authorizationRole('admin'),getAllOrders)
router.route('/admin/order/:id').put(jwtAuthMiddleWare,authorizationRole('admin'),updateOrder)
router.route('/admin/order/:id').delete(jwtAuthMiddleWare,deleteOrder)


//payment routes

router.route('/payment/process').post(jwtAuthMiddleWare,processPayment)
router.route('/stripeapikey').get(jwtAuthMiddleWare,sendStripeApiKey)
module.exports = router