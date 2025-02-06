// import React, { useState } from 'react';
// import { User, LayoutDashboard, ShoppingCart, LogOut } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
// import { setIsLoginFalse } from '../Slice/UserSlice';

// const MenuBar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { me } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logOut = () => {
//     toast.success("Logout Successful !");
//     localStorage.removeItem('token')
//     dispatch(setIsLoginFalse())
//     navigate('/')
// }

  
//   const handleDashboardClick = () => {
//     dispatch(getAllProductsForAdmin());
//     dispatch(getAllOrders());
//     dispatch(getAllUsers());
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="cursor-pointer"
//       >
//         {me?.avtar?.[0]?.url ? (
//           <img 
//             src={me.avtar[0].url} 
//             alt="Profile" 
//             className="h-8 w-8 rounded-full object-cover"
//           />
//         ) : (
//           <img 
//             src="/Images/avatar.png" 
//             alt="Default Avatar"
//             className="h-8 w-7 rounded-full object-cover " 
//           />
//         )}
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-[10px] w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//           <div className="py-1">
//             <a
//               href="/account"
//               className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               <User className="mr-3 h-4 w-4" />
//               My Account
//             </a>

//             {me?.role === "admin" && (
//               <a
//                 href="/dashboard"
//                 onClick={handleDashboardClick}
//                 className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 <LayoutDashboard className="mr-3 h-4 w-4" />
//                 Dashboard
//               </a>
//             )}

//             <a
//               href="/orders"
//               className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             >
//               <ShoppingCart className="mr-3 h-4 w-4" />
//               My Orders
//             </a>

//             <div className="border-t border-gray-200" />

//             <button
//               onClick={logOut}
//               className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//             >
//               <LogOut className="mr-3 h-4 w-4" />
//               Log Out
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuBar;

import { Menu, Button, Text } from '@mantine/core';
import { RiLogoutCircleRLine } from 'react-icons/ri'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoginFalse } from '../Slice/UserSlice'
import { BsCartCheck } from 'react-icons/bs'
import { FaRegUserCircle } from 'react-icons/fa'
import { LuLayoutDashboard } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { removeAllWhenLogout } from '../Action/cartAction'
// import { getAllProductsForAdmin } from '../actions/productAction'
// import { getAllOrders } from '../actions/orderAction'
// import { getAllUsers } from '../actions/userAction'


 const MenuBar = () => {

    const { me } = useSelector((state) => state.user)

    
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const logOut = () => {
        toast.success("Logout Successful !");
        localStorage.removeItem('token')
        dispatch(removeAllWhenLogout())
        dispatch(setIsLoginFalse())
        navigate('/')
    }




    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <div className='cursor-pointer'>
                    {me !== null ? <img src={me.avtar[0].url} alt="/images/avatar.png" className='h-8 w-8 rounded-full' /> :
                        <img src="/images/avatar.png" className='h-8 w-8 rounded-full' />
                    }
                </div>
            </Menu.Target>  

            

            <Menu.Dropdown>




                <Link to="/account"> <Menu.Item icon={<FaRegUserCircle />} > 
                    My account
                </Menu.Item></Link>
                {me && me.role === "admin" ? (
                    <Link onClick={()=>{
                        dispatch(getAllProductsForAdmin())
                        dispatch(getAllOrders())
                        dispatch(getAllUsers())
                    }} to="/dashboard">
                        <Menu.Item icon={<LuLayoutDashboard />}>Dashboard</Menu.Item>
                    </Link>
                ) : null}

                <Link to="/orders"> <Menu.Item icon={<BsCartCheck />} >My orders</Menu.Item> </Link>

                <Menu.Divider />

                <Menu.Item color="red " onClick={() => logOut()} icon={<RiLogoutCircleRLine />} className='font-semibold' >Log out</Menu.Item>

            </Menu.Dropdown>
        </Menu>
    );
}

export default MenuBar