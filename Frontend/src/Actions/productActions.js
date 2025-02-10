import axios from "axios"
import { adminProductFail, adminProductRequest, adminProductSuccess, allProductRequest, allProductSuccess, allReviewFail, allReviewRequest, allReviewSuccess, clearErrors, deleteProductFail, deleteProductRequest, deleteProductSuccess, deleteReviewFail, deleteReviewRequest, deleteReviewSuccess, everyProductFail, everyProductRequest, everyProductSuccess, getCategoryProductsFail, getCategoryProductsRequest, getCategoryProductsSuccess, newProductFail, newProductRequest, newProductSuccess, newReviewFail, newReviewRequest, newReviewSuccess,  updateProductFail, updateProductRequest, updateProductSuccess } from "../Slice/ProductSlice"
import { productDetailsRequest, productDetailsSuccess, productDetailsFail, } from '../Slice/ProductDetailsSlice'
import API from "../Utils"
import { toast } from "react-toastify"

export const getProducts = (keyword = "", currentPage = 1, price = [0, 25000], category , ratings = 0) => async (dispatch) => {

   try {
     dispatch(allProductRequest())
 
     let link = `${API}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratings}`
 
 
 if (category) {
     link += `${API}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${ratings}`;
 }
 
 const { data } = await axios.get(link)
    
    dispatch(allProductSuccess(data))
   } catch (error) {
      dispatch(error.response.data.message)
   }

}

export const getProductDetails = (id) => async (dispatch) =>{

    try {
       
        dispatch(productDetailsRequest())
        
         const {data} = await axios.get(`${API}/products/${id}`)
       
         dispatch(productDetailsSuccess(data.product)) 
         
         //console.log(data)
        
    } catch (error) {
        dispatch(productDetailsFail(error.response.data.message))
        console.log(error.response.data.message)
    }
}



export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch(newReviewRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.put(`${API}/review`, reviewData, config);
        //console.log(data)

        dispatch(newReviewSuccess(data.success))
        toast.success("Review Added !")

    } catch (err) {
        dispatch(newReviewFail(err.response.data.message));
        console.log(err.response.data.message)
    }
}


export const getAllProductsForAdmin = () => async (dispatch) => {
    try {
        dispatch(adminProductRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.get(`${API}/admin/products`, config)
        
        dispatch(adminProductSuccess(data.products));

    } catch (err) {
        dispatch(adminProductFail(err.response.data.message))
    }
}


export const createNewProduct = (productData) => async (dispatch) => {
    try {
        dispatch(newProductRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.post(`${API}/product/new`, productData, config)
        toast.success("New Product Created !")
        
        dispatch(newProductSuccess(data));
    } catch (error) {
        dispatch(newProductFail(error.response.data.message))
        toast.error(error.response.data.message)
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
            dispatch(deleteProductRequest()) ;

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }

            const { data } = await axios.delete(`/products/${id}`,config) ;

            dispatch(deleteProductSuccess(data))
            toast.success("Product Deleted !");
            dispatch(getAllProductsForAdmin())
    } catch (error) {
        dispatch(deleteProductFail(error.response.data.message))
        toast.error(error.response.data.message)
    }
}


export const updateProduct = (id,newData) => async (dispatch)=>{
    try{
        dispatch(updateProductRequest()) ;

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.put(`${API}/products/${id}`,newData,config) ;
        
        dispatch(updateProductSuccess(data)) ;
        dispatch(getAllProductsForAdmin())
        toast.success("Product Updated !") ;

        
    }catch(error){
        dispatch(updateProductFail(error.response.data.message)) ;
        toast.error(error.response.data.message)
        console.log(error.response.data.message)
    }
}


export const getAllReviews = (id) => async (dispatch) => {
    try{
        dispatch(allReviewRequest())

        const {data} = await axios.get(`${API}/reviews?id=${id}`)

        dispatch(allReviewSuccess(data.reviews)) ;

    }catch(error){
        dispatch(allReviewFail(error.response.data.message))
    }
}



export const deleteReviews = (reviewId,productId) => async (dispatch) => {
    try{
        dispatch(deleteReviewRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.delete(`${API}/reviews?id=${reviewId}&productId=${productId}`,config)

        dispatch(deleteReviewSuccess(data)) ;
        dispatch(getAllReviews(productId))
        toast.success("Review Deleted !")

    }catch(error){
        dispatch(deleteReviewFail(error.response.data.message))
        toast.error(error.response.data.message)
    }
}


export const getCategoryProducts = (category) => async (dispatch) => {
    try{
        dispatch(getCategoryProductsRequest())


        const {data} = await axios.get(`${API}/productbycategory?category=${category}`) ;
       
        dispatch(getCategoryProductsSuccess(data.products)) ;
       

    }catch(error){
        dispatch(getCategoryProductsFail(error.response.data.message))
        console.log(error.response.data.message)
    }
}


export const getEveryProduct = () => async (dispatch) =>{

    try {
        
        dispatch(everyProductRequest())

        const { data } = await axios.get(`${API}/geteveryproduct`)

        dispatch(everyProductSuccess(data))
    } catch (error) {
        dispatch(everyProductFail(error.response.data.message))
    }
}

export const clearError = () => async (dispatch) => {
    dispatch(clearErrors())
}