import React from 'react'

const ProductCard = ({name, price, description, inStock}) => {
  return (
    <div className='p-5 border border-black rounded-lg w-64 h-64'>

        <h1 className='font-semibold text-xl'>{name}</h1>
        <p>description : {description}</p>
        <p>Price : {price}</p>

        <div className='mt-5'>
          {
          inStock ? (
            <button className='bg-blue-800 w-full rounded py-2 text-white'>Buy Now</button>
          ) : (
            <p className='text-red-500'>* Out Of Stock</p>
          )
        }
        </div>

    </div>
  )
}

export default ProductCard