import React from 'react'
import Loader from './Loader'
import PProduct from './PProduct'
import { Link } from 'react-scroll'

const Products = ({products,loading}) => {
  return (
   <>
   <div id='products' className='min-h-screen md:px-20 px-4 pt-4 pb-12 md:pb-20 md:pt-8'>
    {
        loading ? <Loader /> :
        <>
        <div className='flex justify-center'>
          <span className='md:text-3xl border-b border-gray-600  px-12 text-gray-700 text-2xl  pb-2 text-center font-semibold'>Featured Products</span>
        </div>

        <div>
          {
            products && products.map((product,i)=>{
             <PProduct key={i} product={product} />
            })
          }
        </div>
        <div className='flex justify-center items-center pt-12'>
          <Link to='/products' className='bg-blue-500 hover:bg-blue-600 px-8 py-2 md:text-xl text-lg font-medium text-white'><button>View More</button></Link>
        </div>
        </>
    } 
   </div>
   </>
  )
}

export default Products