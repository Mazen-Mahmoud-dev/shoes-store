import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../utils/constants';
import { fetchData } from '../../../utils/FetchData';
import NavBar2 from '../../../components/NavBar/NavBar2';

function Cart({ removeFromCart,emptyCart }) {
    const userId = localStorage.getItem("userId")
    let [cart,setCart] = useState([])
    const navg = useNavigate()
    let price = 0;
    useEffect(()=>{
        fetchData(`${BASE_URL}/api/cart?userId=${userId}`,setCart,(data)=>data.data,'Error Fetching Cart Products')
    },[userId])
    const handleRemoveFromCart  = async(userId,product)=>{
        await removeFromCart(userId,product);
        
        //const updatedCart = cart.filter((item) => item._id !== product._id);
        const updatedCart = cart.map((item) => {
            if (item._id === product._id) {
              if (item.count > 1) {
                return { ...item, count: item.count - 1 };
              } else {
                return null;
              }
            }
            return item;
          }).filter(Boolean);
        setCart(updatedCart);
        
    };
    
  return (
    <div>
        <NavBar2  userInfo={true} />
        <div className='pt-24'>
                <h4 className='text-4xl font-extrabold capitalize text-center mb-12'>Your Cart</h4>
            {cart.length === 0 ? (
                <div className='text-center'>
                    <p className='text-2xl'>Your cart is empty</p>
                    <Link to='/dashboard/products' className='text-blue-500 underline '>Discover products.</Link>
                </div>
            ) : (
                <>
                    <div className="container mx-auto px-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-slate-50 border-4 border-slate-100">
                                <thead className="bg-slate-50 text-primary">
                                    <tr className='border-4 border-primary'> 
                                        <th className="w-1/6 py-3 px-4 uppercase font-semibold border-4 border-primary text-center text-sm">
                                            id
                                        </th>
                                        <th className="w-1/3 text-center py-3 px-4 capitalize font-semibold border-4 border-primary text-sm">
                                            product name
                                        </th>
                                        <th className="text-center py-3 px-4 capitalize font-semibold border-4 border-primary text-sm">
                                            price
                                        </th>
                                        <th className="text-center py-3 px-4 capitalize font-semibold border-4 border-primary text-sm">
                                            size
                                        </th>
                                        <th className="text-center py-3 px-4 capitalize font-semibold border-4 border-primary text-sm">
                                            count
                                        </th>
                                        <th className="text-center py-3 px-4 capitalize font-semibold border-4 border-primary text-sm">
                                            cover
                                        </th>
                                        <th className="text-center py-3 px-4 capitalize font-semibold border-4 border-primary text-sm">
                                            total price
                                        </th>
                                        <th className="text-center py-3 px-4 capitalize font-semibold border-4 border-primary text-sm">
                                            delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item,index) => {
                                        price += item.price * item.count
                                        return (
                                            <tr key={++index} className="bg-slate-50 text-primary border-4 border-t-0 border-primary">
                                                <td className="text-left py-3 px-4 border-4 border-primary">{++index}</td>
                                                <td className="text-left py-3 px-4 border-4 border-primary">{item.title}</td>
                                                <td className="text-left py-3 px-4 border-4 border-primary">{item.price}$</td>
                                                <td className="text-left py-3 px-4 border-4 border-primary">{item.size}</td>
                                                <td className="text-left py-3 px-4 border-4 border-primary">{item.count}</td>
                                                <td className="text-left py-3 px-4"><img src={`${BASE_URL}/${item.cover}`} alt="cover" className='h-48 max-w-fit' /></td>
                                                <td className="text-center py-3 px-4 border-4 border-primary">
                                                    {item.price * item.count}$
                                                </td>
                                                <td className="text-center py-3 px-4 border-4 border-primary text-red-500">
                                                    <button className='text-2xl' 
                                                    onClick={() => handleRemoveFromCart (userId,item)}><i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>

                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='border relative w-full md:w-1/3 ml-0 h-full py-20 md:ml-16  rounded-md mt-20 flex justify-center flex-col items-center gap-12'>
                    <h4 className='absolute top-10 left-2'>Order Details: </h4>
                        <div className='flex flex-col gap-5'>
                            <h4 className='text-lg'>Total Price: {price}$</h4>
                            <h4 className='text-lg'>Shipment: 40$</h4>
                            <h4 className='text-lg'>Order Price: {price + 40}$</h4>
                        </div>
                        <button className='bg-green-500 px-4 py-2  text-white font-extrabold flex items-center gap-4 rounded hover:bg-green-600'
                        onClick={()=>{
                            emptyCart(userId)
                            setCart([])
                            alert("order placed successfully.")
                            navg("/dashboard")
                        }}>Place order <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </>
            )}
            
        </div>
    </div>
  );
}
export default Cart;
