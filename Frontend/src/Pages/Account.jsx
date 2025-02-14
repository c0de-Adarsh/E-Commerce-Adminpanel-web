import React from 'react'
import Metadata from '../Components/Metadata'
import { useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import { Link } from 'react-router'

const Account = () => {

    const {me,isLogin,loading} = useSelector(state=>state.user)
     console.log(me)
    const convertDateFormat = (inputDate) =>{
        try {
            const date = new Date(inputDate);
            return date.toLocaleDateString('en-GB'); 
        } catch (error) {
            return 'Invalid Date';
        }

        
    }


   
  return (
   <>
  
   <div className='min-h-screen pt-14'>
   <Metadata title='Profile'/>
    {
        
        loading && isLogin ? <Loader /> :
        <>
        
        {
            me === null ? null :

            <div>
                 <p className='pt-6 text-3xl font-medium pl-8'>My Profile</p>


                 <div className='flex md:justify-between justify-center pb-14 md:flex-row flex-col pt-2 w-full'>
                    <div className='md:w-1/2 w-full flex flex-col justify-center items-center'>
                        <div className='md:pb-12 pb-6 pt-2'>
                        <img src={me.avatar[0].url} className='h-72 w-72 rounded-full shadow-md shadow-gray-700' />
                        </div>


                        <Link to='/updateprofile' className='hover:bg-gray-700 bg-gray-800 w-1/2 text-white text-center py-2 font-semibold text-sm'>
                          Edit Profile
                        </Link>
                    </div>



                    <div className='flex flex-col pl-4 pt-12 gap-6 w-full '>



                        <div>
                            <p className='font-normal text-2xl'>Full Name</p>
                            <p className='text-gray-700 '>{me.name}</p>
                        </div>


                        <div>
                            <p className='font-normal text-2xl'>Email</p>
                            <p className='text-gray-700 '>{me.email}</p>
                        </div>
                       

                       <div >
                        <p className='font-normal text-2xl'>Joined On</p>
                        <p>{convertDateFormat(me.createdAt.substr(0,10))}</p>
                        </div>



                        <div  className=' flex flex-col gap-3 md:pt-12 pt-2 '>
                            <Link to="/orders" className='hover:bg-gray-700 bg-gray-800 w-1/2 text-white text-center py-2 font-semibold text-sm'>
                            My Orders
                            </Link>

                            <Link to="/updatePassword" className='hover:bg-gray-700 bg-gray-800 w-1/2 text-white text-center py-2 font-semibold text-sm'>
                             Change Password
                            </Link>
                        </div>
                    </div>
                 </div>
            </div>
        }
        </>
    }
   </div>
   </>
  )
}

export default Account