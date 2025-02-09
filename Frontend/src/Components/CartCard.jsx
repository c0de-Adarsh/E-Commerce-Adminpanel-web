import React from 'react'

const CartCard = ({item}) => {
  return (
    <>
    <div>
        <div>
            <img src={item.image} alt="" />
        </div>
        <div>
            <p></p>
            <p></p>
            <span>Remove</span>
        </div>
    </div>
    </>
  )
}

export default CartCard