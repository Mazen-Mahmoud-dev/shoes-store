import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../../utils/constants';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { NavLink } from 'react-router-dom';
import addProductToFavourites from '../../../utils/AddProductsToFavourites';
import { USERID } from '../Dashboard/Dashboard';
import { fetchData } from '../../../utils/FetchData';

const Products = ({isUser}) => {
  const [products,setProducts] = useState([])
  const [countProducts, setCountProducts] = useState(2);
  const userId = useContext(USERID)
      
      useEffect(()=>{
        const handleResize = () => {
          let width = window.innerWidth;
          setCountProducts(width < 640 ? 1 : 2);
        };
        handleResize()
        fetchData(`${BASE_URL}/api/products/getproducts/get`,setProducts,(data)=>data?.data?.products,'Error fetching products')
      },[])

  return (
    <div className='bg-white py-16' id="shop">
          <div>
            <h2 className="text-[#ebeced] text-[100px] text-center font-extrabold tracking-[-3px] capitalize">our products</h2>
            <p className="mt-[-40px] text-[20px] text-center text-[#797979]">all you need is here</p>
          </div>
        <div className='mt-24'>
            <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={countProducts}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    
                  >
              {products.map((product)=>{
                return(
                  <SwiperSlide key={product._id}>
                      <NavLink to={!isUser ? '/signup' : `/products/${product._id}`}
                      className='block card group group/scaleImage cursor-pointer w-[250px]  sm:w-[300px] mx-auto bg-slate-100 relative
                      before:content-[""] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-white before:bg-opacity-0 hover:before:bg-opacity-50 before:transition-all before:duration-150 before:rounded-md rounded-md '>
                            <div className="image w-full overflow-hidden ">
                              <img src={`${BASE_URL}/${product.cover}`} alt="product" 
                              className='w-full h-48  rounded-md scale-100 group-hover/scaleImage:scale-125 transition-all duration-500  ease-in-out' />
                            </div>
                            <div className="info p-5">
                              <div className="text mb-5">
                                <h4 className='font-extrabold'>{product.title}</h4>
                                <p className='text-[#777] leading-6 font-serif my-4'>{product.description.slice(0,300)}...</p>
                                <p className='mt-4'>price:<span className='text-[#777] ml-2'>{product.price}$</span></p>
                              </div>
                              <div className="links flex justify-center items-center">
                                <NavLink to={!isUser && '/signup'}
                                  onClick={(e)=>{
                                      isUser && e.preventDefault();
                                      addProductToFavourites(userId,product._id,product)
                                  }}
                                className='relative z-10 outline outline-1 outline-red-500 rounded-md py-3 px-4 hover:bg-red-500 transition-all group/heart'><i className="fa-solid fa-heart text-red-500 text-2xl group-hover/heart:text-white transition-all"></i></NavLink>
                                
                              </div>
                            </div>
                            
                      </NavLink>
                  </SwiperSlide>
                )
              })}
            </Swiper>
        </div>
        
    </div>
  )
}

export default Products