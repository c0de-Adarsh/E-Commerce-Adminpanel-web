import React from 'react'
import HomeHeader from '../Components/HomeHeader'
import Loader from '../Components/Loader'
import Metadata from '../Components/Metadata'
import Products from '../Components/Products'

const Home = () => {
  return (
   <>
   <Metadata title='Shopmart'/>
   <HomeHeader />
   <Products/>
   </>
  )
}

export default Home