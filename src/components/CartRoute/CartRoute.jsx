import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

import Cart from '../../pages/Cart/Cart';
// import Checkout from './Checkout';
import Product from '../../pages/Product/Product';
import { BASE_URL } from '../../utils/constants';

const CartRoute = () =>{

  // Add item to cart
  const addToCart = (product,userId) => {
    axios.post(`${BASE_URL}/api/cart`, { product,userId });
  };
 
  // Remove item from cart
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
