import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../Actions/userActions'
import Metadata from '../Components/Metadata'
import { BiMenuAltLeft } from 'react-icons/bi'
import SideBar from '../Components/SideBar'
import Loader from '../Components/Loader'
import AdminUsersTable from '../Components/AdminUsersTable'

const UserList = () => {

    const dispatch = useDispatch()

    const {allUsers , loading} = useSelector(state=> state.user)

    const [sideToggle , setSideToggle] = useState(false)

    useEffect(()=>{
        dispatch(getAllUsers()) ;
        console.log(allUsers)
    },[])

  return (
   <>
   <Metadata title='All users'/>
   <div className='min-h-screen pt-14'>
  <span onClick={()=> setSideToggle(!sideToggle)} className=' cursor-pointer fixed z-20'>
  <BiMenuAltLeft size={44} />
  </span>
  <SideBar sideToggle={sideToggle}/>


  {
    loading || allUsers.length === 0 ? <Loader /> :
    <>
    <div className='text-center text-2xl font-medium py-4'>
       <p>All Users</p>
    </div>

    <AdminUsersTable users={allUsers}/>
    </>
  }
   </div>
   </>
  )
}

export default UserList