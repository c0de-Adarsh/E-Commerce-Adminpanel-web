import React from 'react'
import Search from './Search'
import { Link as LinkSr } from 'react-scroll'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'
const HomeHeader = ({products}) => {
  return (
   <>
   <div className='min-h-screen pt-16 bg-gradient-to-br from-blue-800 to-blue-950'>
    <div className='flex justify-center items-center flex-col text-center md:px-0 px-4'>
        <p className='text-2xl text-white font-bold pt-16'>Welcome to ShopMart</p>
        <p className='text-4xl pt-16 pb-8 md:text-5xl text-white font-bold'>Explore Incredible Products Below</p>
        <Search products={products}/>

        <LinkSr spy={true} smooth={true} offset={30} duration={300} to='products'>
        
         <button className='bg-blue-600 text-white hover:bg-blue-800 z-10 mt-4 md:mt-4 font-bold text-xl border md:px-12 px-8 py-2'>
          <MdOutlineKeyboardArrowDown className='animate-bounce z-10'/>
         </button>
        </LinkSr>
    </div>
   </div>
   </>
  )
}

export default HomeHeader