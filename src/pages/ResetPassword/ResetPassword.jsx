import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import axiosInstance from '../../utils/axiosInstance';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error,setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!password){
        setError("password is required")
        return;
    }
    if (password !== confirmPassword) {
        setError("passwords don't match")
        return;
    }

    const response = await axiosInstance.post(`/api/auth/reset-password/${token}`, {
      password
    });
    if(response.data && response.data.message){
        console.log(response.data.message);
    }

    
  };

  return (
    <div>
        <NavBar />
      <div className='pt-24 flex flex-col items-center'>
        <h2 className='text-4xl mb-5 font-extrabold'>Reset Password</h2>
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className='input-box'
            />
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className='input-box'
            />
            <p className="text-xs text-red-500 font-extrabold">{error && error}</p>
            <button type="submit" className='btn-primary'>Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
