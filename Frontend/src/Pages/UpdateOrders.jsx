import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getOrderDetails, updateOrder } from '../Actions/orderActions'
import Metadata from '../Components/Metadata'
import Loader from '../Components/Loader'
import { BiMenuAltLeft } from 'react-icons/bi'
import SideBar from '../Components/SideBar'
import { MdOutlineCategory } from 'react-icons/md'

const UpdateOrders = () => {

    const { id } = useParams()
    const [sideToggle, setSideToggle] = useState(false)
    const dispatch = useDispatch()

    const { orderDetails, loading } = useSelector(state => state.newOrder)
    const [category, setCategory] = useState(orderDetails.orderStatus)


    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [dispatch])

    let address = ""
    if (orderDetails !== null) {
        address = `${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.state}, ${orderDetails.shippingInfo.pinCode}`
    }

    const updateOrderAdmin = () => {

        const data = {
            status: category
        }
        dispatch(updateOrder(id, data))
    }
    return (
        <>
            <Metadata title='Update Order' />
            <div className='min-h-screen pt-14'>

                {
                    loading ? <Loader /> :

                        <>
                            <span className=' cursor-pointer fixed z-20 ' onClick={() => setSideToggle(!sideToggle)}>
                                <BiMenuAltLeft size={44} />
                            </span>
                            <SideBar sideToggle={sideToggle} />



                            <div className='flex md:flex-row flex-col md:pt-12 pt-12 pb-8 md:px-8 px-2 md:gap-0 gap-3'>
                                <div className='md:w-2/3 px-3 '>
                                    <div>
                                        <p className='text-2xl font-medium'>Shipping Info</p>
                                    </div>



                                    <div className='md:pl-14 pt-4'>
                                        <div className='grid grid-cols-2 md:w-2/5'>
                                            <span className='font-semibold'>Name:</span>
                                            <span>{orderDetails.user.name && orderDetails.user.name}</span>
                                        </div>


                                        <div className='grid grid-cols-2 md:w-2/5'>
                                            <span className='font-semibold'>Phone:</span>
                                            <span>{orderDetails.shippingInfo.phoneNo && orderDetails.shippingInfo.phoneNo}</span>
                                        </div>



                                        <div className='grid grid-cols-2 md:w-2/5 pb-3'>
                                            <span className='font-semibold'>Address:</span>
                                            <span>{address}</span>
                                        </div>
                                    </div>
                                         



                                    <p className='text-2xl font-medium'>Payment</p>
                <div className='md:pl-14 pt-4'>
                  {orderDetails.paymentInfo.status && orderDetails.paymentInfo.status ? <p className='text-2xl text-green-500 underline'>Paid</p> : <p className='text-2xl text-red-500 underline' >Not Paid</p>}
                  <div className='grid grid-cols-2 md:w-2/5 pt-3 pb-3 '>
                    <span className='font-semibold'>Amount:</span>
                    <span>₹{orderDetails.totalPrice && orderDetails.totalPrice}</span>
                  </div>
                </div>


                <p className='text-2xl font-medium'>Order Status</p>
                <div className='md:pl-14 pt-4'>
                  <p className={`${orderDetails.orderStatus && orderDetails.orderStatus === "Processing" ? "text-blue-600" : "text-green-600"} text-xl`} >{orderDetails.orderStatus && orderDetails.orderStatus}</p>
                </div>



                                    <div className='pt-8'>
                                        <p className='text-2xl font-medium'>Order Items:</p>
                                        {
                                            orderDetails.orderItems.map((item, index) => (
                                                <div key={index} className='flex justify-between md:pr-4 md:pl-20 pt-3'>
                                                    <div className='flex gap-6 items-center w-2/3'>
                                                        <img src={item.image} className='md:w-2/12 w-3/12' alt="" />
                                                        <p>{item.name}</p>
                                                    </div>


                                                    <div className='w-2/3 text-right flex justify-center items-center'>
                                                        <p>{item.quantity}  x  ₹ {item.price} =
                                                            <span className='font-semibold pl-1'>{item.quantity * item.price}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>






                            <div className='md:w-1/3  px-4 py-3 '>
                                <p className='text-center pb-4 text-2xl  font-medium border-gray-500'>Process Orders</p>
                                <div className='pt-4 border rounded-md  px-3 border-gray-500 pb-4'>


                                    <div className='relative pl-3 rounded  py-1 flex justify-around items-center pr-3'>
                                        <MdOutlineCategory className='text-gray-500 ' size={26} />

                                        <select name=""  onChange={(e) => setCategory(e.target.value)} value={category} id="" className='w-full pl-4 outline-none py-1 pr-6 bg-white cursor-pointer '>
                                            <option value="not selected">Select Status</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                </div>




                                  
                                  <div className=' pt-4'>
                                    <button onClick={()=> updateOrderAdmin()}  className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 '>Change Status</button>
                                  </div>


                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default UpdateOrders