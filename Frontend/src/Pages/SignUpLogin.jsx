import React, { useState } from 'react'
import Metadata from '../Components/Metadata'
import {ToastContainer} from 'react-toastify'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai'
import { MdOutlineAccountCircle } from "react-icons/md";
import {useDispatch, useSelector} from 'react-redux'
import { login, register } from '../Actions/userActions';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
const SignUpLogin = () => {
    

    const {loading , isLogin} = useSelector(state=> state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name , setName] = useState('Login')

    const [loginPassword , setLoginPassword] = useState('')
    const [loginEmail , setLoginEmail] = useState('')

    
    const [userName , setUserName] = useState('')
    const [registerEmail , setRegisterEmail] = useState('')
    const [avatarFile, setAvatarFile] = useState(null) 
    const [registerPassword , setRegisterPassword] = useState('')
    const [avatar , setAvatar] = useState('')
    const [avatarPreview , setAvatarPreview] = useState('/Images/avatar.png')
    const [avatarName, setAvatarName] = useState("Select Profile Pic..")



    const [loginPassType , setLoginPassType] = useState('password')
    const [registerPassType , setRegisterPassType] = useState('password')


    const registerHandler = (e) => {
        e.preventDefault()
        
        // Create FormData object
        const formData = new FormData()
        formData.append('name', userName)
        formData.append('email', registerEmail)
        formData.append('password', registerPassword)
        if (avatarFile) {
            formData.append('avatar', avatarFile)
        }

        dispatch(register(formData))
    }

    const imageChange = (e) => {
        if (e.target.name === "avatar") {
            const file = e.target.files[0]
            setAvatarFile(file)  // Store the file object
            
            // Create preview
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatarName(file.name)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    if(isLogin) {
        navigate('/')
    }

    const loginHandler = (e) =>{
        e.preventDefault()
        dispatch(login(loginEmail,loginPassword))
    }
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
                    <div className={`bg-white rounded-md shadow-md shadow-gray-400 w-full {
                        
                        ${name === 'Register' ? 'md:h-[80vh]':'md:h-[70vh]'}
                        
                        }`}>


                        
                        <div className='flex justify-around'>
                            <div onClick={()=> {
                                setName('Login')
                                setUserName('')
                                setAvatar('')
                                setRegisterEmail('')
                                setRegisterPassword('')
                                setAvatarPreview('/images/avatar.png')
                                setAvatarName('Select Profile Pic..')
                            }} className={`text-center py-4 w-1/2 border-x-0 border-t-0 border-blue-700 border-2 ${name === 'Register' ? 'border-none':null} text-xl cursor-pointer font-semibold hover:bg-gray-200`}>
                                Login
                            </div>
                            <div onClick={()=> {
                                setName('Register')
                                setLoginEmail('')
                                setLoginPassword('')
                            }} className={`text-center py-4 w-1/2 border-x-0 border-t-0 border-blue-700 border-2 ${name === 'Login' ? 'border-none':null} text-xl cursor-pointer font-semibold hover:bg-gray-200 `}>
                                SignUp
                            </div>
                        </div>




                        {/* login */}
                        <div className='pt-8'>
                         <form action="" onSubmit={loginHandler} className={`${name === 'Login' ? 'flex':'hidden'}  flex-col pt-8 gap-5 px-8`}>
                            <div className='relative rounded pl-3 border border-gray-500 py-1 flex items-center justify-around'>
                                <AiOutlineMail className='text-gray-500' size={26} />
                                <input type="text" placeholder='Enter Your Email' onChange={(e)=> setLoginEmail(e.target.value)} value={loginEmail} className=' w-full pl-4  py-1 pr-4 outline-none'/>
                            </div>
                            <div className='relative px-3 border rounded border-gray-500 py-1 flex justify-around items-center'>
                                <AiOutlineUnlock className='text-gray-500' size={26}/>
                                <input type={loginPassType} value={loginPassword} onChange={(e)=> setLoginPassword(e.target.value)} className=' w-full pl-4  outline-none py-1 pr-4' placeholder='Enter Your Password' />
                                {
                                    loginPassType === 'password' ? 
                                    <AiOutlineEyeInvisible onClick={()=> setLoginPassType('text')} size={26} /> :
                                    <AiOutlineEye onClick={()=> setLoginPassType('password')} size={26}/>
                                }
                            </div>

                            {
                                loading ?

                                <div className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 flex justify-center items-center'>
                              <div role='status'>
                              <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
   </svg>
   <span className="sr-only">Loading...</span>
                              </div>
                                </div>
                                :<input type="submit" value="Login" className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium hover:bg-blue-500 rounded' />
                            }
                            <p className='text-center pt-4'>Don't have account,
                                <span onClick={()=> setName('Register')} className='text-blue-800 underline  font-semibold  cursor-pointer'>SignUp</span></p>
                         </form>









                         {/* register form */}

                         <form action="" onSubmit={registerHandler} className={`${name === 'Register' ? 'flex':'hidden'}  flex-col  gap-5 px-8`}>
                            <div className='relative rounded pl-3 border border-gray-500 py-1 flex justify-around items-center'>
                            <MdOutlineAccountCircle className='text-gray-500' size={26} />
                                <input type="text"
                                value={userName}
                                onChange={(e)=> setUserName(e.target.value)}
                                className='w-full  outline-none pl-4 py-1 pr-4' placeholder='Enter Your Name' />
                            </div>


                            <div className='relative rounded pl-3 border border-gray-500 py-1 flex justify-around items-center'>
                            <AiOutlineMail className='text-gray-500' size={26} />
                                <input type="email"
                                
                                value={registerEmail}
                                onChange={(e)=> setRegisterEmail(e.target.value)}
                                className='w-full  outline-none pl-4 py-1 pr-4' placeholder='Enter Your Email' />
                            </div>


                            <div className='relative rounded px-3 pl-3 border border-gray-500 py-1 flex justify-around items-center'>
                            <AiOutlineUnlock className='text-gray-500' size={26} />
                                <input type={registerPassType}
                                
                                value={registerPassword}
                                onChange={(e)=> setRegisterPassword(e.target.value)}
                                className='w-full  outline-none pl-4 py-1 pr-4' placeholder='Enter Your Password' />
                                {
                                    registerPassType === 'password' ? 
                                    <AiOutlineEyeInvisible onClick={()=> setRegisterPassType('text')} size={26} className='text-gray-500 cursor-pointer' /> :
                                    <AiOutlineEye className='text-gray-500 cursor-pointer' onClick={()=> setRegisterPassType('password')} size={26}/>
                                }
                            </div>

                            <div  className='relative pl-3 rounded hover:bg-gray-100 border border-gray-500 py-1 flex justify-around items-center'>
                               


                            <label htmlFor="fileinput" className='cursor-pointer w-full text-gray-500 flex justify-center items-center flex-wrap gap-4 py-1'>
                    <img src={avatarPreview} className='w-6' alt="" />
                    {avatarName}

                  </label>
                  <input type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={imageChange}
                    className='hidden w-full pl-4 outline-none py-1 pr-4  '  id='fileinput' />
                            </div>

                            
                            {
                                loading ?

                                <div className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 flex justify-center items-center'>
                              <div role='status'>
                              <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
   </svg>
   <span className="sr-only">Loading...</span>
                              </div>
                                </div>
                                :<input type="submit" value="SignUp" className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium hover:bg-blue-500 rounded' />
                            }
                            <p className='text-center'>Already have account,
                                <span onClick={()=> setName('Login')} className='text-blue-800 underline  font-semibold  cursor-pointer'>Login</span></p>


                         </form>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}


export default SignUpLogin