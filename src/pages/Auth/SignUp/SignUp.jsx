import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import PasswordInput from '../../../components/Input/PasswordInput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../../utils/helper'
import axiosInstance from '../../../utils/axiosInstance'
import { BASE_URL } from '../../../utils/constants'

const SignUp = () => {
  const[firstName,setFirstName] = useState("")
  const[lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(null)
  const navigate = useNavigate()
  const handleSignUp = async (e)=>{
    e.preventDefault();
    if(!firstName){
      setError("Please enter your first name");
      return;
    }
    if(!lastName){
      setError("Please enter your last name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }
    if(!password){
      setError("Please enter the password");
      return;
    }
    setError("")

    try{
      const response = await axiosInstance.post(`${BASE_URL}/register`,{
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password,
        role:"USER"
      })
      if(response.data && response.data.error){
        setError(response.data.message)
        return;
      }
      if(response.data && response.data.data.newUser.token){    
        localStorage.setItem("token",response.data.data.newUser.token)
        navigate('/emailverification')
      }
    }  
    catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("An unexpected error occurred. Please try again.")
      }
    } 
    
  }
  useEffect(()=>{
    localStorage.clear()
  },[])
  return (
    <>
      <NavBar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form action="" onSubmit={handleSignUp}>
            <h4 className='text-2xl mb-7 text-center'>SignUp</h4>

            <input 
              type="text" 
              placeholder='First Name' 
              className='input-box'
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder='Last Name' 
              className='input-box'
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder='Email' 
              className='input-box'
              value={email}
              onChange={(e)=>setEmail(e.target.value)} 
            />
            <PasswordInput
              value={password}
              onChange={(e)=>setPassword(e.target.value)} 
            />
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button type='submit' className='btn-primary'>Create an account</button>

            <p className="text-sm text-center mt-4">
              Already have an Account? {" "}
              <Link to='/login' className='font-medium text-blue-500 underline'>Login</Link>
            </p>
          </form>
        </div>
      </div>
      </>
  )
}

export default SignUp
