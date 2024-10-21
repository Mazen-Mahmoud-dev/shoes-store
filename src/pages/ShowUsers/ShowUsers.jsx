import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteProductMsg from '../../components/DeleteProductMsg/DeleteProductMsg';
import axiosInstance from '../../utils/axiosInstance';
import { BASE_URL } from '../../utils/constants';

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  let [counterPage,setCounterPage] = useState(1)
  let [viewMsgDelete,setViewMsgDelete] = useState(false)
  const [userId,setUserId] = useState('')
  const token = localStorage.getItem("token")
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(BASE_URL);
      setUsers(response.data.data.users);
      
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };
  useEffect(() => {
    fetchUsers();
    localStorage.setItem("pageCounter",JSON.stringify(counterPage))
  }, []);
  const HandlePreviousPage = async ()=>{
    let page = localStorage.getItem("pageCounter")
    if(page > 1){
      --page
      localStorage.setItem("pageCounter",JSON.stringify(page))
      try{
        const response = await axiosInstance.get(`${BASE_URL}?page=${localStorage.getItem("pageCounter")}`);
        setUsers(response.data.data.users);
      }catch (error) {
        console.error('Error fetching products2', error);
      }
    }
    
  }
  const HandleNextPage = async()=>{
    let page = localStorage.getItem("pageCounter")
    ++page
    
    localStorage.setItem("pageCounter",JSON.stringify(page))
    try{
      const response = await axiosInstance.get(`${BASE_URL}?page=${localStorage.getItem("pageCounter")}`);
      setUsers(response.data.data.users);
    
    }catch (error) {
      console.error('Error fetching users', error);
    }
  }
  const DeleteUser = async()=>{
      await axios.delete(`${BASE_URL}/${userId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setViewMsgDelete(false)
      fetchUsers()
  }
  return (
    <div>
      <h3 className='text-4xl text-center my-8 font-extrabold'>All Users</h3>
      <div className="container mx-auto px-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 border-8 border-primary">
          <thead className="bg-gray-900 text-white">
            <tr className='border'> 
              <th className="w-1/6 py-3 px-4 uppercase font-semibold border text-center text-sm">
                ID
              </th>
              <th className="w-1/3 text-center py-3 px-4 uppercase font-semibold border text-sm">
                Name
              </th>
              <th className="text-center py-3 px-4 uppercase font-semibold border text-sm">
                Email
              </th>
              <th className="text-center py-3 px-4 uppercase font-semibold border text-sm">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,index) => (
              <tr key={++index} className="bg-gray-900 text-white border-b">
                <td className="text-left py-3 px-4 border">{++index}</td>
                <td className="text-left py-3 px-4 border">{user.firstName + ' ' + user.lastName}</td>
                <td className="text-left py-3 px-4 border">{user.email}</td>
                <td className="text-center py-3 px-4 border text-red-500"><button className='text-2xl' onClick={()=>{setViewMsgDelete(true);setUserId(user._id)}}><i class="bi bi-trash"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="flex gap-2 justify-evenly items-center">
      <button className='btn-primary' onClick={()=>HandlePreviousPage(counterPage)}>Previous</button>

      <button className='btn-primary' onClick={async ()=>{
        const response = await axiosInstance.get(`${BASE_URL}?page=${parseInt(localStorage.getItem("pageCounter")) + 1}`);
        if(response.data.data.users.length > 0){
          HandleNextPage(counterPage)
        }
        }
        }>next</button>
    </div>

    <DeleteProductMsg DeleteFn={DeleteUser} viewMsg={viewMsgDelete} setViewMsg={setViewMsgDelete} userId={userId} />
    </div>
  );
};

export default ShowUsers;
