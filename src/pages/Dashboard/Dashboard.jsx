import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import axiosInstance from '../../utils/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import Favourites from '../Favourites/Favourites';
import Products from '../Products/Products';
import { BASE_URL } from '../../utils/constants';

const Dashboard = () => {
    const navigate = useNavigate()
  const [userInfo,setUserInfo] = useState(null)
  const [userId,setUserId] = useState('')
  const getUserInfo = async()=>{
    try{
      const response = await axiosInstance.get(`${BASE_URL}/get-user`);
      if(response.data && response.data.data.user){        
        setUserInfo(response.data.data.user)
        setUserId(response.data.data.user._id)
      }
    } catch (error){
      if(error.response.status === 401){
        localStorage.clear();
        navigate('/login')
      }
      
    } 
  };
  useEffect(()=>{
    getUserInfo()
  },[])
  const location = useLocation();
  return (
    <>
      <NavBar  userInfo={userInfo}/>
      
      {location.pathname === '/dashboard/favourites' ?
       <Favourites userId={userId} /> :
        location.pathname === '/dashboard/products' ? <div className='mt-5 pb-5'>
          <Products isUser={true} userId={userId} />
        </div> 
        : <Home notexist={true} userId={userId} />}
      
    </>
  )
}

export default Dashboard