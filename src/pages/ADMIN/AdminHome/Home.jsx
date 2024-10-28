import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <h3 className='text-xl my-2 text-center font-extrabold text-slate-50 bg-gray-900 py-3'>Hello In Your Admin Dashboard</h3>
        <div className='flex flex-col justify-center items-center  gap-24 mt-20'>
          <Link to='/admin/dashboard/users' className='btn-primary text-center w-1/2 py-4 bg-gray-900 hover:bg-primary text-xl font-extrabold'>All users</Link>
          <Link to='/admin/dashboard/products' className='btn-primary text-center w-1/2 py-4 bg-gray-900 hover:bg-primary text-xl font-extrabold'>All Products</Link>
          <Link to='/admin/dashboard/add-product' className='btn-primary text-center w-1/2 py-4 bg-gray-900 hover:bg-primary text-xl font-extrabold'>Add Product</Link>
        </div>
    </div>
  )
}

export default Home