import axiosInstance from "./axiosInstance"

export const fetchData = async (url,setData,resdata,msgerror="unexpected error occurred")=>{
    try{
        const response = await axiosInstance.get(url)
        setData(resdata(response.data))
    }catch (error) {
        console.error(msgerror, error);
    }
}

