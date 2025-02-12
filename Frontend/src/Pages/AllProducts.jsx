import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import Metadata from '../Components/Metadata'
import Search from '../Components/Search'
import Loader from '../Components/Loader'
import { BsCart4 } from 'react-icons/bs'
import PProduct from '../Components/PProduct'
import { Pagination, Slider } from '@mui/material'
import { getProducts } from '../Actions/productActions'

const AllProducts = () => {


    const categories = [
        "Electronics",
        "Mens",
        "Womens",
        "Books",
        "Footwear",
        "Home",
        "Sports"
    ]

    const { keyword } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { products, loading, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products)

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("")

    const [ratings, setRatings] = useState(0)

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
      }
    
      const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
      }

      useEffect(() => {
        dispatch(getProducts(keyword, currentPage, price, category, ratings))
      }, [dispatch, keyword, currentPage, price, category, ratings])

    const removeFilterHandler = () => {
        setPrice([0, 25000])
        setCategory("")
        setRatings(0)
        navigate("/products")
        setCurrentPage()
      }
    return (
        <>
            <Metadata title='Products' />

            <div className='min-h-screen pt-16 pb-20'>
                {
                    !loading ? <div className='flex justify-center items-center p-6'>
                        <Search />
                    </div> : null
                }

                {
                    loading ? <Loader /> :

                        <>
                            <div className='flex justify-center items-center flex-col text-2xl pt-2 pb-3'>




                                <span className='flex justify-center items-center border md:pt-0 border-gray-500 pb-1 border-x-0 gap-1  border-t-0 px-12'>  <BsCart4 />Products</span>
                            </div>



                            {
                                products.length !== 0 ?

                                    <div className='grid md:grid-cols-4 grid-cols-2 md:gap-6 py-8 px-6 gap-3 md:pl-52 justify-items-end'>
                                        {
                                            products.map((product, i) => {
                                                return (
                                                    <PProduct key={i} product={product} />
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className='text-xl py-20 min-h-[60vh] text-center'>
                                        No products matching your preferences yet. Check back later!
                                    </div>
                            }





                            {/* filter for desktop */}

                            <div className='w-44 pl-8 absolute md:top-52 md:flex md:flex-col hidden'>
                                <p className='text-lg font-medium'>Price Range</p>
                                <Slider
                                    value={price}
                                    onChange={priceHandler}
                                    valueLabelDisplay="auto"
                                    aria-labelledby='range-slider'
                                    min={0}
                                    max={25000}

                                />



                                <p className='text-lg font-medium pt-3'>Categories</p>
                                <div className='list-none'>
                                    {
                                        categories.map((category) => (

                                            <li className='hover:text-red-600 font-normal cursor-pointer '  key={category} onClick={
                                                () => {
                                                    setCategory(category)
                                                }
                                            }>

                                                {category} </li>
                                        ))
                                    }
                                </div>



                                <div>
                                    <p className='text-lg font-medium pt-3'>Rating Above</p>
                                    <Slider
                                        value={ratings}
                                        onChange={(e, newRating) => {
                                            setRatings(newRating);

                                        }}
                                        aria-labelledby="continuous-slider"
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={5}

                                    />
                                </div>

                                <div className='pt-6'>
                <button className='text-left py-1  px-3 text-white font-semibold rounded hover:bg-orange-400 bg-orange-500' onClick={()=>{
                  removeFilterHandler()
               
                }}>Remove Filters</button>
              </div>
            </div>




                                {/* filter for mobile  */}
                                <div className='md:hidden flex flex-col pl-8 left-4  pb-8'>
                                    <p className='text-lg font-medium'>Price Range</p>
                                    <div>
                                        <Slider
                                            value={price}
                                            onChange={priceHandler}
                                            valueLabelDisplay="auto"
                                            aria-labelledby='range-slider'
                                            min={0}
                                            max={25000}

                                        />
                                    </div>




                                    <p className='text-lg font-medium pt-3'>Categories</p>
                                    <div className="list-none">
                                        {
                                            categories.map((category) => (
                                                <li key={category}>{category}</li>
                                            ))
                                        }
                                    </div>



                                    <p className='text-lg font-medium pt-3'>Rating Above</p>
                                    <div  className="w-52 pl-8  md:hidden md:flex-col flex ">
                                        <Slider
                                            value={ratings}
                                            onChange={(e, newRating) => {
                                                setRatings(newRating);
                                            }}
                                            aria-labelledby="continuous-slider"
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={5}

                                        />
                                    </div>


                                    <div className='pt-24'>
                                        <button className='text-left py-1  px-3 text-white font-semibold rounded hover:bg-orange-400 bg-orange-500' onClick={removeFilterHandler}>Remove Fillter</button>
                                    </div>
                                </div>



                                <div className='pt-24'>
                                {
                resultPerPage < productsCount && (
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass='page-item font-bold border  hover:bg-gray-200'
                    linkClass="page-link"
                    activeClass="pageItemActive text-red-700 border border-black "
                    activeLinkClass="pageLinkActive  "


                  />
                )
              }
                                </div>
                            
                        </>
                }
            </div>
        </>
    )
}

export default AllProducts