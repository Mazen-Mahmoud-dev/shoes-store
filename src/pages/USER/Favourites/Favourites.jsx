import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../../utils/constants';
import axiosInstance from '../../../utils/axiosInstance';
import { Link, NavLink } from 'react-router-dom';
import DeleteProductFromFavourites from '../../../utils/DeleteProductFromFavourites';
import { USERID } from '../Dashboard/Dashboard';
const Favourites = () => {
  const [products,setProducts] = useState([])
  const userId = useContext(USERID)
  const [noFavouriteProductsMsg,setNoFavouriteProductsMsg] = useState('')
    useEffect(()=>{
      const fetchProducts = async () => {
        try {
          const response = await axiosInstance.post(`${BASE_URL}/favourites/get`,{ userId })
          setProducts(response.data?.data || [])
        } catch (error) {
          console.error('Error fetching products', error);
        }
      }
      fetchProducts()
      if(products.length === 0){
        setNoFavouriteProductsMsg('There is No Favourite Products.')
      }else{
        setNoFavouriteProductsMsg('')
      }
    },[products.length,userId])
  return (
    <div className='pt-24 pb-12 bg-gray-300'>
      {          
        noFavouriteProductsMsg ? <p className='text-center text-xl font-bold'>{noFavouriteProductsMsg}<Link className='ml-2 text-blue-500 underline' to='/dashboard/products'>Discover products</Link></p>
      :
      <div>
        <h4 className='text-center text-5xl font-extrabold'>Favourites</h4>
          <div className='mt-12 flex flex-wrap'>
            {products.map((product)=>{
                return(
                    <NavLink className='block card  cursor-pointer group/scaleImage mb-8 w-[250px]  sm:w-[300px] mx-auto bg-slate-100 relative rounded-md '>
                          <div className="image w-full overflow-hidden">
                            <img src={`${BASE_URL}/${product.cover}`} alt="product" 
                            className='w-full h-48 rounded-md scale-100 group-hover/scaleImage:scale-125 transition-all duration-500  ease-in-out' />
                          </div>
                          <div className="info p-5">
                            <div className="text mb-5">
                              <h4 className='font-extrabold text-2xl'>{product.title}</h4>
                              <p className='text-[#777] leading-6 font-serif my-4'>{product.description.slice(0,300)}...</p>
                              <p>price:<span className='text-[#777] ml-2'>{product.price}$</span></p>
                            </div>
                            <div className="links">
                              <span 
                              className='absolute top-0 right-0 mr-3 mt-2 z-50'
                              onClick={  async()=> {
                                  await DeleteProductFromFavourites(userId,product._id);
                                  const updatedProducts = products.filter((item) => item._id !== product._id);
                                  setProducts(updatedProducts)
                                }
                                }><i class="fa-solid fa-x"></i></span>
                            </div>
                          </div>  
                    </NavLink>
                )
              })}            
          </div>
      </div>
    }
    </div>
  )
}

export default Favourites