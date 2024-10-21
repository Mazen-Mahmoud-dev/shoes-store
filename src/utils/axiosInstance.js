import axios from 'axios'
import { BASE_URL } from './constants'

const axiosInstance = axios.create({

    headers:{
        "Content-Type":"application/json",
    },
    baseURL:BASE_URL
})
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token")
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },(error)=>Promise.reject(error)
    
)


export default axiosInstance;