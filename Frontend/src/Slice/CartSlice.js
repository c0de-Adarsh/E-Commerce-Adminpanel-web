
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')):{}
    },

    reducers:{
        addToCart:(state,action)=>{
            const item = action.payload
            const isItemsExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if(isItemsExist){
                state.cartItems = state.cartItems.map((i)=>
                  i.product === isItemsExist.product ?  item : i
                );
            }else{
                state.cartItems.push(item)
            }
        },
        removeFromCart:(state)=>{
            state.cartItems = JSON.parse(localStorage.getItem("cartItems")) ;
        },
        removeAllItems:(state)=>{
            state.cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
             state.shippingInfo = localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
        },
        saveShippingInfo:(state,action)=>{
            state.shippingInfo = action.payload
        }
    }
})

 export const {addToCart , removeFromCart , removeAllItems} = cartSlice.actions

 export default cartSlice.reducer