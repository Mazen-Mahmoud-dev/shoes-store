import React, { useState } from 'react'
import Modal from 'react-modal';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {MdClose} from 'react-icons/md'
import { BASE_URL } from '../../utils/constants';
const EmailVerification = () => {
  const navigate = useNavigate()
  const [isShown, setIsShown] = useState(true);
  
  function closeModel() {
    setIsShown(false);
    setTimeout(()=>navigate('/login'),1000)
  }
  const [userEmail,setUserEmail] = useState(null)
  const getUserInfo = async()=>{
    try{
      const response = await axiosInstance.get(`${BASE_URL}/get-user`);
      if(response.data && response.data.data.email){        
        setUserEmail(response.data.data.email);
        return;
        
      }
      localStorage.clear();
      navigate('/login')
    } catch (error){
      if(error.response.status === 401){
        localStorage.clear();
        navigate('/login')
      }
      
    } 
  };
  getUserInfo()
  return (
    <div>
        <div>
        <Modal 
        isOpen={isShown}
        openRequestClose={()=>{}}
        Style={{
          overlay:{
            backgroundColor:"rgba(0,0,0,0.2)"
          },
        }}
        contentLabel=""
        className="w-[80%] h-max-3/4 bg-white rounded-md mx-auto mt-14 p-5 sm:w-[40%] border"
        >
            <div className='relative'>
              <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" onClick={closeModel}>
                <MdClose className='text-xl text-slate-400' />
              </button>
            </div>
            <div>
                <h3>Email Verification sent to <h4 className='font-bold text-xs md:text-sm'>{userEmail}.</h4><br /> Please check your <a href={`mailto:${userEmail}`} className='text-blue-600 underline'>email</a></h3>
            </div>
        </Modal>
            
        </div>
    </div>
  )
}

export default EmailVerification