import React from 'react'
import Product from '../../components/Product/Product';
import { BASE_URL } from '../../utils/constants';

const Products = ({isUser,userId}) => {
  return (
    <div className='bg-white py-12' id="shop">
        <h3 className='mt-5 text-3xl md:text-5xl text-black text-center font-extrabold'>Our Products</h3>
        <div className='mt-24'>
            <div>
              <Product url={`${BASE_URL}/api/products/getproducts/get`} isUser={isUser} userId={userId} Add={true} />
            </div>
        </div>
        
    </div>
  )
}

export default Products