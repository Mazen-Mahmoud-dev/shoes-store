import React from 'react'
import { Link } from 'react-router-dom';
import NavBar from './../../components/NavBar/NavBar';
import AboutUs from '../../components/AboutUs/AboutUs';
import Products from '../Products/Products';

const Home = ({notexist,userId}) => {
  return (
    <>
      {!notexist && (
        <NavBar />
      )}
      <div className="MainPageBackground min-h-screen flex flex-col justify-center items-center">
      <main className="flex-grow flex flex-col justify-center items-center text-center p-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white  main-text mb-4">Welcome to Our Shoes Store</h1>
        <p className="text-xl  text-white p-4 mb-6 max-w-2xl font-extrabold rounded-full ">
          We are selling different and various types of shoes 
        </p>
        <div className='flex flex-col md:flex-row items-center justify-center gap-24 mt-4'>
          <a href="#aboutus" className="px-4 py-3 font-extrabold bg-primary text-white rounded-md shadow-md hover:bg-gray-900 transition duration-300">
            Learn More <i className="fa-solid fa-angle-down text-red-500  px-2 py-1 ml-4"></i>
          </a>
          {!notexist && (
              <Link to='/signup' className='px-12 py-3 font-extrabold bg-primary text-white rounded-md shadow-md hover:bg-gray-900 transition duration-300'>Join us</Link>
          )}
          
        </div>
      </main>
    </div>
      <AboutUs />
      {!notexist ? (
        <Products  />
      ):(
        <Products isUser={true} userId={userId} />
      )
      }
      
    </>
  )
}

export default Home