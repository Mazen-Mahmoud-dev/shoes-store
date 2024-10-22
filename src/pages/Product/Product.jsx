import React, { useEffect, useRef, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios'
import { XMarkIcon } from '@heroicons/react/24/outline'
import addProductToFavourites from '../../utils/AddProductsToFavourites';
import NavBar from '../../components/NavBar/NavBar';
import { BASE_URL } from '../../utils/constants';



// const productS = {
//     name: 'Basic Tee 6-Pack ',
//     price: '$192',
//     rating: 3.9,
//     reviewCount: 117,
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
//     imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
//     colors: [
//       { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//       { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//       { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//     ],
//     sizes: [
//       { name: 'XXS', inStock: true },
//       { name: 'XS', inStock: true },
//       { name: 'S', inStock: true },
//       { name: 'M', inStock: true },
//       { name: 'L', inStock: true },
//       { name: 'XL', inStock: true },
//       { name: 'XXL', inStock: true },
//       { name: 'XXXL', inStock: false },
//     ],
//   }

  
const Product = ({addToCart}) => {
    const {productId} = useParams()
    let [product,setProduct] = useState({})
    const userId = localStorage.getItem("userId")
    const [selectedSize, setSelectedSize] = useState('');
    const [error,setError] = useState("")
    const imageShow = useRef()
    const changeImage = (imagePath)=>{
      imageShow.current.src = `${BASE_URL}/${imagePath}`
    }
    const handleSelectChange = (e) => {
      setSelectedSize(e.target.value); // Update state with selected option
    };
    useEffect(()=>{
        const fetchProduct = async ()=>{
            try{
                const response = await axios.get(`${BASE_URL}/api/products/${productId}`)
                setProduct(response.data.data.product)
            }  
            catch (error) {
                console.error('Error fetching the product', error);
              }
        }
        fetchProduct()
    },[])
  return (

      <div>
        <NavBar userInfo={true} />
        <div className="flex min-h-full md:pb-5 mt-24 overflow-x-hidden md:overflow-hidden  items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <div className="md:relative flex w-full justify-evenly items-center mx-12 bg-white px-4 md:pb-8  sm:px-6 sm:pt-8 md:p-6 lg:p-8 h-[1100px] md:h-[600px]">
              <NavLink to='/dashboard/products'>
              <button
                type="button"
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
              </NavLink>

              <div className="flex justify-between items-center  pb-8 md:flex-row flex-col  gap-x-6 gap-y-8">
                <div className="md:absolute flex flex-col items-center md:w-56">
                <img alt={product.title} ref={imageShow} src={`${BASE_URL}/${product.cover}`} className="h-52 w-full " />
                <div className='mt-4 flex gap-x-3 items-center'>
                    <img alt={product.title} onMouseOver={()=>changeImage(product.cover)} src={`${BASE_URL}/${product.cover}`} className="w-24 hover:cursor-pointer h-24" />
                    {product.images?.map((imagePath)=>{
                      return(
                        <img onMouseOver={()=>changeImage(imagePath)} src={`${BASE_URL}/${imagePath}`} alt="product" className=" w-24 hover:cursor-pointer h-24"  />
                      )
                    })}
                  </div>
                </div>
                <div className='text-left md:w-1/2 md:relative md:left-1/2 md:top-12'>
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 ">{product.title}</h2>
                  <section aria-labelledby="information-heading" className="mt-8">
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>
                    <label htmlFor="">description: </label>
                    <p className="text-sm leading-5 text-gray-900 font-extrabold bg-slate-200 p-2 rounded w-56 sm:w-3/4">{product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt exercitationem sit libero qui quos, ab, quia commodi voluptas minima aperiam consequatur modi nostrum rem. Exercitationem.</p>
                    
                    <p className="text-xl flex items-center gap-x-3 sm:text-2xl text-gray-900 font-extrabold mt-8"><span className='font-normal text-sm text-slate-400'>price:</span>{product.price}$</p>
                    <div>
                      <label className='text-xl font-bold' for="sizes">Size:</label>
                      <div>
                        <select value={selectedSize} onChange={handleSelectChange} className='px-5 py-1 flex items-center justify-center ml-4 my-2 text-center cursor-pointer border border-1 border-[#ddd] border-solid'>
                          <option value="" disabled >Select</option>
                          {product.details?.map((detail)=>{
                          return(
                            <option value={detail.size} selected >{detail.size}</option>
                          )
                        })}
                        </select>
                    
                      </div>
                    </div>
                  </section>
                        {error && <p className='mt-2 sm:mt-4 text-red-500 text-sm'>{error}</p>}
                  <section aria-labelledby="options-heading">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>
                    <button
                      className="
                      mt-2 w-1/3
                      flex items-center justify-center
                      rounded-md outline outline-2 outline-green-300  group bg-green-500 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      onClick={() =>{
                        if(!selectedSize){
                          setError("Please Enter the size.")
                          return;
                        }
                        product.details?.map( (detail)=>{
                          if(detail.size === selectedSize){
                            if(detail.stock !== 0){
                              product = {...product,details:[{size:detail.size}]}
                              
                              addToCart(product,userId)
                              setError('')
                            }else{
                              setError("No Stock!")
                            }
                          }
                        }) 
                        
                      } }
                    >
                      <i className="fa-solid fa-cart-plus text-white text-2xl group-hover:text-white transition-all"></i>
                    </button>
                    <button
                      className="mt-2 sm:mt-6 flex w-1/6 items-center justify-center rounded-md bg-transparent outline outline-2 outline-red-500  px-8 py-3 hover:bg-red-700 group"
                      onClick={()=>addProductToFavourites(userId,product._id,product)}
                    >
                      <i className="fa-solid fa-heart text-red-500 text-2xl group-hover:text-white transition-all"></i>
                    </button>
                  </section>
                </div>
              </div>
            </div>

        </div>
      </div>
    
  )
}

export default Product






