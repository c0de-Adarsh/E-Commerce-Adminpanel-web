import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteOrder } from '../Actions/orderActions'
import { MdModeEditOutline } from 'react-icons/md'
import { Link } from 'react-router'
import { AiFillDelete } from 'react-icons/ai'

const AdminOrdersTable = ({orders}) => {

    const dispatch = useDispatch()

    const convertDateFormat = (inputDate) =>{
        const parts = inputDate.split('-')

        if(parts.length !== 3){
            return 'Invalid Date Format'
        }

        const day = parts[2];    
        const month = parts[1];
        const year = parts[0];

        return `${day}-${month}-${year}`
    }

    const sortedOrders = [...orders].sort((a,b)=> new Date(b.createAt) - new Date(a.createAt))
  return (
  <>
  <div className="relative overflow-x-auto pb-24">
   <table className="w-full text-sm text-left text-gray-500  ">
    <thead className="text-xs bg-blue-500 text-white uppercase  border-b  ">
    <tr>
                            <th scope="col" className="px-6 text-sm py-3">
                                Product ID
                            </th>
                            <th scope="col" className="px-6 text-sm py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 text-sm py-3">
                                Item Qty
                            </th>
                            <th scope="col" className="px-6 text-sm py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 text-sm py-3">
                                Placed on
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
                                    <td className={`px-6 py-4  ${item.orderStatus === "Processing" ? "text-blue-600" : "text-green-600"} `}>
                                        {item.orderStatus}
                                    </td>
                                    <td className="px-6 py-4   ">
                                        {item.orderItems.length}
                                    </td>
                                    <td className="px-6 py-4">
                                        ₹{item.totalPrice}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {convertDateFormat(item.createdAt.substr(0, 10))}
                                    </td>
                                    <td className="px-6 py-4 flex gap-4 ">
                                        <Link onClick={() => {
                                            dispatch(getOrderDetails(item._id))
                                        }} to={`/admin/order/${item._id}`}>  <MdModeEditOutline size={19} /> </Link>

                                        <AiFillDelete onClick={() => {
                                            dispatch(deleteOrder(item._id));
                                        }} size={19} />

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

export default AdminOrdersTable