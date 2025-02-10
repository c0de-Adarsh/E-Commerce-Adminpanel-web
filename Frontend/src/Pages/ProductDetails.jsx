// import Loader from '../Components/Loader'
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useParams } from 'react-router'
// import Metadata from '../Components/Metadata'
// import { Carousel } from 'react-responsive-carousel';
// import Dialog from '@mui/material/Dialog';
// import { getCategoryProducts, getProductDetails, newReview } from '../Actions/productActions'
// import ReactStars from 'react-rating-stars-component'
// import { LiaRupeeSignSolid } from 'react-icons/lia'
// import { BiComment } from 'react-icons/bi'
// import { DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material'
// import ReviewCard from '../Components/ReviewCard'
// import { newReviewReset } from '../Slice/ProductSlice'
// import {addItemsToCart} from '../Actions/cartActions'
// import { toast } from 'react-toastify'
// const ProductDetails = () => {

//     const { id } = useParams()

//     const dispatch = useDispatch()

//     const { success, categoryProducts } = useSelector(state => state.products)

//     const { product, loading, error } = useSelector(state => state.productDetails)


//     const [quantity, setQuantity] = useState(1);
//     const [open, setOpen] = useState(false)
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState("")


//     useEffect(() => {
//         dispatch(getProductDetails(id));
//         dispatch(newReviewReset());
    
//         if (product && product.category) {
//             dispatch(getCategoryProducts(product.category));
//         }
//     }, [dispatch, success, id, product?.category]);
    




//     const reviewSubmitHandler = () => {
//         const myForm = new FormData();

//         myForm.set("rating", rating);
//         myForm.set("comment", comment)
//         myForm.set("productId", id);

//         dispatch(newReview(myForm))

//         setOpen(false)
//     }




//     const options = {
//         edit: false,
//         color: "rgba(20,20,20,0.1)",
//         activeColor: "tomato",
//         size: window.innerWidth < 700 ? 26 : 30,
//         value: product.rating,
//         isHalf: true,
//     }

//     const submitReview = () => {
//         open ? setOpen(false) : setOpen(true)
//     }


//     const increaseQuantity = () =>{
//         if(product.stock <= quantity) return
//         const qty = quantity + 1;
//         setQuantity(qty);
//     }


//     const decreaseQuantity = () => {
//         if (1 >= quantity) return;

//         const qty = quantity - 1;
//         setQuantity(qty);
//     };
  
//     const addToCartHandler = () =>{
//         dispatch(addItemsToCart(id,quantity))
//         if (quantity == 1) {
//             toast.success("Item added to cart")
//         }
//         else {
//             toast.success("Items added to cart")
//         }
//     }


//     return (
//         <>
//             <div className='min-h-screen md:pt-16 pt-8'>
//                 {
//                     loading ? <Loader /> :
//                         <>


//                             <div className='md:flex-row flex flex-col justify-between md:pt-6 pt-4'>
//                                 <Metadata title={product.name} />

//                                 <div className='w-full md:w-2/3 pt-8 lg:w-1/2 mx-auto '>
//                                     <Carousel showThumbs={false}
//                                         infiniteLoop={true}
//                                         autoPlay={false}
//                                         interval={3000}
//                                         transitionTime={500}
//                                         className='w-full md:px-36 px-6 ' >
//                                         {
//                                             product.images.map((img, i) => (

//                                                 <div key={i} className='h-1/2'>
//                                                     <img src={img.url} alt="image i"
//                                                         className='rounded-xl object-cover w-44 h-90 z-0 ' />

//                                                 </div>
//                                             ))
//                                         }


//                                     </Carousel>
//                                 </div>







//                                 <div className='md:w-1/2 w-full  gap-4 flex flex-col md:pt-0 pt-5 md:pb-0 pb-5 md:px-0 px-2'>
//                                     <div className='border pl-6 border-x-0 py-4 border-gray-400'>
//                                         <p className='md:text-4xl font-sans text-3xl py-2'>{product.name}</p>
//                                         <p className='text-xl text-gray-500'>Product# {product._id}</p>
//                                         <p className='font-medium text-lg text-gray-500'>In{product.category}'s</p>
//                                     </div>





//                                     <div className='flex z-0 flex-wrap items-center pl-6 gap-2'>
//                                         <ReactStars {...options} /> <span>({product.numofReview})</span>
//                                     </div>





//                                     <div className='border pl-6 border-x-0 py-4 border-gray-400'>
//                                         <div className='flex items-center'>
//                                             <LiaRupeeSignSolid size={22} />
//                                             <span className=' text-2xl font-normal '>  {product.price} </span>
//                                         </div>


