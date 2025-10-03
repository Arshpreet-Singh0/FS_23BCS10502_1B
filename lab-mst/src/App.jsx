import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import Todo from './Todo'

const App = () => {

  const products = [
    {
      name : "laptop",
      price : 55000,
      description : "8gb RAM, 512gb Storage, 16 inch screen",
      inStock : true,
    },
    {
      name : "Mobile",
      price : 35000,
      description : "8gb RAM, 128gb Storage, 120hz Refresh Rate",
      inStock : false,
    },
    {
      name : "Watch",
      price : 23000,
      description : "8gb RAM, 512gb Storage, 16 inch screen",
      inStock : true,
    },
  ]


  return (
    <div className='w-screen min-h-screen flex justify-center items-center gap-10 flex-col'>

      <div className='flex justify-center items-center gap-10'>
        {
        products.map((p, idx)=>(
          <ProductCard name={p.name} price={p.price} description={p.description} inStock={p.inStock} key={idx}/>
        ))
      }
      </div>

      <Todo />

    </div>
  )
}

export default App