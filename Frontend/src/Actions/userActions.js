
import {allUserFail, allUserRequest, allUserSuccess, changePasswordFail, changePasswordRequest, changePasswordSuccess, getMeFail, getMeRequest, getMeSuccess, loginFail, loginRequest, loginSuccess, registerFail, registerRequest, registerSuccess, setIsLoginFalse, setIsLoginTrue, updateProfileFail, updateProfileRequest, updateProfileSuccess, userDeleteFail, userDeleteRequest, userDeleteSuccess, userDetailsFail, userDetailsRequest, userDetailsSuccess, userUpdatedFail, userUpdatedRequest, userUpdatedSuccess} from '../Slice/UserSlice'
import axios from 'axios'
import API from '../Utils';
import { toast } from 'react-toastify';


export const register = (formData) => async (dispatch) => {
    try {
        dispatch(registerRequest())
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        }
        
        const { data } = await axios.post(`${API}/registeruser`, formData, config)
        console.log(data)
        localStorage.setItem('token', data.token)
        dispatch(registerSuccess(data))
        toast.success('Register successfully!')
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
        if(error.response.data.message.includes('duplicate')) {
            toast.error('User Already Exist')
        } else {
            toast.error(error.response.data.message)
        }
    }
}

export const login = (email , password) => async (dispatch) =>{

    try {
        
        dispatch(loginRequest())

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(`${API}/loginuser`,{email,password},config)

        localStorage.setItem('token',data.token)
        dispatch(loginSuccess(data))
        toast.success('Login Successfuly')
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
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


export const updateMe = (userData) => async (dispatch) =>{

    try {
       
        dispatch(updateProfileRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.put(`${API}/me/update`,config,userData)

        dispatch(updateProfileSuccess(data))
        dispatch(getMeSuccess(data.user))
        toast.success('Profile Updated Successfully')
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
    }
}

export const changePassword = (userData) => async (dispatch) =>{

    try {
       
        changePasswordRequest()

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')} `
            }
        }

        const {data} = await axios.put(`${API}/password/update`,config,userData)

        dispatch(changePasswordSuccess())

        toast.success('Password Updated successfully')
    } catch (error) {
        dispatch(changePasswordFail(error.response.data.message))
        toast.error(error.response.data.message) ;
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