import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Metadata from '../Components/Metadata'
import { Loader } from 'lucide-react'
import { BiMenuAltLeft } from 'react-icons/bi'
import SideBar from '../Components/SideBar'
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
const Dashboard = () => {

  const { me } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { adminProducts } = useSelector(state => state.products)
  const { allOrders } = useSelector(state => state.newOrder)
  const { allUsers } = useSelector(state => state.user)

  const [sideToggle, setSideToggle] = useState(false)
  

  
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
                <div><span>₹ &nbsp; </span> <span className='text-lg' > {Math.floor()}</span></div>
              </div>


              <div className='grid md:grid-cols-3 grid-cols-1 text-lg font-medium md:gap-0  gap-3 justify-items-center md:px-64 py-6'>
                <div className='bg-red-500 rounded-full font-medium flex justify-center items-center text-white w-40 h-40'>
                  <div className='flex-col flex justify-center items-center'>
                    <p>Products</p>
                  </div>
                </div>


                <div className='bg-purple-500 rounded-full font-medium flex justify-center items-center text-white w-40 h-40'> 
                  <div className='flex-col flex justify-center items-center'>
                    <p>Orders</p>
                  </div>
                </div>


                <div className='bg-gray-700 rounded-full font-medium flex justify-center items-center text-white w-40 h-40'>
                  <div className='flex flex-col justify-center items-center'> 
                    <p>Users</p>
                  </div>
                </div>

              </div>





              <div className='flex justify-center w-full'>
                <div>
                  
                </div>
              </div>


              <div className='pb-14'>
                <div className='mx-auto  md:w-[30vw] w-[90vw] py-5 '>
                
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