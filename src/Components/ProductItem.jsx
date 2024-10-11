// import React from 'react'

import { useContext } from "react"
import { ShopContext } from "../Context/ShopContext"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ProductItem = ({_id,image,name,price}) => {

    const {currency} = useContext(ShopContext)
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${_id}`}>
        <div className="overflow-hidden">
            <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />

        </div>
        <p className="text-sm pt-3 pb-1">{name }</p>
        <p className="text-sm font-medium">{currency }{price}</p>
    </Link>
  )
}

export default ProductItem
