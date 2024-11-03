import React, { createContext, useEffect, useState } from 'react'
import axiosInstance from '../../../utils/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from '../../Home/Home';
import Favourites from '../Favourites/Favourites';
import Products from '../Products/Products';
import { BASE_URL } from '../../../utils/constants';
import NavBar2 from '../../../components/NavBar/NavBar2';
export const USERID = createContext()
const Dashboard = () => {
    const navigate = useNavigate()
  const [userInfo,setUserInfo] = useState(null)
  const [userId,setUserId] = useState('')
  
  useEffect(()=>{
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
    getUserInfo()
  },[navigate])
  const location = useLocation();
  
  return (
    <>
      <NavBar2  userInfo={userInfo}/>
      
      <USERID.Provider value={userId}>
        {location.pathname === '/dashboard/favourites' ?
        <Favourites /> :
          location.pathname === '/dashboard/products' ? <div className='mt-5 pb-5'>
            <Products isUser={true} />
          </div> 
          : <Home isexist={true} />}
      </USERID.Provider>
    </>
  )
}

export default Dashboard