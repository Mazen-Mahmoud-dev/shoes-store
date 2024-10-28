import React, { useState } from 'react'
import axiosInstance from '../../../utils/axiosInstance'
import { Outlet, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/NavBar/AdminNavbar'
import { BASE_URL } from '../../../utils/constants'

const AdminDashboard = () => {
    const navigate = useNavigate()
  const [,setUserInfo] = useState(null)
  const getUserInfo = async()=>{
    try{
      const response = await axiosInstance.get(`${BASE_URL}/get-user`);
      if(response.data && response.data.data.user){        
        setUserInfo(response.data.data.user)
        
      }
    } catch (error){
      if(error.response.status === 401){
        localStorage.clear();
        navigate('/login')
      }
      
    } 
  };
  getUserInfo()

  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  )
}

export default AdminDashboard