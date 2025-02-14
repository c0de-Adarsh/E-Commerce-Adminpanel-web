import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteReviews } from '../Actions/productActions';
import { AiFillDelete } from 'react-icons/ai';
import { Rating } from '@mui/material';

const AdminReviewsTable = ({reviews,productId}) => {
   

    const dispatch = useDispatch()
    
    const sortedOrders = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <>
    <div>
     {
        reviews.length !== 0 ? <table className='w-full text-left text-gray-500  text-sm'>
            
            <thead className='text-xs uppercase bg-blue-500 text-white border-b'>
            <tr className=''>
                        <th scope="col" className="px-6 text-sm py-3">
                            Review ID
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            User
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            Comment
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            Rating
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            Actions
                        </th>
                    </tr>
            </thead>

            <tbody>
            {
                        sortedOrders.map((item, index) => (
                            <tr key={item._id} className="bg-white border-b hover:bg-gray-50 cursor-pointer   ">
                                <th scope="row" className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap ">
                                    {item._id}
                                </th>
                                <td className="px-6 py-4   ">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4   ">
                                    {item.user}
                                </td>
                                <td className="px-6 py-4">
                                <Rating readOnly value={item.rating} size={"small"} />                                
                                </td>
                                <td className="px-6 py-4 flex gap-4 ">                              

                                   <AiFillDelete className='hover:text-red-600' onClick={()=>{
                                    dispatch(deleteReviews(item._id,productId)) ;                                    
                                   }} size={19}/>
                                   
                                </td>
                                
                            </tr>
                        ))

                    }

            </tbody>
        </table> : <p className='text-center text-xl pt-4 '>No Reviews... </p>
     }
    </div>
    </>
  )
}

export default AdminReviewsTable