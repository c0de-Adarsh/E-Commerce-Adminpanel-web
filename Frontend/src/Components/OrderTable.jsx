import React from 'react'
import { useDispatch } from 'react-redux'
import { getOrderDetails } from '../Actions/orderActions'
import { Link } from 'react-router'
import { MdLaunch } from 'react-icons/md'

const OrderTable = ({orders}) => {

    const dispatch = useDispatch()

    const convertDateFormat = (inputDate) => {
        const parts = inputDate.split('-');
        if (parts.length !== 3) {
          return "Invalid date format";
        }
    
        const day = parts[2];
        const month = parts[1];
        const year = parts[0];
    
        return `${day}-${month}-${year}`;
      }

    
      const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
   <>
   <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500  ">
        <thead className="text-xs uppercase bg-blue-500 text-white border-b  ">
        <tr className=''>
                        <th scope="col" className="px-6 text-sm py-3">
                            Order ID
                        </th>
                        <th scope='col' className="px-6 text-sm py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            Item Qty
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            Placed at
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            View
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
                                <td className={`px-6 py-4 ${item.orderStatus === "Processing" ? "text-blue-500" : "text-green-500"}  `}>
                                    {item.orderStatus}
                                </td>
                                <td className="px-6 py-4">
                                    {item.orderItems.length}
                                </td>
                                <td className="px-6 py-4">
                                ₹{item.totalPrice}
                                </td>
                                <td className="px-6 py-4">
                                    {convertDateFormat(item.createdAt.substr(0, 10))}
                                </td>
                                <td className="px-6 py-4">
                                    <Link onClick={()=>{
                                        dispatch(getOrderDetails(item._id))
                                    }} className='hover:text-orange-500' to={`/order/${item._id}`} ><MdLaunch size={20} /></Link>
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

export default OrderTable