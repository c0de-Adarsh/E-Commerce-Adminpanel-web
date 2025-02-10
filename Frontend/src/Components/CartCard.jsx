import React from 'react'
import { useDispatch } from 'react-redux'
import {removeItemsFromCart} from '../Actions/cartActions'

const CartCard = ({item}) => {

    const dispatch = useDispatch()

    const RemoveItem = (id) =>{
      dispatch(removeItemsFromCart(id))
    }
  return (
    <>
    <div className='grid md:grid-cols-2 gap-3'>
        <div className='flex items-center'>
            <img src={item.image} alt="" className='md:h-36 h-28 md:w-36 w-28' />
        </div>
        <div className='flex flex-col gap-1 md:pt-4'>
            <p className='text-xl font-serif'>{item.name}</p>
            <p className='font-serif'>Price: ₹ {item.price}</p>
            <span onClick={() => RemoveItem(item.product)} className='text-red-700 font-serifcursor-pointer cursor-pointer hover:text-red-800'>Remove</span>
        </div>
    </div>
    </>
  )
}

export default CartCard