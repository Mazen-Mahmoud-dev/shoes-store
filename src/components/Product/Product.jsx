import React, { useState,useEffect } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, NavLink } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';
import addProductToFavourites from '../../utils/AddProductsToFavourites';
import DeleteProductFromFavourites from '../../utils/DeleteProductFromFavourites';
import { BASE_URL } from '../../utils/constants';

const Product = ({url,isUser,Add }) => {
  const [products , setProducts] = useState([])
  const [countProducts, setCountProducts] = useState(2);
  const userId = localStorage.getItem("userId")
  const [noFavouriteProductsMsg,setNoFavouriteProductsMsg] = useState('')
  const handleResize = () => {
    const width = window.innerWidth;
    setCountProducts(width < 640 ? 1 : 2);
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if(products.length === 0){
          const response = Add
                ? await axios.get(url)
                : await axios.post(url, { userId });
            setProducts(response.data?.data?.products || response.data?.data || []);
          return;
        }
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    if(products.length === 0){
      setNoFavouriteProductsMsg('There is No Favourite Products.')
    }else{
      setNoFavouriteProductsMsg('')
    }

    fetchProducts();
    handleResize()
  }, [userId,url,Add,products.length]);

  const EditProduct = async (e,product)=>{
    if(isUser){
        e.preventDefault();
        if(Add){
            addProductToFavourites(userId,product._id,product)

        }else{
            await DeleteProductFromFavourites(userId,product._id)
            window.location.reload();
        }
    }
    
  }
  return (
   <>
      {!Add && (
          noFavouriteProductsMsg && <p className='text-center text-xl font-bold'>{noFavouriteProductsMsg}<Link className='ml-2 text-blue-500 underline' to='/dashboard/products'>Discover products</Link></p>
      )}
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
                          <SwiperSlide className='flex items-center justify-evenly' key={product._id}>
                                  <Link to={`/products/${product._id}`} className="pb-8 mx-auto bg-white flex flex-col w-56 rounded-md items-center justify-center  md:w-3/5 shadow-xl drop-shadow-md p-3 transition-all hover:scale-110 hover:pb-12 hover:pt-4"  key={product._id}>
                                      <div className='w-full'>
                                        <img className="w-full h-48 my-3"  src={`${BASE_URL}/${product.cover}`} alt={product.title} />
                                      </div>
                                      <div className="text-primary w-full">
                                        <h4 className="text-center mb-3 text-xl font-extrabold  w-full  text-black py-2   border-b-4 border-b-solid border-b-slate-50 font-mono">{product.title.slice(0,30)}</h4>
                                        <p className="my-8 text-left">{product.description.slice(0,220)}...<Link to={`/products/${product._id}`} className='font-extrabold text-blue-500'>Read More</Link></p>
                                        <h5 className='my-3 ml-2 font-extrabold'>price: <span className='text-black bg-slate-300 rounded-md py-1 px-2'>{product.price}$</span></h5>
                                        <div className="flex items-center justify-evenly w-full mt-8">
                                              <NavLink to={!isUser ? '/signup' : `/products/${product._id}`} className='bg-blue-950 hover:bg-gray-900 transition rounded-md p-2 px-3'><i class="fa-solid fa-arrow-up-right-from-square text-white text-xl"></i> </NavLink>                                              
                                              <NavLink to={!isUser && '/signup'} onClick={(e)=>EditProduct(e,product)}   className='outline outline-1 outline-red-500 rounded-md p-2 px-3 hover:bg-red-500 transition-all group'>{Add ? (<i className="fa-solid fa-heart text-red-500 text-xl group-hover:text-white transition-all"></i>):(<i className="bi bi-trash text-red-500 text-xl group-hover:text-white transition-all"></i>)}</NavLink>
                                         </div>
                                      </div>
                                  </Link> 
                          </SwiperSlide>     
                          )
                    })}
    </Swiper>
   </>
    
  )
}

export default Product