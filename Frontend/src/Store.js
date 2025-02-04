import { configureStore } from "@reduxjs/toolkit"
import userReducer from './Slice/UserSlice'
import productReducer from './Slice/ProductSlice'
import newOrderReducer from './Slice/OrderSlice'
import numReducer from './Slice/NumSlice'
import cartReducer from './Slice/CartSlice'
import productDetailReducer from './Slice/ProductDetailsSlice'
const store = configureStore({
       
    reducer:{
       user:userReducer,
       products:productReducer,
       cart:cartReducer,
       num:numReducer,
       newOrder:newOrderReducer,
       productDetails:productDetailReducer
    }

})

export default store