import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { BiSolidUserCircle } from 'react-icons/bi'


 const ReviewCard = ({ review, rating }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: rating,
        isHalf: true,
    }
   
    return (
        <>

            <div className='flex flex-col p-3 shadow-sm shadow-slate-400  justify-center items-center md:w-1/4 w-full border rounded-md '>
                <div className=''> <BiSolidUserCircle size={44} /> </div>
                <p>{review.name}</p>
                <ReactStars {...options} />
                <span className='text-medium' >{review.comment}  </span>

            </div>

        </>
    )
}

export default ReviewCard