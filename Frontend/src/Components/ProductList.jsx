import React, { useEffect, useState } from 'react'
import Metadata from './Metadata'
import  Sidebar  from './SideBar'
import { BiMenuAltLeft } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsForAdmin } from '../Actions/productActions'
import Loader from './Loader'
import AdminProductTable from './AdminProductTable'

const ProductList = () => {


    const dispatch = useDispatch()
  const { adminProducts, loading } = useSelector(state => state.products)
  const [sideToggle, setSideToggle] = useState(false)

  useEffect(() => {
    dispatch(getAllProductsForAdmin())
  }, [])

    
  return (
   <>
   <Metadata title='ProductList'/>
   <div className='min-h-screen pt-14'>
    <span onClick={()=> setSideToggle(!sideToggle)} className='cursor-pointer z-20 fixed '>
    <BiMenuAltLeft size={44} />
    </span>
    <Sidebar sideToggle={sideToggle} />

    {
    loading || adminProducts.length === 0 ? <Loader /> :

    <>
    <div className='text-center py-4 text-2xl font-medium'>
        <p>All Products</p>
    </div>
    <AdminProductTable products={adminProducts}/>
    </>
    }
   </div> 
   </>
  )
}

export default ProductList