//                                         <div className='flex  gap-8 pt-2'>
//                                             <div className='flex justify-center items-center'>
//                                                 <button className='px-3   font-bold text-xl bg-indigo-900 text-white hover:bg-indigo-700' onClick={decreaseQuantity}>-</button>
//                                                 <input readOnly type="number" className='text-center outline-none font-sans w-14 text-xl cursor-default ' value={quantity}/>
//                                                 <button className='px-3 hover:bg-indigo-700  font-bold text-xl bg-indigo-900 text-white'  onClick={increaseQuantity}>+</button>
//                                             </div>
//                                             <button onClick={addToCartHandler} disabled={product.Stock < 1 ? true : false } className='bg-indigo-900 text-white px-3 py-1 rounded text-lg font-medium'>Add to Cart</button>
//                                         </div>
//                                     </div>







//                                     <div className='flex gap-2 pl-6 text-xl font-medium border border-x-0 pt-3 pb-4 border-gray-400 border-t-0'>Status:
//                                         <p className={`${product.stock < 1 ? "text-red-600" : "text-green-600"} font-bold `}> {product.stock < 1 ? " Out of Stock" : " In Stock"}</p>
//                                     </div>






//                                     <div className='pl-6'>
//                                         <p className='text-xl pb-1 font-semibold'>Description</p>
//                                         <p className='text-sm pb-6'>{product.description}</p>



//                                         <button onClick={submitReview} className='bg-blue-500 hover:bg-blue-600 text-white text-lg px-3 py-1  font-medium'>Submit Review</button>
//                                     </div>
//                                 </div>
//                             </div>





//                             <div className='pb-14'>
//                                 <div className='text-2xl pt-12 pb-6 flex justify-center items-center'>
//                                     <span className='border flex justify-center items-center border-gray-500 pb-1 border-x-0 border-t-0 px-12 text-2xl font-normal' > <BiComment />Reviews</span>
//                                 </div>




//                                 <Dialog open={open} onClose={submitReview} aria-labelledby='simple-dialog title'>
//                                     <DialogTitle className='font-medium'>Sumbit Review
//                                     </DialogTitle>
//                                     <DialogContent className='flex flex-col gap-3'>
//                                         <Rating onChange={(e) => setRating(e.target.value)}
//                                             value={rating}
//                                             size={"large"} />
//                                         <textarea name="" id="" onChange={(e) => setComment(e.target.value)} className='outline-none border border-gray-300 px-2 py-1' cols={30} rows={5}>

//                                         </textarea>
//                                     </DialogContent>
//                                     <DialogActions className='flex gap-3 font-sans'>
//                                         <span onClick={reviewSubmitHandler} className='bg-blue-400 py-1 px-3 cursor-pointer hover:bg-blue-600 rounded  text-white'>Submit</span>
//                                         <span className='bg-red-400 py-1 px-3 cursor-pointer hover:bg-red-600 rounded  text-white'>Cancel</span>
//                                     </DialogActions>

//                                 </Dialog>










//                                 {
//                                     product.reviews && product.reviews[0] ? (
//                                         <div className=' flex flex-wrap justify-center gap-3 md:px-0 px-4 items-center '>
//                                             {
//                                                 product.reviews &&
//                                                 product.reviews.map((review, i) => <ReviewCard key={i} review={review} rating={review.rating} />)
//                                             }
//                                         </div>
//                                     ) : <p className='pt-14 text-xl text-center'>No Reviews Yet</p>
//                                 }
//                             </div>


//                             <div className='pb-20'>

//                                 {categoryProducts.filter((item) => item._id !== id).length !== 0 &&
//                                     <div className='text-2xl  pb-2 flex justify-center items-center '>
//                                         <span className='border flex justify-center items-center border-gray-500 pb-1 border-x-0 border-t-0 px-12 text-2xl font-normal' >
//                                             In {product.category}'s</span>
//                                     </div>

//                                 }





//                                 <div className='flex overflow-auto md:gap-8 gap-2 justify-center py-6 items-center'>
//                                     {categoryProducts.length > 0 ? categoryProducts.filter((e) => (e._id !== id)).map((item) => (
//                                         <Link to={`/product/${item._id}`} className='' >
//                                             <div key={item._id} className=' border shadow-sm hover:-translate-y-2 shadow-gray-400 rounded-md p-2 ' >
//                                                 {/* <div className='md:p-2 p-3 '>
//                                                     <img src={item.images[0].url} className=' w-full h-full object-cover ' alt={item.name} />
//                                                 </div> */}
//                                                 <div className='flex items-center'>
//                                                     <img src={item.images[0].url} className='md:h-36 md:w-36 h-28 w-28' alt="" />
//                                                 </div>
//                                                 <div className='flex md:w-4/5 font-sans pt-2  md:text-sm text-sm flex-wrap'>
//                                                     {item.name}
//                                                 </div>
//                                                 <div>
//                                                     <Rating readOnly value={item.rating} size="small" />
//                                                 </div>
//                                                 <div className='flex text-orange-500 font-medium justify-start items-center'> <span><LiaRupeeSignSolid /></span>
//                                                     <span>{item.price}</span>
//                                                 </div>

//                                             </div>
//                                         </Link>
//                                     )) : null}

//                                 </div>

//                             </div>
//                         </>
//                 }
//             </div>
//         </>
//     )
// }

// export default ProductDetails
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router'
import Metadata from '../Components/Metadata'
import { Carousel } from 'react-responsive-carousel'
import Dialog from '@mui/material/Dialog'
import { getCategoryProducts, getProductDetails, newReview } from '../Actions/productActions'
import ReactStars from 'react-rating-stars-component'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { BiComment } from 'react-icons/bi'
import { DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material'
import ReviewCard from '../Components/ReviewCard'
import { newReviewReset } from '../Slice/ProductSlice'
import { addItemsToCart } from '../Actions/cartActions'
import { toast } from 'react-toastify'
import Loader from '../Components/Loader'

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    
    const { success, categoryProducts = [] } = useSelector(state => state.products)
    const { product = {}, loading, error } = useSelector(state => state.productDetails)

    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id))
            dispatch(newReviewReset())
        }
    
        if (product && product.category) {
            dispatch(getCategoryProducts(product.category))
        }
    }, [dispatch, success, id, product?.category])

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 700 ? 26 : 30,
        value: product?.rating || 0,
        isHalf: true,
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData()
        myForm.set("rating", rating)
        myForm.set("comment", comment)
        myForm.set("productId", id)
        dispatch(newReview(myForm))
        setOpen(false)
    }

    const submitReview = () => {
        setOpen(!open)
    }

    const increaseQuantity = () => {
        if (product.stock <= quantity) return
        setQuantity(prev => prev + 1)
    }

    const decreaseQuantity = () => {
        if (quantity <= 1) return
        setQuantity(prev => prev - 1)
    }
  
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity))
        toast.success(`${quantity === 1 ? 'Item' : 'Items'} added to cart`)
    }

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500">Error: {error}</p>
        </div>
    }

    return (
        <>
            <div className='min-h-screen md:pt-16 pt-8'>
                <div className='md:flex-row flex flex-col justify-between md:pt-6 pt-4'>
                    <Metadata title={product?.name || 'Product Details'} />

                    <div className='w-full md:w-2/3 pt-8 lg:w-1/2 mx-auto'>
                        {product?.images?.length > 0 && (
                            <Carousel 
                                showThumbs={false}
                                infiniteLoop={true}
                                autoPlay={false}
                                interval={3000}
                                transitionTime={500}
                                className='w-full md:px-36 px-6'
                            >
                                {product.images.map((img, i) => (
                                    <div key={i} className='h-1/2'>
                                        <img 
                                            src={img.url} 
                                            alt={`Product image ${i + 1}`}
                                            className='rounded-xl object-cover w-44 h-90 z-0'
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        )}
                    </div>

                    <div className='md:w-1/2 w-full gap-4 flex flex-col md:pt-0 pt-5 md:pb-0 pb-5 md:px-0 px-2'>
                        <div className='border pl-6 border-x-0 py-4 border-gray-400'>
                            <p className='md:text-4xl font-sans text-3xl py-2'>{product?.name}</p>
                            <p className='text-xl text-gray-500'>Product# {product?._id}</p>
                            <p className='font-medium text-lg text-gray-500'>In {product?.category}'s</p>
                        </div>

                        <div className='flex z-0 flex-wrap items-center pl-6 gap-2'>
                            <ReactStars {...options} /> 
                            <span>({product?.numofReview || 0})</span>
                        </div>

                        <div className='border pl-6 border-x-0 py-4 border-gray-400'>
                            <div className='flex items-center'>
                                <LiaRupeeSignSolid size={22} />
                                <span className='text-2xl font-normal'>{product?.price}</span>
                            </div>

                            <div className='flex gap-8 pt-2'>
                                <div className='flex justify-center items-center'>
                                    <button 
                                        className='px-3 font-bold text-xl bg-indigo-900 text-white hover:bg-indigo-700' 
                                        onClick={decreaseQuantity}
                                    >
                                        -
                                    </button>
                                    <input 
                                        readOnly 
                                        type="number" 
                                        className='text-center outline-none font-sans w-14 text-xl cursor-default' 
                                        value={quantity}
                                    />
                                    <button 
                                        className='px-3 hover:bg-indigo-700 font-bold text-xl bg-indigo-900 text-white'
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                                <button 
                                    onClick={addToCartHandler} 
                                    disabled={product?.stock < 1} 
                                    className='bg-indigo-900 text-white px-3 py-1 rounded text-lg font-medium disabled:opacity-50'
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className='flex gap-2 pl-6 text-xl border border-x-0 pt-3 pb-4 border-gray-400 border-t-0 font-semibold'>
                            Status:
                            <p className={`${product?.stock < 1 ? "text-red-600" : "text-green-600"} font-bold`}>
                                {product?.stock < 1 ? " Out of Stock" : " In Stock"}
                            </p>
                        </div>

                        <div className='pl-6'>
                            <p className='text-xl pb-1 font-semibold'>Description</p>
                            <p className='text-sm pb-6'>{product?.description}</p>

                            <button 
                                onClick={submitReview}
                                className='bg-blue-500 hover:bg-blue-600 text-white text-lg px-3 py-1 font-medium'
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>

                <div className='pb-14'>
                    <div className='text-2xl pt-12 pb-6 flex justify-center items-center'>
                        <span className='border flex justify-center items-center border-gray-500 pb-1 border-x-0 border-t-0 px-12 text-2xl font-normal'>
                            <BiComment />Reviews
                        </span>
                    </div>

                    <Dialog 
                        open={open} 
                        onClose={submitReview} 
                        aria-labelledby='simple-dialog-title'
                    >
                        <DialogTitle className='font-medium'>
                            Submit Review
                        </DialogTitle>
                        <DialogContent className='flex flex-col gap-3'>
                            <Rating 
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large" 
                            />
                            <textarea 
                                onChange={(e) => setComment(e.target.value)}
                                className='outline-none border border-gray-300 px-2 py-1'
                                cols={30} 
                                rows={5}
                                value={comment}
                            />
                        </DialogContent>
                        <DialogActions className='flex gap-3 font-sans'>
                            <button 
                                onClick={reviewSubmitHandler}
                                className='bg-blue-400 py-1 px-3 cursor-pointer hover:bg-blue-600 rounded text-white'
                            >
                                Submit
                            </button>
                            <button 
                                onClick={() => setOpen(false)}
                                className='bg-red-400 py-1 px-3 cursor-pointer hover:bg-red-600 rounded text-white'
                            >
                                Cancel
                            </button>
                        </DialogActions>
                    </Dialog>

                    {product?.reviews?.length > 0 ? (
                        <div className='flex flex-wrap justify-center gap-3 md:px-0 px-4 items-center'>
                            {product.reviews.map((review, i) => (
                                <ReviewCard 
                                    key={i} 
                                    review={review} 
                                    rating={review.rating} 
                                />
                            ))}
                        </div>
                    ) : (
                        <p className='pt-14 text-xl text-center'>No Reviews Yet</p>
                    )}
                </div>

                {categoryProducts.filter((item) => item._id !== id).length > 0 && (
                    <div className='pb-20'>
                        <div className='text-2xl pb-2 flex justify-center items-center'>
                            <span className='border flex justify-center items-center border-gray-500 pb-1 border-x-0 border-t-0 px-12 text-2xl font-normal'>
                                In {product?.category}'s
                            </span>
                        </div>

                        <div className='flex overflow-auto md:gap-8 gap-2 justify-center py-6 items-center'>
                            {categoryProducts
                                .filter((e) => e._id !== id)
                                .map((item) => (
                                    <Link key={item._id} to={`/product/${item._id}`}>
                                        <div className='border shadow-sm hover:-translate-y-2 shadow-gray-400 rounded-md p-2'>
                                            <div className='flex items-center'>
                                                <img 
                                                    src={item?.images?.[0]?.url} 
                                                    className='md:h-36 md:w-36 h-28 w-28'
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div className='flex md:w-4/5 font-sans pt-2 md:text-sm text-sm flex-wrap'>
                                                {item.name}
                                            </div>
                                            <div>
                                                <Rating readOnly value={item.rating} size="small" />
                                            </div>
                                            <div className='flex text-orange-500 font-medium justify-start items-center'>
                                                <LiaRupeeSignSolid />
                                                <span>{item.price}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductDetails