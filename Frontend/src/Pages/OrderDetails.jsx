import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { getOrderDetails } from '../Actions/orderActions'
import  Loader  from '../Components/Loader'
import  MetaData  from '../Components/Metadata'

 const OrderDetails = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const { orderDetails, loading } = useSelector(state => state.newOrder)






  useEffect(() => {
    if (orderDetails && orderDetails._id !== id) {
      dispatch(getOrderDetails(id))
     
    }
  }, [dispatch,id,orderDetails])

  const convertDateFormat = (inputDate) => {
    const parts = inputDate.split('-');
    if (parts.length !== 3) {
      return "Invalid date format";
    }

    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    return `${day}-${month}-${year}`;
  }


  return (
    <>
      <MetaData title="Order Details" />
      <div className='min-h-screen pt-14'>

        {
          loading ? <Loader /> :

            <>

              
                 <div className='   '>
                <div className='bg-blue-800 md:py-4 py-2 px-4 md:px-8'>
                  <p className=' md:text-2xl text-xl text-white  '>Order #{orderDetails._id}</p>
                </div>
                <div className='pt-4 md:px-8 px-4'>
                  <p className='text-2xl'>Shipping Info</p>
                  <div className='pt-4'>
                    <ul>
                      <li><span className='font-medium'>Name: </span>   {orderDetails.user.name}</li>
                      <li><span className='font-medium' >Phone: </span> {orderDetails.shippingInfo.phoneNo}</li>
                      <li> <span className='font-medium'>Address: </span>  {orderDetails.shippingInfo.address}, {orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.state}, {orderDetails.shippingInfo.pinCode}, {orderDetails.shippingInfo.country}</li>
                    </ul>
                  </div>

                  <div className='pt-4 md:px-0 px-0'>
                    <p className='text-2xl'>Payment Info</p>
                    <ul className='pt-2'>
                      <li><span className='font-medium text-xl underline text-green-500 '>PAID</span></li>
                      <li><span className='font-medium py-1' >Amount: </span> &nbsp;₹{orderDetails.totalPrice}</li>
                      <li><span className='font-medium py-1' >Paid At: </span>&nbsp; {convertDateFormat(orderDetails.paidAt.substr(0, 10))}</li>
                    </ul>
                  </div>
                  <div className='pt-6 pb-4 md:px-0 '>
                    <p className='text-2xl'>Order Status</p>
                    <ul className='pt-2'>
                      <li><span className={`font-medium text-xl ${orderDetails.orderStatus === "Processing"?"text-blue-500":"text-green-500"} `} >{orderDetails.orderStatus}</span> </li>
                    </ul>
                  </div>

                </div>
                <div className='border-t border-gray-700 pt-4 md:px-8 px-4'>
                  <p className='md:text-xl text-xl'>Order Items</p>
                </div>
                <div className='grid grid-cols-1 gap-5 pt-4 pb-8 md:px-8 px-4'>
                  {
                    orderDetails.orderItems.map((item) => (
                      <div key={item.name} className='grid grid-cols-2 '>
                        <div className='flex flex-row gap-5 items-center'>
                          <img src={item.image} className='md:w-28 md:h-28 w-20 h-20 ' alt="" />
                          <p>{item.name}</p>
                        </div>
                        <div className='flex md:hidden justify-center items-center'>
                          <p> {item.quantity} X ₹{item.price} = <span className='font-medium'>₹ &nbsp; {item.quantity * item.price}</span></p>
                        </div>
                        <div className='hidden md:flex
                         justify-center items-center'>
                          <p> {item.quantity} X ₹{item.price} = <span className='font-medium'>₹ {item.quantity * item.price}</span></p>
                        </div>

                      </div>


                    ))
                  }
                </div>

              </div> 
                
            </>

        }
      </div>


    </>
  )
}

export default OrderDetails