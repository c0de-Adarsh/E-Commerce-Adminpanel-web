import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name:'newOrder',
    initialState:{
        loading:false,
        order:null,
        myOrders:[],
        error:null,


        orderDetails:{
            _id: "",
            shippingInfo: {},
            paymentInfo: {},
            orderItems: [],
            user: {},
            paidAt: "",
            itemPrice: 0,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: 0,
            orderStatus: "",
            deliveredAt: "",
        },
        success:false,
        allOrders:[]
    },
    reducers:{
        createOrdersRequest:(state)=>{
            state.loading = true
        },
        createOrdersSuccess:(state,action)=>{
            state.loading = false;
            state.order = action.payload
        },
        createOrdersFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
        myOrderRequest:(state)=>{
            state.loading = true
        },
        myOrderSuccess:(state,action)=>{
            state.loading = false;
            state.myOrders = action.payload
        },
        myOrderFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        orderDetailsRequest:(state)=>{
            state.loading = true;
        },
        orderDetailsSuccess:(state,action)=>{
            state.loading = false;
            state.orderDetails = action.payload
        },
        orderDetailsFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
        allOrderRequest:(state)=>{
            state.loading = true;
        },
        allOrderSuccess:(state,action)=>{
            state.loading = false;
            state.allOrders = action.payload
        },
        allOrderFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
        updateOrderRequest:(state)=>{
            state.loading = true
        },
        updateOrderSuccess:(state,action)=>{
            state.loading = false;
            state.success = action.payload.success
        },
        updateOrderFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
        deleteOrderRequest:(state,action)=>{
            state.loading = true
        },
        deleteOrderSuccess:(state,action)=>{
            state.loading = false;
            state.success = action.payload.success
        },
        deleteOrderFail:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        }
        
    }
})

export const {createOrdersRequest , createOrdersSuccess , createOrdersFail , myOrderRequest,myOrderSuccess,myOrderFail , orderDetailsRequest,orderDetailsSuccess,orderDetailsFail,allOrderRequest,allOrderSuccess,allOrderFail,updateOrderRequest,updateOrderSuccess,updateOrderFail,deleteOrderRequest,deleteOrderSuccess,deleteOrderFail} = orderSlice.actions

export default orderSlice.reducer