import React from 'react'
import Metadata from '../Components/Metadata'
import {useDispatch, useSelector} from 'react-redux'
import CartCard from '../Components/CartCard'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { Link } from 'react-router'

const Cart = () => {
  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cart)
  const { isLogin } = useSelector((state) => state.user)

  console.log(cartItems)
  return (
  <>
  <Metadata title='Mycart'/>
  <div className='min-h-screen  pt-14'>
  

  {

    cartItems.length !== 0 ? 
    (
      <>
      <div className='w-full bg-blue-600 font-medium text-white grid grid-cols-3  text-center py-2 '>
        <div className=''>Product</div>
        <div className='border-x border-gray-300' >Quantity</div>
        <div>Subtotal</div>
        
      </div>




      <div className='grid grid-cols-1 gap-3 pt-3 pb-16'>
        {cartItems.map((item,i)=>(
          <div key={i} className='grid grid-cols-3 justify-items-end md:justify-items-center md:px-0 px-4 gap-2 py-2'>
           <CartCard item={item} />
            
            <div>
           <div className=' justify-center pt-10 items-center'>
            <div>
              <button  className='md:px-3 px-2   font-bold text-xl hover:bg-indigo-700 bg-indigo-900 text-white'>-</button>
              <input type=""  className='text-center outline-none font-bold md:w-14 w-10 cursor-default '/>
              <button className='md:px-3 px-2   font-bold text-xl bg-indigo-900 text-white hover:bg-indigo-700'>+</button>
            </div>
           </div>
          </div>





          <div className='flex justify-center items-start  pt-10 font-medium text-xl'>
            <div className='flex justify-start items-center'><span><LiaRupeeSignSolid/></span>
            
            <span>{item.quantity * item.price}</span>



            </div>
          
            </div>
          </div>


         
        ))}


        <div className='flex justify-end md:pr-14 pr-6 pb-12'>
          <span className='text-2xl font-sans border-t border-blue-600 pt-3 pl-12'>
            Gross Total
          </span>
        </div>



        <div className=' flex justify-around '>
          <button className='bg-red-500 hover:bg-red-600 text-white md:py-2 py-1 text-lg font-medium md:px-10 px-3 '></button>
          <button className='bg-blue-500 text-white md:py-2 py-1 font-medium md:px-12 px-4 text-lg hover:bg-blue-600'></button>
        </div>
      </div>
      </>
    )
    :
    (
     <div text-center flex flex-col justify-center items-center pt-16 font-medium md:text-3xl text-2xl>
      <img src=""  className=' w-56 md:w-64 md:h-64 h-56 ' alt="" />
      <div className='pt-6'>
        <Link to='/products' className='text-white px-8 text-lg py-2 rounded hover:bg-gray-700 bg-gray-800'></Link>
      </div>
     </div>
    )
  }
  </div>
  </>
  )
}

export default Cart