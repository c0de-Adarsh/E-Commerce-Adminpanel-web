import React from 'react'
import Metadata from '../Components/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import CheckOut from '../Components/CheckOut'

const Confirm = () => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { me } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

     const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}`
  return (
   <>
   <div className='min-h-screen pt-14 '>
   <Metadata title='Confirm order'/>
   <div className="pt-3"><CheckOut activeStep={1} /></div>



     <div className='flex md:flex-row flex-col md:pt-12 pt-6 pb-8 md:px-8 md:gap-0 gap-3'>
        <div className='md:w-2/3 px-3'>
            <div>
                <p className='text-2xl font-medium'>Shipping Info</p>
                <div className='pt-4 pl-14'>



                    <div className='grid grid-cols-2 md:w-2/5'>
                        <span className='font-semibold'>Name</span>
                        <span>{me?.name || 'N/A'}</span>
                    </div>


                    <div className='grid grid-cols-2 md:w-2/5'>
                        <span className='font-semibold'>Phone:</span>
                        <span>{shippingInfo.phoneNo}</span>
                    </div>



                    <div className='grid grid-cols-2 md:w-2/5'>
                        <span className='font-semibold'>Adress:</span>
                        <span>{address}</span>
                    </div>
                </div>






                <div className='pt-8'>
                    <p className='text-2xl font-medium'>Your Cart Items:</p>
                    {
                        cartItems.map((item ,index)=>(
                            <div key={index} className='flex justify-between md:pr-4 md:pl-20 pt-3'>
                                <div className='flex gap-6 w-2/3 items-center '>
                                    <img src={item.image} className='md:w-2/12 w-3/12' alt="" />
                                    <p>{item.name}</p>
                                </div>





                                <div className='w-2/3 text-right flex justify-end items-end'>
                                    {item.quantity} x <span  className='flex justify-center items-center'>₹{item.price}</span>
                                    <span className='font-semibold pl-1'>₹{item.quantity * item.price}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>







        <div className='md:w-1/3  px-4 py-3 '>
            <p className='text-center pb-2 text-2xl border font-medium border-x-0 border-t-0 border-gray-500'>Order Summary</p>
            <div className='pt-4 border border-x-0 border-t-0 border-gray-500 pb-4'>
                <div  className='flex justify-between'>
                    <span className='font-semibold'>Subtotal:</span>
                    <span>₹ {}</span>
                </div>



                <div className='flex justify-between pt-3'>
                    <span>GST:</span>
                    <span>₹ {}</span>
                </div>
            </div>




            <div >
                <div className='flex justify-between pt-3'>
                    <span  className='font-semibold'>Total:</span>
                    <span>₹{}</span>
                </div>
            </div>




            <div className='pt-4'>
                <button  className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 '>Proceed To Payment</button>
            </div>
        </div>
     </div>

   </div>
   </>
  )
}

export default Confirm