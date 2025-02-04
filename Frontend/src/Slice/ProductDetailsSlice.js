import { createSlice } from "@reduxjs/toolkit";

const productDetailSlice = createSlice({
   name:'productDetails',
   initialState:{
    product:{
           
        images: [],
        reviews:[
            {
                rating:[]
            }
        ]
       },
    loading: false,
    error: null
   },
   reducers:{
    productDetailsRequest: (state) => {
        state.loading = true ;
    },
    productDetailsSuccess: (state, action) => {
        state.loading = false;
        state.product = action.payload
    },
    productDetailsFail: (state,action) => {
        state.loading = false;
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null

    }
   }
})

export const {productDetailsRequest,productDetailsSuccess,productDetailsFail,clearErrors} = productDetailSlice.actions

export default productDetailSlice.reducer