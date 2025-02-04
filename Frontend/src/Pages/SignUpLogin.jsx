import React, { useState } from 'react'
import Metadata from '../Components/Metadata'
import {ToastContainer} from 'react-toastify'
import { AiOutlineMail } from 'react-icons/ai'

const SignUpLogin = () => {

    const [name , setName] = useState('Login')

    const [loginPassword , setLoginPassword] = useState('')
    const [loginEmail , setLoginEmail] = useState('')
    return (
        <>
            <Metadata title={name} />
            <div className='min-h-screen bg-gray-100 pt-14 flex justify-center'>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    className="mt-14 font-bold"
                />





                <div className='pt-10 flex-col flex md:w-1/3 w-full md:px-0 px-4 pb-28 h-90  justify-center'>
                    <div className='bg-white rounded-md shadow-md shadow-gray-400 w-full h-[70vh]'>


                        
                        <div className='flex justify-around'>
                            <div>
                                Login
                            </div>
                            <div>
                                SignUp
                            </div>
                        </div>




                        {/* login */}
                        <div className='pt-8'>
                         <form action="" className='flex flex-col pt-8 gap-5 px-8'>
                            <div className='pl-3 border border-gray-500 py-1 flex items-center justify-around'>
                                <AiOutlineMail className='text-gray-500' size={26} />
                                <input type="text" placeholder='Enter Your Email' className=' outline-none'/>
                            </div>
                            <div>
                                <input type="text" placeholder='Enter Your Password' />
                            </div>
                            <input type="submit" value="Login" className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium hover:bg-blue-500 rounded' />
                         </form>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpLogin