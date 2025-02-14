import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, getCategoryProducts } from '../Actions/productActions';
import ReactStars from 'react-rating-stars-component'
import  ReviewCard  from '../Components/ReviewCard';
import { BiComment } from 'react-icons/bi'
import  Loader  from '../Components/Loader.jsx'
import  MetaData  from '../Components/Metadata';
import { addItemsToCart } from '../Actions/cartActions'
import { toast } from 'react-toastify'
import { newReview } from '../Actions/productActions'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating } from '@mui/material';
import { newReviewReset } from '../Slice/ProductSlice'
import { Link } from 'react-router-dom';
import { LiaRupeeSignSolid } from 'react-icons/lia'


 const ProductDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch()
    const { success, categoryProducts } = useSelector(state => state.products)

    const { product, loading, error } = useSelector((state) => state.productDetails)

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")

    useEffect(() => {
        dispatch(getProductDetails(id))
        dispatch(newReviewReset())

        if (product.category) {
            dispatch(getCategoryProducts(product.category))
        }

    }, [dispatch, success, product.category, id])






    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 700 ? 26 : 30,
        value: product.rating,
        isHalf: true,
    }

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {

         if (product.stock < 1) {
            toast.error("Product is out of stock!");
            return;
        }
        dispatch(addItemsToCart(id, quantity))
        if (quantity == 1) {
            toast.success("Item added to cart")
        }
        else {
            toast.success("Items added to cart")
        }
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment)
        myForm.set("productId", id);

        dispatch(newReview(myForm))

        setOpen(false)
    }



    return (
        <>

            <div className='min-h-screen md:pt-16 pt-8  '>
                {

                    loading ? <Loader /> :
                        <>
                            <div className='flex md:flex-row flex-col justify-between md:pt-6 pt-4  '>
                                <MetaData title={product.name} />

                                <div className="w-full md:w-2/3 pt-8 lg:w-1/2 mx-auto ">
                                    <Carousel
                                        showThumbs={false}
                                        infiniteLoop={true}
                                        autoPlay={false}
                                        interval={3000}
                                        transitionTime={500}
                                        className='w-full md:px-36 px-6 ' >
                                        {product.images.map((img, i) => (
                                            <div key={i} className='h-1/2  ' >
                                                <img src={img.url} alt="Image 1" className='rounded-xl object-cover w-44 h-90 z-0 ' />
                                            </div>
                                        ))

                                        }


                                    </Carousel>
                                </div>



                                <div className='md:w-1/2 w-full  gap-4 flex flex-col md:pt-0 pt-5 md:pb-0 pb-5 md:px-0 px-2'>

                                    <div className='border pl-6 border-x-0 py-4 border-gray-400'>
                                        <p className='md:text-4xl font-sans text-3xl py-2'>{product.name}</p>
                                        <p className='text-xl text-gray-500'>Product #{product._id}</p>
                                        <p className='font-medium text-lg text-gray-500'>In {product.category}'s</p>
                                    </div>


                                    <div className='flex z-0 pl-6 flex-wrap items-center  gap-2  ' >
                                        <ReactStars {...options} /> <span className='md:text-sm text-sm'>({product.numOfReviews} Reviews)</span>
                                    </div>

                                    <div className=' border pl-6 border-x-0 py-4 border-gray-400'>
                                        <div className='flex items-center'>
                                            <LiaRupeeSignSolid size={22} />
                                            <span className=' text-2xl font-normal '>  {product.price} </span>
                                        </div>

                                        <div className="flex gap-8 pt-2">

                                            <div className="flex justify-center items-center">

                                                <button className='px-3   font-bold text-xl bg-indigo-900 text-white hover:bg-indigo-700' onClick={decreaseQuantity}>-</button>
                                                <input readOnly type="number" className='text-center outline-none font-sans w-14 text-xl cursor-default ' value={quantity} />
                                                <button className='px-3 hover:bg-indigo-700  font-bold text-xl bg-indigo-900 text-white' onClick={increaseQuantity}>+</button>

                                            </div>


                                            <button onClick={addToCartHandler} className='bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium px-4  py-1'
                                                disabled={product.Stock < 1 ? true : false}                                            >
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
                                        <p className='text-xl pb-1 font-semibold'>Description :</p>
                                        <p className='pb-6 text-sm  '>{product.description}</p>

                                        <button onClick={submitReviewToggle} className='bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium px-3  py-1' >
                                            Submit Review
                                        </button>

                                    </div>



                                </div>






                            </div>


                            <div className='pb-14'>
                                <div className='text-2xl pt-12 pb-6 flex justify-center items-center '>

                                    <span className='border flex justify-center items-center border-gray-500 pb-1 border-x-0 border-t-0 px-12 text-2xl font-normal' >
                                        <BiComment /> Reviews</span>

                                </div>

                                <Dialog open={open} onClose={submitReviewToggle} aria-labelledby='simple-dialog-title'>
                                    <DialogTitle className='font-medium'>Submit Review</DialogTitle>
                                    <DialogContent className='flex flex-col gap-3 '>
                                        <Rating onChange={(e) => setRating(e.target.value)}
                                            value={rating}
                                            size={"large"}
                                        />
                                        <textarea onChange={(e) => setComment(e.target.value)} className='outline-none border border-gray-300 px-2 py-1' cols="30" rows="5">

                                        </textarea>
                                    </DialogContent>
                                    <DialogActions className='flex gap-3 font-sans  '>
                                        <span onClick={reviewSubmitHandler} className='bg-blue-400 hover:bg-blue-500 px-3 font-semibold rounded  py-1 text-white cursor-pointer'>Submit</span>
                                        <span onClick={submitReviewToggle} className=' bg-red-400 hover:bg-red-500 px-3 font-semibold text-white cursor-pointer rounded  py-1' >Cancel</span>

                                    </DialogActions>
                                </Dialog>

                                {
                                    product.reviews && product.reviews[0] ? (
                                        <div className=' flex flex-wrap justify-center gap-3 md:px-0 px-4 items-center '>
                                            {
                                                product.reviews &&
                                                product.reviews.map((review, i) => <ReviewCard key={i} review={review} rating={review.rating} />)
                                            }
                                        </div>
                                    ) : <p className='pt-14 text-xl text-center'>No Reviews Yet</p>
                                }
                            </div>
                            <div className='pb-20'>

                                {categoryProducts.filter((item) => item._id !== id).length !== 0 &&
                                    <div className='text-2xl  pb-2 flex justify-center items-center '>
                                        <span className='border flex justify-center items-center border-gray-500 pb-1 border-x-0 border-t-0 px-12 text-2xl font-normal' >
                                            In {product.category}'s</span>
                                    </div>

                                }



                                <div className='flex overflow-auto md:gap-8 gap-2 justify-center py-6 items-center'>
                                    {categoryProducts.length > 0 ? categoryProducts.filter((e) => (e._id !== id)).map((item) => (
                                        <Link to={`/product/${item._id}`} className='' >
                                            <div key={item._id} className=' border shadow-sm hover:-translate-y-2 shadow-gray-400 rounded-md p-2 ' >
                                                {/* <div className='md:p-2 p-3 '>
                                                    <img src={item.images[0].url} className=' w-full h-full object-cover ' alt={item.name} />
                                                </div> */}
                                                <div className='flex items-center'>
                                                    <img src={item.images[0].url} className='md:h-36 md:w-36 h-28 w-28' alt="" />
                                                </div>
                                                <div className='flex md:w-4/5 font-sans pt-2  md:text-sm text-sm flex-wrap'>
                                                    {item.name}
                                                </div>
                                                <div>
                                                    <Rating readOnly value={item.rating} size="small" />
                                                </div>
                                                <div className='flex text-orange-500 font-medium justify-start items-center'> <span><LiaRupeeSignSolid /></span>
                                                    <span>{item.price}</span>
                                                </div>

                                            </div>
                                        </Link>
                                    )) : null}

                                </div>
                            </div>
                        </>

                }

            </div>

        </>
    )
}




export default ProductDetails