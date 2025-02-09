import React, { useEffect } from 'react'
import HomeHeader from '../Components/HomeHeader'
import Loader from '../Components/Loader'
import Metadata from '../Components/Metadata'
import Products from '../Components/Products'
import { useDispatch, useSelector } from 'react-redux'
import { getEveryProduct } from '../Actions/productActions'

const Home = () => {

  const { allProducts, loading, error } = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getEveryProduct())

}, [dispatch, error])
  return (
   <>
   <Metadata title='Shopmart'/>
   <HomeHeader  products={allProducts}/>
   <Products products={allProducts.slice(0,12)} loading={loading}/>
   </>
  )
}

export default Home