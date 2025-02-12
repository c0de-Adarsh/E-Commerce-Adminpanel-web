import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import Metadata from '../Components/Metadata'
import CheckOut from '../Components/CheckOut'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { BsCalendarEvent } from 'react-icons/bs'
import { MdOutlineVpnKey } from 'react-icons/md'
import API from '../Utils'
import { elements } from 'chart.js'
import { createOrder } from '../Actions/orderActions'
import { removeAllItems } from '../Slice/CartSlice'
import { toast } from 'react-toastify'

const Payment = () => {

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
  const { shippingInfo, cartItems } = useSelector(state => state.cart)
  const { me } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stripe = useStripe()
  const payButton = useRef(null)
  const elements = useElements()



  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  }

  const order = {
    shippingInfo: {
      ...shippingInfo,
      pinCode: parseInt(shippingInfo.pinCode) || 0  // String ko Number me convert
    },
    orderItems: cartItems,
    itemPrice: orderInfo.shippingCharges, 
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.totalPrice,
    totalPrice: orderInfo.totalPrice
  }

  const paymentSubmitHandler = async (e) => {
    e.preventDefault()

    payButton.current.disabled = true

    try {


      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      const { data } = await axios.post(`${API}/payment/process`,paymentData, config)
     
      const client_secret = data.client_secret;
      
     
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: me.name,
            email: me.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            }
          }
        }
      })

      if (result.error) {
        payButton.current.disabled = false;
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }
          dispatch(createOrder(order))
          navigate("/success")
          localStorage.removeItem('cartItems');
          dispatch(removeAllItems())
        } else{
          toast.error("There's some issue while processing payment")
        }
      }
    } catch (error) {
      payButton.current.disabled = true
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

 
  return (
    <>
      <Metadata title='Payment' />
      <div className='min-h-screen pt-14'>
        <div className='pt-3'>
          <CheckOut activeStep={2} />
        </div>



        <div className='grid md:justify-items-center pt-6 px-6'>
          <form action="" onSubmit={paymentSubmitHandler} className='border flex flex-col rounded-md shadow-md shadow-gray-400 gap-5 py-3 pb-10 bg-white px-8 md:w-1/3'>
            <p className='text-center text-2xl font-medium py-2'>Card Information</p>



            <div className='border rounded border-gray-500 py-1 pl-3 flex justify-around items-center relative'>
              <AiOutlineCreditCard />
              <CardNumberElement className='w-full py-1 pr-4 pl-4 outline-none' />
            </div>





            <div className='border rounded border-gray-500 py-1 pl-3 flex justify-around items-center relative'>
              <BsCalendarEvent />
              <CardExpiryElement className='w-full py-1 pr-4 pl-4 outline-none' />
            </div>



            <div className='border rounded border-gray-500 py-1 pl-3 flex justify-around items-center relative'>
              <MdOutlineVpnKey />
              <CardCvcElement className='w-full py-1 pr-4 pl-4 outline-none' />
            </div>


            <input type="submit" value={`Pay - ${orderInfo && orderInfo.totalPrice} ₹`} ref={payButton} className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500' />
          </form>
        </div>
      </div>
    </>
  )
}

export default Payment