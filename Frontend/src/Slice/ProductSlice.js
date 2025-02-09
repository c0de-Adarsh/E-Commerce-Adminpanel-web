import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        loading: false,
        error: null,
        productsCount: 0,
        resultPerPage: 0 ,
        filteredProductsCount: 0 ,
        success: null ,
        adminProducts: [],     
        newProduct: {},   
        allReviews: [],
        categoryProducts: [],
        allProducts: []
    },
    reducers: {
        allProductRequest: (state) => {
            state.loading = true;
            state.products = []
        },
        allProductSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.products
            state.productsCount = action.payload.productsCount
            state.resultPerPage = action.payload.resultPerPage
            state.filteredProductsCount = action.payload.filteredProductsCount
        },
        allProductFail: (state,action) => {
            state.loading = false;
            state.error = action.payload
        },
        

        productDetailsRequest: (state) => {
            state.loading = false ;
        },
        productDetailsSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload
        },
        productDetailsFail: (state,action) => {
            state.loading = false;
            state.error = action.payload
        },

        newReviewRequest: (state)=>{
            state.loading = true ;
        },
        newReviewSuccess: (state,action)=>{
            state.loading = false ;
            state.success = action.payload
        },
        newReviewFail: (state,action)=>{
            state.loading = false ;
            state.success = action.payload
        },
        newReviewReset: (state, action)  => {
            state.loading = false ;
            state.success = false
        },

        adminProductRequest: (state) => {
            state.loading = true ;
        },
        adminProductSuccess: (state,action) => {
            state.loading = false ;
            state.adminProducts = action.payload ;
        },
        adminProductFail: (state, action) => {
            state.loading = false ;
            state.error = action.payload
        },

        newProductRequest: (state) => {
            state.loading = true ;
        },
        newProductSuccess: (state, action)=>{
            state.loading = false ;
            state.newProduct = action.payload.product ;
            state.success = action.payload.success
        },
        newProductFail: (state, action)=>{
            state.loading = false ;
            state.success = action.payload.success
        },

        deleteProductRequest: (state) => {
            state.loading = true ;
        },
        deleteProductSuccess: (state, action)=>{
            state.loading = false ;
            state.success = action.payload.success
        },
        deleteProductFail: (state, action)=>{
            state.loading = false ;
            state.success = action.payload.success
        },

        updateProductRequest: (state) => {
            state.loading = true ;
        },
        updateProductSuccess: (state, action)=>{
            state.loading = false ;
            state.success = action.payload.success
        },
        updateProductFail: (state, action)=>{
            state.loading = false ;
            state.success = action.payload.success
        },

        deleteReviewRequest: (state)=>{
            state.loading = true
        },
        deleteReviewSuccess: (state, action)=>{
            state.loading = false ;
            state.success = action.payload.success
        },
        deleteReviewFail: (state, action)=>{
            state.loading = false
            state.error = action.payload
        },

        allReviewRequest: (state)=>{
            state.loading = true ;
            state.allReviews = []
        },
        allReviewSuccess: (state, action)=>{
            state.loading = false ;
            state.allReviews = action.payload
        },
        allReviewFail: (state, action)=>{
            state.loading = false
            state.error = action.payload
        },

        getCategoryProductsRequest: (state)=>{
            state.loading = true ;
        },
        getCategoryProductsSuccess: (state, action)=>{
            state.loading = false ;
            state.categoryProducts = action.payload ;
        },
        getCategoryProductsFail: (state, action)=>{
            state.loading = false ;
            state.error = action.payload ;
        },


        everyProductRequest: (state) => {
            state.loading = true ;
        },
        everyProductSuccess: (state, action) => {
            state.loading = false ;
            state.allProducts = action.payload.products
        },
        everyProductFail: (state, action) => {
            state.loading = false ;
            state.error = action.payload
        },


        clearErrors: (state) => {
            state.error = null

        }
    }
})

export const { allProductRequest, allProductSuccess, allProductFail, clearErrors, productDetailsRequest, productDetailsSuccess, productDetailsFail, newReviewRequest, newReviewSuccess, newReviewFail, newReviewReset, adminProductRequest, adminProductSuccess, adminProductFail, newProductRequest, newProductSuccess, newProductFail,
    deleteProductRequest, deleteProductSuccess, deleteProductFail, updateProductRequest, updateProductSuccess,updateProductFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail, allReviewRequest, allReviewSuccess, allReviewFail, getCategoryProductsRequest, getCategoryProductsSuccess, getCategoryProductsFail, everyProductRequest, everyProductSuccess, everyProductFail} = productSlice.actions ;

export default productSlice.reducer ;