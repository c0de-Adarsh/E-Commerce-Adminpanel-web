import React, { useEffect, useState } from 'react'
import Metadata from '../Components/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../Actions/orderActions'
import { BiMenuAltLeft } from 'react-icons/bi'
import SideBar from '../Components/SideBar'
import Loader from '../Components/Loader'
import AdminOrdersTable from '../Components/AdminOrdersTable'


const OrderList = () => {

    const dispatch = useDispatch()

    const {allOrders , loading} = useSelector(state=> state.newOrder)

    const [sideToggle , setSideToggle] = useState(false)

    useEffect(() => {
        dispatch(getAllOrders())
      }, [])
    
  return (
    <>
    <Metadata  title='All orders'/>
    <div className='min-h-screen pt-14'>
    <span className='cursor-pointer  z-20 fixed ' onClick={()=> setSideToggle(!sideToggle)}>
    <BiMenuAltLeft size={44} />
    </span>
    <SideBar sideToggle={sideToggle}/>

    {
        loading || allOrders.length === 0 ? <Loader /> :

        <>
         <div className='text-center py-4 text-2xl font-medium'>
                <p>All Orders</p>
              </div>

              <AdminOrdersTable orders={allOrders}/>
        </>
    }
    </div>
    </>
  )
}

export default OrderList