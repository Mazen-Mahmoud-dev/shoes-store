import { Navigate, Outlet } from "react-router-dom"
import axiosInstance from "./axiosInstance";
import { useEffect } from "react";
import { BASE_URL } from "./constants";

const PrivateRoutes = ()=>{
    let token = true;
    const getUserInfo = async()=>{
        try{
          const response = await axiosInstance.get(`${BASE_URL}/get-user`);
          if(response.data && response.data.data.user){     
              token = true;
              return
          }
          
        } catch (error){
          if(error.response.status === 401){
            localStorage.clear();
             token = false
          }
        } 
      };
      useEffect(()=>{
        getUserInfo()
      })
    return(
      <>
        {token ? <Outlet /> : <Navigate to='/login' />}
      </>
    )
}

export default PrivateRoutes