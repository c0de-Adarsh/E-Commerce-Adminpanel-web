import React from 'react'
import { Link } from 'react-router-dom'  // Make sure to use react-router-dom
import { Rating } from '@mui/material'
import { LiaRupeeSignSolid } from 'react-icons/lia'

const PProduct = ({product}) => {
 
  
  if (!product) return null
  
  return (
    <Link to={`/product/${product._id}`} className='block border p-3 shadow-md shadow-gray-300 hover:shadow-gray-500 hover:-translate-y-2 rounded'>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-center items-center h-48'>
          <img 
            src={product.images?.[0]?.url} 
            alt={product.name}
            className='max-h-full object-contain'
          />
        </div>
        <div className='md:text-xl text-lg'>{product.name}</div>
        <div className='flex flex-wrap justify-start items-center'>
          <Rating value={product.rating || 0} size='medium' readOnly />
          <span>({product.numOfReviews || 0} Reviews)</span>
        </div>
        <div className='flex justify-start items-center text-lg text-orange-600 font-bold'>
          <LiaRupeeSignSolid />
          <span>{product.price}</span>
        </div>
      </div>
    </Link>
  )
}

export default PProduct