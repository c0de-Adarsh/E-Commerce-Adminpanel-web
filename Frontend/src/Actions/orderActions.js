
import axios from 'axios'
import {allOrderFail, allOrderRequest, allOrderSuccess, createOrdersFail, createOrdersRequest, createOrdersSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, myOrderFail, myOrderRequest, myOrderSuccess, orderDetailsFail, orderDetailsRequest, orderDetailsSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess} from '../Slice/OrderSlice'
import API from '../Utils'
import { toast } from 'react-toastify'

export const createOrder = (orderData) => async (dispatch) =>{

    try {
       dispatch(createOrdersRequest())
        
       const config = {
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
       }
       
       
       const {data} = await axios.post(`${API}/order/new`,orderData,config)
      
       dispatch(createOrdersSuccess(data.order))
       toast.success("Payment successful! Thank you for your purchase.") ;
    } catch (error) {
        //console.log('Full error object:', error);
       // console.log('Response data:', error.response?.data);
       // console.log('Status code:', error.response?.status);
        dispatch(createOrdersFail(error.response?.data?.message || 'Server error'));
        toast.error(error.response?.data?.message || 'Failed to create order');
    }
}


export const myOrders = () => async (dispatch) =>{

    try {
       
        dispatch(myOrderRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.get(`${API}/orders/me`)
          console.log(data)
        dispatch(myOrderSuccess(data.orders))
    } catch (error) {
        dispatch(myOrderFail(error.response.data.message))
        toast.error(error.response.data.message)
        console.log(error)
    }
}

export const getOrderDetails = (id) => async (dispatch) =>{

    try {
       
        dispatch(orderDetailsRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.get(`${API}/order/${id}`,config)
      console.log(data)
        dispatch(orderDetailsSuccess(data.order))
    } catch (error) {
        dispatch(orderDetailsFail(error.response.data.message))
        console.log(error)
        toast.error(error.response.data.message)
    }
}

export const getAllOrders = () => async (dispatch) =>{

    try {
       
        dispatch(allOrderRequest())
         
        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.get(`${API}/admin/orders`,config)

        dispatch(allOrderSuccess(data.orders))
    } catch (error) {
        dispatch(allOrderFail(error.response.data.message)) ;
    }
}


export const updateOrder = (id ,order) => async (dispatch) =>{
    try {
       
        dispatch(updateOrderRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.put(`${API}/admin/order/${id}`,order)

        dispatch(updateOrderSuccess(data.order))
        dispatch(getOrderDetails(id))

        toast.success("Order Updated !") ;
    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message))
    }
}

export const deleteOrder = (id) => async (dispatch) =>{
    try {
       
        dispatch(deleteOrderRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.delete(`${API}/admin/order/${id}`)

        dispatch(deleteOrderSuccess(data))
        dispatch(getAllOrders())
        toast.success("Order Deleted !") ;
    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message))
        toast.error(error.response.data.message)
    }
}