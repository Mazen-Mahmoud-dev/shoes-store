import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Cart from '../../pages/USER/Cart/Cart';
import Product from '../../pages/USER/Product/Product';
import { BASE_URL } from '../../utils/constants';


const CartRoute = () =>{
  const addToCart = (product,userId) => {
    axios.post(`${BASE_URL}/api/cart`, { product,userId });
  };
 
  const removeFromCart = (userId,product) => {
    axios.delete(`${BASE_URL}/api/cart/${product._id}`,{
        data:{
            userId,
            product
        }
    });
  };
  const emptyCart = (userId)=>{
    axios.delete(`${BASE_URL}/api/cart/empty/all?userId=${userId}`);
  }
  return (
    <>
        
        <Routes>
            <Route path='dashboard/cart' element={<Cart removeFromCart={removeFromCart} emptyCart={emptyCart} />} />
            <Route path='products/:productId' element={<Product addToCart={addToCart} />} />
        </Routes>
    </>
    
  );
}

export default CartRoute;
