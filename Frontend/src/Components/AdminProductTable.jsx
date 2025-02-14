import React from 'react'
import Metadata from './Metadata'
import { useDispatch } from 'react-redux'
import { AiFillDelete } from 'react-icons/ai'
import { deleteProduct, getProductDetails } from '../Actions/productActions'
import { MdModeEditOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'

const AdminProductTable = ({products}) => {

    const dispatch = useDispatch()

    const convertDateFormat = (inputDate) =>{
        const parts = inputDate.split('-')

        if(parts.length !== 3){
            return 'Invalid Date format'
        }

        const day = parts[2];    
        const month = parts[1];
        const year = parts[0];

        return `${day}-${month}-${year}`;
    }

     const sortedOrders = [...products].sort((a,b)=> new Date(b.createdAt) - new Date (a.createdAt))
    return (

        <>
            <div className=' relative overflow-x-auto pb-24'>
                <table className='w-full text-sm text-left text-gray-500'>
                    <thead className='text-xs uppercase bg-blue-500 text-white border-b'>
                        <tr className=''>
                            <th scope="col" className="px-6 text-sm py-3">
                                Product ID
                            </th>
                            <th scope="col" className="px-6 text-sm py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 text-sm py-3">
                                Stock
                            </th>
                            <th scope="col" className="px-6 text-sm py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 text-sm py-3">
                                Created on
                            </th>
                            <th scope="col" className="px-6 text-sm py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sortedOrders.map((item,index)=>(
                                <tr key={item._id} className="bg-white border-b hover:bg-gray-50 cursor-pointer   ">
                                <th scope="row" className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap ">
                                    {item._id}
                                </th>
                                <td className="px-6 py-4   ">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4   ">
                                    {item.stock}
                                </td>
                                <td className="px-6 py-4">
                                ₹{item.price}
                                </td>
                                <td className="px-6 py-4 ">
                                    {convertDateFormat(item.createdAt.substr(0, 10))}
                                </td>
                                <td className="px-6 py-4 flex gap-4 ">
                               <Link onClick={()=>{
                                dispatch(getProductDetails(item._id))
                               }} to={`/admin/product/${item._id}`}>  <MdModeEditOutline size={19} /> </Link>

                                   <AiFillDelete onClick={()=>{
                                    dispatch(deleteProduct(item._id)) ;                                    
                                   }} size={19}/>
                                   
                                </td>
                                
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminProductTable