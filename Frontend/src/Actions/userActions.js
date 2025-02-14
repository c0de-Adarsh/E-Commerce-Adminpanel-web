
import {allUserFail, allUserRequest, allUserSuccess, changePasswordFail, changePasswordRequest, changePasswordSuccess, getMeFail, getMeRequest, getMeSuccess, loginFail, loginRequest, loginSuccess, registerFail, registerRequest, registerSuccess, setIsLoginFalse, setIsLoginTrue, updateProfileFail, updateProfileRequest, updateProfileSuccess, userDeleteFail, userDeleteRequest, userDeleteSuccess, userDetailsFail, userDetailsRequest, userDetailsSuccess, userUpdatedFail, userUpdatedRequest, userUpdatedSuccess} from '../Slice/UserSlice'
import axios from 'axios'
import API from '../Utils';
import { toast } from 'react-toastify';
import { clearErrors } from '../Slice/ProductSlice';


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest())
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post(`${API}/loginuser`, { email, password }, config)
        localStorage.setItem('token', data.token)
        dispatch(loginSuccess(data))
        toast.success("Login Successful!", {
            autoClose: 2000,
            onClose: () => {
                dispatch(clearErrors())
            }
        });
    }
    catch (err) {
        dispatch(loginFail(err.response.data.message));
        toast.error(err.response?.data?.message || "Login failed", {
            autoClose: 2000,
            onClose: () => {
                dispatch(clearErrors())
            }
        });
    }
}

export const register = (userData) => async (dispatch) => {
    try {
        dispatch(registerRequest())
        const { data } = await axios.post(`${API}/registeruser`, userData)
        localStorage.setItem('token', data.token)
        dispatch(registerSuccess(data));
        toast.success("Registration Successful!", {
            autoClose: 2000,
            onClose: () => {
                dispatch(clearErrors())
            }
        });
    } catch (err) {
        dispatch(registerFail(err.response.data.message))
        const errorMsg = err.response?.data?.message?.includes("duplicate") 
            ? "User already exists" 
            : (err.response?.data?.message || "Registration failed");
        toast.error(errorMsg, {
            autoClose: 2000,
            onClose: () => {
                dispatch(clearErrors())
            }
        });
    }
}

export const isLogin = () => async (dispatch) =>{

    try {
       
        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.get(`${API}/islogin`,config)
        dispatch(setIsLoginTrue(data))
    } catch (error) {
        dispatch(setIsLoginFalse())
    }
}

export const me = () => async (dispatch) =>{

    try {
       
        dispatch(getMeRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.get(`${API}/me`,config)
 

        dispatch(getMeSuccess(data.user))
    } catch (error) {
        dispatch(getMeFail(error.response.data.message))
        console.log(error.response.data.message)
    }
}


export const updateMe = (userData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest())
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        
        const { data } = await axios.put(`${API}/me/update`, userData, config)
        
        dispatch(updateProfileSuccess(data))
        dispatch(getMeSuccess(data.user))
        toast.success('Profile Updated Successfully')
    } catch (error) {
        dispatch(updateProfileFail(error.response?.data?.message || "Update failed"))
        console.log(error.response?.data?.message || error.message)
        toast.error(error.response?.data?.message || "Update failed")
    }
}




// export const updateMe = (userData) => async (dispatch) => {
//     try {
//         dispatch(updateProfileRequest())
        
//         // Create FormData object
//         const formData = new FormData()
//         formData.append('newName', userData.newName)
//         formData.append('newEmail', userData.newEmail)
        
//         // Only append image if it exists
//         if (userData.newImage) {
//             // Convert base64 to file
//             const base64Response = await fetch(userData.newImage)
//             const blob = await base64Response.blob()
//             const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' })
//             formData.append('newImage', file)
//         }

//         const config = {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         }

//         const { data } = await axios.put(`${API}/me/update`, formData, config)
//         console.log(data)
//         dispatch(updateProfileSuccess(data))
//         dispatch(getMeSuccess(data.user))
//         toast.success('Profile Updated Successfully')
//     } catch (error) {
//         dispatch(updateProfileFail(error.response?.data?.message || 'Update failed'))
//         console.log(error.response?.data?.message || error.message)
//         toast.error(error.response?.data?.message || 'Update failed')
//     }
// }

export const changePassword = (userData) => async (dispatch) =>{

    try {
       
        changePasswordRequest()

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')} `
            }
        }

        const {data} = await axios.put(`${API}/password/update`,userData,config)

        dispatch(changePasswordSuccess())
   console.log(data)
        toast.success('Password Updated successfully')
    } catch (error) {
        dispatch(changePasswordFail(error.response.data.message))
        toast.error(error.response.data.message) ;
        console.log(error.response.data.message)
    }
}


//admin

export const getAllUsers = () => async (dispatch) =>{

    try {
       
        dispatch(allUserRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.get(`${API}/admin/users`,config)

        dispatch(allUserSuccess(data.AllUsers))
       
    } catch (error) {
        dispatch(allUserFail(error.response.data.message))
        
    }
}


export const getUserDetails = (id) => async (dispatch) =>{

    try {
       
        dispatch(userDetailsRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.get(`${API}/admin/user/${id}`,config)

        dispatch(userDetailsSuccess(data.user))
    } catch (error) {
        dispatch(userDetailsFail(error.response.data.message))
    }
}
export const updateUser = (id,userData) => async (dispatch) =>{

    try {
        
       dispatch(userUpdatedRequest()) 

       const config = {
         headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
         }
       }

       const {data} = await axios.put(`${API}/admin/user/${id}`,userData,config)

       dispatch(userUpdatedSuccess(data.success))
       dispatch(getUserDetails(id))
       toast.success(data.message)
    } catch (error) {
         dispatch(userUpdatedFail(error.response.data.message))
         toast.error(error.response.data.message)
    }
}

export const deleteUser = (id) => async (dispatch) =>{

    try {
       
        dispatch(userDeleteRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.delete(`${API}/admin/user/${id}`,config)
        dispatch(userDeleteSuccess(data.success))
        toast.success("User Deleted Successfully !") ;
        dispatch(getAllUsers())
    } catch (error) {
        dispatch(userDeleteFail(error.response.data.message))
        toast.error(err.response.data.message)
    }
}

export const clearError = () => async (dispatch) => {
    dispatch(clearError())
}