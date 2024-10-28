import { useState } from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import { validateEmail } from '../../../utils/helper';
import axiosInstance from '../../../utils/axiosInstance';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error,setError] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email){
        setError("Email is required!");
        return;
    }
    if(!validateEmail(email)){
        setError("Please enter a valid email address.");
        return;
      }
    try{
      const response = await axiosInstance.post(`/api/auth/forgot-password`,{
        email
    })
    if(response.data && response.data.message){
        console.log(response.data.message);
        alert(response.data.message)
    }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("An unexpected error occurred. Please try again.")
      }
    } 
  };

  return (
    <div>
        <NavBar />
      <div className='pt-24 flex flex-col items-center'>
        <h2 className='text-4xl mb-5 font-extrabold'>Forgot Password</h2>
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className='input-box'
            />
            <p className="text-xs text-red-500 font-extrabold">{error && error}</p>
            <button type="submit" className='btn-primary'>Send Reset Link</button>
        </form>
      </div>

    </div>
  );
}

export default ForgotPassword;
