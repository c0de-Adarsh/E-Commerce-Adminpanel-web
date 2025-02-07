import React from 'react'

const Search = () => {
  return (
   <>
   <div className='md:w-[30vw] w-[70vw] flex rounded'>
     <input type="text" placeholder='Search for Products' className='px-2 bg-gray-100 py-2 outline-none placeholder:font-extrabold w-full rounded-1 border border-gray-400' />
     <button className='bg-blue-600 rounded rounded-1-none cursor-pointer px-4 text-white'>Search</button>
   </div>
   </>
  )
}

export default Search