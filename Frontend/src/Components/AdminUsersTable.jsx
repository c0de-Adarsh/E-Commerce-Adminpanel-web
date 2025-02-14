import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { deleteUser } from '../Actions/userActions'

const AdminUsersTable = ({users}) => {

    const dispatch = useDispatch()

    const convertDateFormat = (inputDate) =>{
        const parts = inputDate.split('-')

        if(parts.length !== 3){
            return 'Invalid DateFormat'
        }
        const day = parts[2];    
        const month = parts[1];
        const year = parts[0];
    

        return `${day}-${month}-${year}`
    }

    const sortedOrders = [...users].sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
  return (
    <>
    <div className='relative overflow-x-auto pb-24'>
        <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs bg-blue-500 text-white uppercase border-b'>
            <tr className=''>
                        <th scope="col" className="px-6 text-sm py-3">
                            User ID
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            Joined on
                        </th>
                        <th scope="col" className="px-6 text-sm py-3">
                            Actions
                        </th>
                    </tr>
            </thead>


            <tbody>
                {
                    sortedOrders.map((item,index) =>(
                        <tr key={item._id} className='bg-white border-b hover:bg-gray-50 cursor-pointer'>
                            <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                            {item._id}
                            </th>

                            <td className='px-6 py-4'>
                                {item.name}
                            </td>


                            <td className='px-6 py-4'>
                                {item.email}
                            </td>

                            <td  className={`px-6 py-4 ${item.role === 'admin' ? "text-green-600":"text-blue-600"}`}>
                                {item.role}
                            </td>

                            <td className='px-6 py-4'>
                            {convertDateFormat(item.createdAt.substr(0, 10))}
                            </td>

                            <td className='px-6 py-4 flex gap-4'>
                                <Link  className='hover:text-blue-600' onClick={()=>{

                                }} to={`/admin/user/${item._id}`}>
                                <MdModeEditOutline size={19} />
                                </Link>
                                <AiFillDelete className='hover:text-red-500' onClick={()=>{
                                    dispatch(deleteUser(item._id)) ;                                    
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

export default AdminUsersTable