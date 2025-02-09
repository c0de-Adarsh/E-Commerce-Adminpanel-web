import React from 'react'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router'

const Product = ({products}) => {
console.log('helo',products)
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true,
      }
    return (
        <>
            <Link to={`/product/${product._id}`}>
                <div className='rounded hover:shadow-md hover:shadow-gray-300 hover:translate-y-1  border '>
             

               <div className='flex justify-center items-center'>
              <img src={product.images[0].url}  className='object-cover p-4 w-full h-90' alt={product.name}  />
               </div>




               <div className='px-3'>
            <p className='md:text-xl text-lg '>{product.name}</p>
            <div className='flex z-0 flex-wrap items-center gap-2' >
              <ReactStars {...options} /> <span className='md:text-sm text-xs'>({product.numOfReviews} Reviews)</span>
            </div>
            <div className='flex items-center'>
              <span className='text-lg text-orange-600 font-bold'> <LiaRupeeSignSolid/> </span>
              <span className='text-lg text-orange-600 font-bold'>{`${product.price}`}</span></div>
          </div>



                </div>
            </Link>

        </>
    )
}

export default Product