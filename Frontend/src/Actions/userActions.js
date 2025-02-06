
import {loginFail, loginRequest, loginSuccess, registerFail, registerRequest, registerSuccess} from '../Slice/UserSlice'
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