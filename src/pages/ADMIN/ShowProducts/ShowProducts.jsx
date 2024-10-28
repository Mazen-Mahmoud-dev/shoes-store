import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteProductMsg from '../../../components/DeleteProductMsg/DeleteProductMsg';
import { BASE_URL } from '../../../utils/constants';
import { fetchData } from '../../../utils/FetchData';
const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  let [counterPage] = useState(1)
  let [viewMsgDelete,setViewMsgDelete] = useState(false)
  const [productId,setProductId] = useState('')
  const token = localStorage.getItem("token")
  useEffect(() => {
    fetchData(`${BASE_URL}/api/products`,setProducts,(data)=>data.data.products,'Error fetching products')
    localStorage.setItem("pageCounter",JSON.stringify(counterPage))
  },[counterPage]);
  const HandlePreviousPage = async(counterPage)=>{
    let page = localStorage.getItem("pageCounter")
    if(page > 1){
      --page
      localStorage.setItem("pageCounter",JSON.stringify(page))
      try{
        const response = await axios.get(`${BASE_URL}/api/products?page=${localStorage.getItem("pageCounter")}`);
      setProducts(response.data.data.products);
      }catch (error) {
        console.error('Error fetching products2', error);
      }
    }
    
  }
  const HandleNextPage = async(counterPage)=>{
    let page = localStorage.getItem("pageCounter")
    ++page
    
    localStorage.setItem("pageCounter",JSON.stringify(page))
    try{
      const response = await axios.get(`${BASE_URL}/api/products?page=${localStorage.getItem("pageCounter")}`);
    setProducts(response.data.data.products);
    
    }catch (error) {
      console.error('Error fetching products2', error);
    }
  }
  const DeleteProduct = async()=>{
      await axios.delete(`${BASE_URL}/api/products/${productId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setViewMsgDelete(false)
      fetchData(`${BASE_URL}/api/products`,setProducts,(data)=>data.data.products,'Error fetching products')
      
  }
  return (
    <div>
      <h3 className='text-4xl text-center my-8 font-extrabold'>All Products</h3>
      <div className="container mx-auto px-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 border-8 border-primary">
          <thead className="bg-gray-900 text-white">
            <tr className='border'> 
              <th className="w-1/6 py-3 px-4 uppercase font-semibold border text-center text-sm">
                ID
              </th>
              <th className="w-1/3 text-center py-3 px-4 uppercase font-semibold border text-sm">
                Title
              </th>
              <th className="text-center py-3 px-4 uppercase font-semibold border text-sm">
                Description
              </th>
              <th className="text-center py-3 px-4 uppercase font-semibold border text-sm">
                Cover
              </th>
              <th className="text-center py-3 px-4 uppercase font-semibold border text-sm">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item,index) => (
              <tr key={++index} className="bg-gray-900 text-white border-b">
                <td className="text-left py-3 px-4 border">{++index}</td>
                <td className="text-left py-3 px-4 border">{item.title}</td>
                <td className="text-left py-3 px-4 border">{item.description}</td>
                <td className="text-left py-3 px-4"><img src={`${BASE_URL}/${item.cover}`} alt="cover" className='w-16 md:w-32 lg:w-48 h-48' /></td>
                <td className="text-center py-3 px-4 border text-red-500"><button className='text-2xl' onClick={()=>{setViewMsgDelete(true);setProductId(item._id)}}><i className="bi bi-trash"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="flex gap-2 justify-evenly items-center">
      <button className='btn-primary' onClick={()=>HandlePreviousPage(counterPage)}>Previous</button>

      <button className='btn-primary' onClick={async ()=>{
        const response = await axios.get(`${BASE_URL}/api/products?page=${parseInt(localStorage.getItem("pageCounter")) + 1}`);
        if(response.data.data.products.length > 0){
          HandleNextPage(counterPage)
        }
        }
        }>next</button>
    </div>

    <DeleteProductMsg DeleteFn={DeleteProduct} viewMsg={viewMsgDelete} setViewMsg={setViewMsgDelete} productId={productId} />
    </div>
  );
};

export default ShowProducts;
