import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const verifyEmail = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/verify/${token}`);
      setMessage(res.data.msg);
      setTimeout(()=>{
        navigate('/dashboard')
      },2000)
    } catch (error) {
      setMessage('Verification failed or token expired.');
    }
  };

  verifyEmail();


  return <div>{message}</div>;
};

export default VerifyEmail;
