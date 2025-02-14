import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';

 const Search = ({products}) => {

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`)
      setKeyword('')
    } else {
      navigate('/products')
      setKeyword('')
    }
  }





  return (
    <>
      <div className='md:w-[30vw] w-[70vw]  flex  rounded '>

      <input onKeyPress={(e)=>e.key === 'Enter' ? searchSubmitHandler(e) : null} value={keyword}  placeholder='Search for Products' className='px-2 bg-gray-100  py-2 outline-none placeholder:font-extrabold w-full rounded-l border border-gray-400 ' type="text"
      onChange={(e)=> setKeyword(e.target.value)}
      />

      <button onClick={searchSubmitHandler} className='bg-blue-600 hover:bg-blue-400 rounded rounded-l-none cursor-pointer  px-4 text-white'>Search</button>

      </div>


    </>
  )
}


export default Search