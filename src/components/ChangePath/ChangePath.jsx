import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangePath = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/login')
        localStorage.clear()
        window.location.reload();
    },[navigate])
  return (
    <div>ChangePath</div>
  )
}

export default ChangePath