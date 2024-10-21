import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SideBar = () => {
    let [openSidebar,setOpenSidebar] = useState(false)
    const navigate = useNavigate()
    const onlogout = ()=>{
        localStorage.clear()
        navigate("/login")
    };
    
  return (
    <>
        <span
        className='absolute text-white text-4xl top-3 left-4 cursor-pointer'
        onClick={()=>setOpenSidebar(!openSidebar)}
        >
        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
        </span>
        <div
        className={`sidebar z-20 fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 ${openSidebar ? 'block':'hidden'}`}
        >
        <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
            <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">Shoe Store</h1>
            <i
                className="bi bi-x cursor-pointer ml-28 hover:bg-primary"
                onClick={()=>setOpenSidebar(!openSidebar)}
            ></i>
            </div>
            <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <Link to=''
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary text-white"
        >
            <i className="bi bi-house-door-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
        </Link>
        <Link to='users'
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary text-white"
        >
            <i className="fa-solid fa-user"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Users</span>
        </Link>
        <Link to='products'
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary text-white"
        >
            <i className="fa-brands fa-product-hunt"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Products</span>
        </Link>
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <Link to='add-product'
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary text-white"
        >
            <i className="fa-solid fa-plus"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Add Product</span>
        </Link>
        <div onClick={()=>onlogout()}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary text-white"
        >
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
        </div>
        </div>
    </>
  )
}

export default SideBar