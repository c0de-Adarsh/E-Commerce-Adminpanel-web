import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviews } from '../Actions/productActions'
import Metadata from '../Components/Metadata'
import { BiMenuAltLeft } from 'react-icons/bi'
import SideBar from '../Components/SideBar'
import { AiOutlineIdcard } from 'react-icons/ai'
import Loader from '../Components/Loader'
import AdminReviewsTable from '../Components/AdminReviewsTable'

const ProductReview = () => {

    const {allReviews , loading} = useSelector(state=> state.products)
    const [sideToggle , setSideToggle] = useState(false)

    const dispatch = useDispatch()

    const [productId , setProductId] = useState('')

    useEffect(() => {
        dispatch(getAllReviews(productId))
      
      }, [])

      const productReviewHandler = () =>{
        dispatch(getAllReviews(productId))
      }
  return (
   <>
   <Metadata title='Product Review'/>
   <div className='min-h-screen pt-14'>
   <span onClick={()=> setSideToggle(!sideToggle)} className=' cursor-pointer fixed z-20'>
   <BiMenuAltLeft size={44} />
   </span>
   <SideBar sideToggle={sideToggle}/>

   <div className='text-center py-4 text-2xl font-medium'>
          <p>Product Reviews</p>
        </div>




        <div className='grid grid-cols-1 justify-items-center pb-12 pt-6'>
            <div className='gap-4 flex flex-col md:w-1/3'>
                <div className='relative pl-3 rounded border border-gray-500 py-1 flex justify-around items-center'>
                <AiOutlineIdcard className='text-gray-500 ' size={26} />
                <input  type="text"
                placeholder='Product Id'
                required
                onChange={(e)=>setProductId(e.target.value)}
                className=' w-full pl-4 outline-none py-1 pr-4' />
                </div>

                {
                    loading ? <div className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 flex justify-center items-center'>
                        <div role="status">
                <svg aria-hidden="true" className="w-6 h-6 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
                    </div> : 
                    <input type="submit" onClick={productReviewHandler} value="Search" className='w-full cursor-pointer bg-blue-600 py-2 text-white font-medium rounded hover:bg-blue-500 '/>}
                
            </div>
        </div>


        {
            loading ? <Loader /> : 
            <>
            {productId.length -1 !== 24 ? <AdminReviewsTable reviews={allReviews} productId={productId} />: <p>No Review</p>}
            </>
        }

   </div>
   </>
  )
}

export default ProductReview