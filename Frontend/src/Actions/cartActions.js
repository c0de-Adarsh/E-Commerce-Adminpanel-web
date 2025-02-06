import axios from "axios"
import API from "../Utils"
import {addToCart, removeAllItems, removeFromCart, saveShippingInfo} from '../Slice/CartSlice'
import {toast} from 'react-toastify'
export const addItemsToCart = (id,quantity) => async (dispatch , getState) =>{


     const {data} = await axios.get(`${API}/products/${id}`)

    dispatch(addToCart({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity
    }))
       
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemsFromCart = (id) => async (dispatch) =>{

   
        
        //local storage se carttem nikalo

        const item = JSON.parse(localStorage.getItem('cartItems'))

        //jiski id mtch ni hui usse rakkho 

        const modifiedItems = item.filter((item)=> (
            item.product !== id
        ))

        //Naya Cart Wapas LocalStorage Me Save 

        localStorage.setItem('cartItems',JSON.stringify(modifiedItems))
    
        dispatch(removeFromCart())
        toast.success("Item removed")
}

export const  removeAllItemsFromCart = () => async (dispatch) => {
     
    localStorage.removeItem('cartItems')
    dispatch(removeAllItems())
    toast.success("All items removed")
}


export const removeAllWhenLogout = () => async (dispatch) => {    
    localStorage.removeItem('cartItems') ;
    localStorage.removeItem('shippingInfo') ;
    dispatch(removeAllItems())
}

export const saveShipInfo = (data) => async (dispatch) => {
    dispatch(saveShippingInfo(data)) ;

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}