import React, { useState } from 'react'
import { Link } from 'react-router'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {MdAccountBox} from 'react-icons/md'
import {FaBars} from 'react-icons/fa'
import {RxCross1} from 'react-icons/rx'
import { isLogin } from '../Actions/userActions'
import MenuBar from './MenuBar'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoginFalse } from '../Slice/UserSlice'
const NavBar = () => {


   const {isLogin} = useSelector(state=> state.user)
    const [toggle , setToggle] = useState(true)

    const dispatch = useDispatch()
  

    const logOut = () => {
      localStorage.removeItem('token')
      dispatch(setIsLoginFalse())
      dispatch(setLogoutNotifyTrue())
      navigate('/')
 }


  return (
   <>
   <div className='min-w-full fixed z-10 '>
     
     <div className='bg-blue-950 text-white flex justify-between md:gap-12 gap-6 py-3 md:px-6 px-2'>
     <Link to='/' className='md:text-2xl font-bold flex gap-1 text-lg'>
     <img src="/online.png" className='md:h-8 h-7' alt="" />ShopMart
     </Link>





     <ul className='md:flex hidden text-xl justify-center items-center gap-12 pr-8'>
        <Link className='hover:text-orange-400' to='/'>Home</Link>
        <Link className='hover:text-orange-400' to='/products'>Products</Link>
        <Link className='hover:text-orange-400' to='/contact'>Contact</Link>
        <Link className='hover:text-orange-400' to='/about'>About</Link>
     </ul>





     <ul className='flex md:gap-8 gap-8 md:pr-9 pr-1 justify-center items-center'>
        <Link to='/cart'><AiOutlineShoppingCart  size={25}/></Link>




       {
         isLogin ?

         <MenuBar />
         :
         <Link to="/auth"  > <MdAccountBox size={25} /> </Link>
       }
     </ul>



    
    {/* //responsiveness   */}

    <div className='md:hidden flex justify-center items-center cursor-pointer border px-1 mr-1 rounded-md'>
     {
        toggle ? <FaBars onClick={()=> setToggle(!toggle)} size={23}/>
        :
        <RxCross1 onClick={()=> setToggle(!toggle)} size={23}/>
     }
    </div>
     </div>
   </div>






   <div className={`${toggle ? 'hidden': 'flex'} md:hidden fixed top-12 nav`}>
    <div className='bg-blue-950 w-screen h-screen bg-opacity-95 pt-24 '>
        <ul className='text-white flex gap-24 flex-col justify-center items-center'>
        <Link className='hover:text-orange-400' to='/'>Home</Link>
        <Link className='hover:text-orange-400' to='/products'>Product</Link>
        <Link className='hover:text-orange-400' to='/contact'>Contact</Link>
        <Link className='hover:text-orange-400' to='/about'>About</Link>
        </ul>
    </div>
   </div>
   </>
  )
}

export default NavBar