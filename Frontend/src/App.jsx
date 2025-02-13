import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import SignUpLogin from './Pages/SignUpLogin'
import { useDispatch, useSelector } from 'react-redux'
import { me } from './Actions/userActions'
import { ToastContainer, toast } from 'react-toastify';
import { isLogin as IsLogin } from './Actions/userActions'
import Dashboard from './Pages/Dashboard'
import CreateProduct from './Pages/CreateProduct'
import Product from './Components/Product'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'
import Shipping from './Pages/Shipping'
import Confirm from './Pages/Confirm'
import axios from 'axios'
import API from './Utils'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import Payment from './Pages/Payment'
import Success from './Pages/Success'
import MyOrders from './Pages/MyOrders'
import AllProducts from './Pages/AllProducts'
import ProductList from './Components/ProductList'
import UpdateProduct from './Pages/UpdateProduct'
import OrderList from './Pages/OrderList'
import UpdateOrders from './Pages/UpdateOrders'
import UserList from './Pages/UserList'
import ProductReview from './Pages/ProductReview'
const App = () => {

  const dispatch = useDispatch()

  const { isLogin, isUpdated } = useSelector(state => state.user)
  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    const { data } = await axios.get(`${API}/stripeapikey`, config)
    //console.log(data)
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    dispatch(me())
    
  }, [dispatch, isLogin, isUpdated])

  useEffect(() => {
    const LogOrNot = () => {
      dispatch(IsLogin());
    }
    LogOrNot()
    getStripeApiKey()

  }, []);
  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/auth' element={<SignUpLogin />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/admin/newProduct' element={<CreateProduct />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/order/shipping" element={<Shipping />} />
            <Route path='/order/confirm' element={<Confirm />} />
            <Route path='/success' element={<Success/>}/>
            <Route path="/orders" element={<MyOrders />} />
            <Route path='/products' element={<AllProducts />} />
            <Route path='/contact' element={<Contact/>}/>
            <Route path="/admin/products" element={<ProductList/>} />
            <Route path="/admin/product/:id" element={ <UpdateProduct/> } />
            <Route path="/admin/orders" element={<OrderList/>} />
            <Route path="/admin/order/:id" element={<UpdateOrders/>} />
            <Route path="/admin/users" element={<UserList/>} />
            <Route path='/admin/reviews' element={<ProductReview />}/>


            {stripeApiKey &&

              <Route path="/order/payment" element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              } />
            }
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className="mt-14 font-bold  "

          />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App