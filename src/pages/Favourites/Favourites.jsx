import React from 'react'

import Product from '../../components/Product/Product';
import { BASE_URL } from '../../utils/constants';
const Favourites = ({userId}) => {

  return (
    <div className='pt-24 pb-12 bg-gray-300'>


          <div>
            <h4 className='text-center text-5xl font-extrabold'>Favourites</h4>
            <div className='mt-12'>
              <Product isUser={true} userId={userId} url={`${BASE_URL}/favourites/get`} />
            </div>
          </div>
      
    </div>
  )
}

export default Favourites