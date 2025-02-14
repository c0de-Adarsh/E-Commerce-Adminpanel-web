import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Metadata from '../Components/Metadata'
import { Doughnut, Line } from 'react-chartjs-2';
import { BiMenuAltLeft } from 'react-icons/bi'
import SideBar from '../Components/SideBar'

import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import Loader from '../Components/Loader'
import { getAllProductsForAdmin } from '../Actions/productActions'
import { getAllOrders } from '../Actions/orderActions'
import { getAllUsers } from '../Actions/userActions'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title,
  Tooltip,
  Legend, ArcElement);
const Dashboard = () => {

  const { me } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { adminProducts } = useSelector(state => state.products)
  const { allOrders } = useSelector(state => state.newOrder)
  const { allUsers } = useSelector(state => state.user)

  const [sideToggle, setSideToggle] = useState(false)
  
  let outOfStock = 0 ;

  adminProducts && adminProducts.forEach(item => {
    if(item.stock === 0){
      outOfStock += 1 ;
    }
  });

  useEffect(()=>{
    dispatch(getAllProductsForAdmin())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
},[dispatch])

let totalAmount = 0 ;
allOrders && allOrders.forEach(item => [
  totalAmount += item.totalPrice
])

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49"],
        data: [0, totalAmount]
      }
    ]
  }
  


  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, adminProducts.length - outOfStock],
      },

    ]
  }


  if (me !== null) {
    if (me.role !== "admin") {
      navigate("/");
     
    }
  }

  return (
    <>

      <div className='min-h-screen pt-14'>
        <Metadata title='Dashboard' />

        {me ? <>
          <div className='flex justify-start'>
            <span onClick={() => setSideToggle(!sideToggle)} className='cursor-pointer text-blue-900 z-20 fixed'>
              <BiMenuAltLeft size={44} />
            </span>

            <SideBar sideToggle={sideToggle} />

            <div className='w-full'>
              <div className='py-6'>
                <p className='text-3xl text-center font-semibold'>Dashboard</p>
              </div>



              <div className='flex flex-col text-center font-medium py-3 text-white bg-blue-700'>
                <p className='text-lg'>Total Revenue</p>
                <div><span>₹ &nbsp; </span> <span className='text-lg' > {Math.floor(totalAmount)}</span></div>
              </div>


              <div className='grid md:grid-cols-3 grid-cols-1 text-lg font-medium md:gap-0  gap-3 justify-items-center md:px-64 py-6'>
                <div className='bg-red-500 rounded-full font-medium flex justify-center items-center text-white w-40 h-40'>
                  <div className='flex-col flex justify-center items-center'>
                    <p>Products</p>
                    <p>{adminProducts && adminProducts.length}</p>
                  </div>
                </div>


                <div className='bg-purple-500 rounded-full font-medium flex justify-center items-center text-white w-40 h-40'> 
                  <div className='flex-col flex justify-center items-center'>
                    <p>Orders</p>
                    <p>{allOrders && allOrders.length}</p>
                  </div>
                </div>


                <div className='bg-gray-700 rounded-full font-medium flex justify-center items-center text-white w-40 h-40'>
                  <div className='flex flex-col justify-center items-center'> 
                    <p>Users</p>
                    <p>{allUsers && allUsers.length}</p>
                  </div>
                </div>

              </div>





              <div className='flex justify-center w-full'>
                <div className='md:mx-auto mx-3 md:w-[70vw] w-full py-5 '>
                <Line data={lineState} />
                </div>
              </div>


              <div className='pb-14'>
                <div className='mx-auto  md:w-[30vw] w-[90vw] py-5 '>
                <Doughnut data={doughnutState} />
                </div>
              </div>



            </div>
          </div>
        </> :
          <Loader />
        }

      </div>
    </>
  )
}

export default Dashboard