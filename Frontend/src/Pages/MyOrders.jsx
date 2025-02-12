import React, { useEffect } from 'react'
import Metadata from '../Components/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders as Myorders } from '../Actions/orderActions'
import Loader from '../Components/Loader'
import OrderTable from '../Components/OrderTable'
import { Link } from 'react-router'
const MyOrders = () => {

    const dispatch = useDispatch()
    const { loading, myOrders } = useSelector(state => state.newOrder)
    const { me } = useSelector(state => state.user)


    useEffect(() => {
        dispatch(Myorders)
    }, [dispatch])
    return (
        <>
            <Metadata title='My Orders' />
            <div className='min-h-screen pt-14'>
                {
                    (loading || me === null) ?
                        (<Loader />) :

                        (
                            <>


                                <div >
                                    <p className="text-center py-2 pt-3 text-white font-medium text-xl bg-gray-800">{me.name}'s Orders</p>
                                    <div>


                                        {
                                            myOrders.length !== 0 ?

                                                <OrderTable orders={myOrders} /> :

                                                <div className='flex flex-col text-center items-center justify-center pt-12'>
                                                    <img src="/Images/out.webp" className='md:w-44 md:h-44 w-36 h-36' alt="" />
                                                    <div className='px-3 md:px-0'>
                                                        <p className='md:text-2xl text-xl pt-2  font-medium text-gray-800'>You don't have any orders yet. Why not buy one?</p>
                                                    </div>
                                                    <div className='pt-6'>
                                                        <Link to="/products">
                                                            <button className='bg-gray-800 hover:bg-gray-700 font-medium rounded text-white px-8 py-1'>Shop Now</button></Link>
                                                    </div>
                                                </div>
                                        }



                                    </div>
                                </div>

                            </>
                        )}
            </div>
        </>
    )
}

export default MyOrders