import React from 'react'
import { Link } from 'react-scroll'
import {Rating} from '@mui/material'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import ReactStars from 'react-rating-stars-component'
const PProduct = ({product}) => {
  return (
    <>
    <Link to={`product/${product._id}`} className='border p-3 shadow-md shadow-gray-300 hover:shadow-gray-500 hover:-translate-y-2 rounded' >
    <div className='flex flex-col gap-1'>
     <div className='md:text-xl text-lg'>{product.name}</div>
     <div className='flex flex-wrap justify-start items-center'> <Rating value={product.rating} size='medium' readOnly  /><span>{product.numOfReviews}Reviews</span> </div>
     <div className='flex justify-start items-center text-lg text-orange-600 font-bold'>
     <span><LiaRupeeSignSolid /></span>
     <span>{product.price}</span>
     </div>
    </div>
    </Link>
    </>
  )
}

export default PProduct