import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { getAllProductsForAdmin } from '../Actions/productActions'
import { LuLayoutDashboard } from 'react-icons/lu'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { HiTemplate } from 'react-icons/hi'
import { AiOutlinePlus } from 'react-icons/ai'
import { getAllOrders } from '../Actions/orderActions'
import { FaRegComments, FaRegListAlt } from 'react-icons/fa'
import { PiUsersThreeLight } from 'react-icons/pi'
const SideBar = ({ sideToggle }) => {

    const dispatch = useDispatch()
    const [toggleTree, setToggleTree] = useState(false)
    return (
        <>
            <div className={`${sideToggle ? 'flex' : 'hidden'} flex-col z-10 fixed border-gray-400 min-h-screen px-12 bg-white shadow-xl shadow-gray-600 `}>
                <div className='flex justify-center items-center py-6 pt-12'>
                    <img src="/Images/online.png" alt="" />
                    <span className='text-xl font-bold'>ShopMart</span>
                </div>


                <div className='flex flex-col gap-10'>
                    <div className='flex items-center gap-2'>
                        <Link onClick={() => {
                            dispatch(getAllProductsForAdmin())
                            dispatch(getAllOrders())
                            dispatch(getAllUsers())
                        }} to='/dashboard' >
                            <div className='flex items-center gap-2 cursor-pointer'>
                                <LuLayoutDashboard />
                                <span className='text-lg font-bold'>Dashboard</span>
                            </div>
                        </Link>
                    </div>


                    <div className='flex flex-col gap-1'>
                        <div className=' items-center gap-2 flex'>
                            <div className='flex items-center gap-2 cursor-pointer' onClick={() => setToggleTree(!toggleTree)}>
                                {
                                    toggleTree ? <MdOutlineKeyboardArrowDown size={23} /> :
                                        <MdOutlineKeyboardArrowRight size={23} />
                                }
                                <span className='text-lg font-medium' >Products</span>
                            </div>
                        </div>


                        <div className={`px-8 pt-1 gap-3  flex-col ${toggleTree ? 'flex' : 'hidden'}`}>
                            <Link onClick={() => {
                                dispatch(getAllProductsForAdmin())
                            }} to='/admin/products'>
                                <div className='flex items-center gap-2 pt-1'>
                                    <HiTemplate />
                                    <span className='font-medium'>All</span>
                                </div>
                            </Link>



                            <Link>
                                <div className='flex items-center gap-2'>
                                    <Link to='/admin/newProduct'>
                                        <div className='flex items-center pt-1 gap-2'>
                                            <AiOutlinePlus />
                                            <span className='font-medium'>Create</span>
                                        </div>
                                    </Link>
                                </div>
                            </Link>
                        </div>
                    </div>



                    <div className='flex items-center gap-2'>

                        <Link onClick={() => {
                            dispatch(getAllOrders())
                        }} to='/admin/orders'>
                            <div className='flex items-center gap-2 cursor-pointer'>
                                <FaRegListAlt />
                                <span className='text-lg font-medium'>Orders</span>
                            </div>
                        </Link>
                    </div>


                    <div>
                        <Link to="/admin/users">
                            <div className='flex items-center gap-2 cursor-pointer'>
                                <PiUsersThreeLight size={20} />
                                <span className='text-lg font-medium'>Users</span>
                            </div>
                        </Link>
                    </div>


                    <div className="flex items-center gap-2">
                        <Link to="/admin/reviews">
                        <div className='flex items-center gap-2 cursor-pointer'>
                            <FaRegComments />
                            <span className='text-lg font-medium'>Reviews</span>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar