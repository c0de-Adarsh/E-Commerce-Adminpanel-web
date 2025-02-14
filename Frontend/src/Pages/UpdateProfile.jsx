import React, { useEffect, useState } from 'react'
import Metadata from '../Components/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import { MdOutlineTagFaces } from 'react-icons/md'
import { AiOutlineMail } from 'react-icons/ai'
import { updateMe } from '../Actions/userActions'
import { toast } from 'react-toastify' // Add this import if not already present

const UpdateProfile = () => {
    const { me, loading } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("/images/avatar.png")
    const [avatarName, setAvatarName] = useState("Select Profile Pic..")

    useEffect(() => {
        if (me !== null) {
            setName(me.name);
            setEmail(me.email);
            setAvatarName("Your picture");
            if (me.avatar && me.avatar[0] && me.avatar[0].url) {
                setAvatarPreview(me.avatar[0].url);
            }
        }
    }, [me])

    const imageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Check file size
            if (file.size > 1024 * 1024) { // 1MB
                toast.error('File size should be less than 1MB')
                return
            }
            
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                    setAvatarName(file.name)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const updateProfile = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('newName', name)
        formData.append('newEmail', email)
        
        if (avatar) {
            // Convert base64 to blob and append as a file
            fetch(avatar)
                .then(res => res.blob())
                .then(blob => {
                    const avatarFile = new File([blob], avatarName, { type: 'image/jpeg' })
                    formData.append('newImage', avatarFile)
                    
                    // Dispatch the action with FormData
                    dispatch(updateMe(formData))
                })
                .catch(err => {
                    console.error("Error converting image:", err)
                    toast.error("Error preparing image for upload")
                })
        } else {
            // If no new avatar is selected, just update name and email
            dispatch(updateMe(formData))
        }
    }

    return (
        <>
            <Metadata title='Edit Profile' />
            <div className='pt-14 min-h-screen bg-gray-200'>
                {
                    loading ? <Loader /> : <div className='w-full flex flex-col md:px-0 px-5 justify-center items-center pt-20'>

                        <div className='md:w-1/3 w-full bg-white rounded-md shadow-md shadow-gray-400'>
                            <p className='text-2xl text-center py-4 font-medium'>Update Profile</p>

                            <div className='flex flex-col gap-5 pb-10 py-3 px-8'>
                                <div className='relative rounded pl-3 border border-gray-500 flex justify-around items-center py-1'>
                                    <MdOutlineTagFaces className='text-gray-500 ' size={26} />
                                    <input type="text"
                                        placeholder='Full Name'
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className=' w-full pl-4 outline-none py-1 pr-4 ' />
                                </div>

                                <div className='relative pl-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                                    <AiOutlineMail className='text-gray-500 ' size={26} />
                                    <input type="email"
                                        placeholder='Email'
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className=' w-full pl-4 outline-none py-1 pr-4' />
                                </div>

                                <div className='relative pl-3 rounded hover:bg-gray-100 border border-gray-500 py-1 flex justify-around items-center'>
                                    <label htmlFor="fileinput" className='cursor-pointer w-full text-gray-500 flex justify-center items-center gap-4 py-1'>
                                        <img src={avatarPreview} className='w-6 h-6 object-cover' alt="" />
                                        {avatarName}
                                    </label>
                                    <input type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={imageChange}
                                        className='hidden w-full pl-4 outline-none py-1 pr-4' 
                                        id='fileinput' />
                                </div>

                                <div>
                                    {loading ? <div className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 flex justify-center items-center'>
                                        <div role="status">
                                            <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div> :
                                        <button onClick={updateProfile} className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500'>
                                            Update
                                        </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default UpdateProfile