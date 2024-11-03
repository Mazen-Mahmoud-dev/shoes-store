import React from 'react'
import { BrowserRouter as Router , Route , Routes, Navigate } from 'react-router-dom'
import Login from './pages/Auth/LogIn/Login'
import SignUp from './pages/Auth/SignUp/SignUp'
import VerifyEmail from './components/VerifyEmail/VerifyEmail '
import EmailVerification from './pages/Auth/EmailVerification/EmailVerification'
import Home from './pages/Home/Home'
import PrivateRoutes from './utils/PrivateRoutes'
import Dashboard from './pages/USER/Dashboard/Dashboard'
import AdminHome from './pages/ADMIN/AdminHome/Home'
import ShowProducts from './pages/ADMIN/ShowProducts/ShowProducts'
import ShowUsers from './pages/ADMIN/ShowUsers/ShowUsers'
import Favourites from './pages/USER/Favourites/Favourites'
import CartRoute from './components/CartRoute/CartRoute'
import HandleAddProducts from './pages/ADMIN/AddProducts/HandleAddProducts'
import Products from './pages/USER/Products/Products'
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword'
import AboutUs from './components/AboutUs/AboutUs'
import AdminDashboard from './pages/ADMIN/AdminDashboard/AdminDashboard'
import NavBar2 from './components/NavBar/NavBar2'

const router = (

    <Routes>
      <Route path='/login' exact element={<Login />} />
      <Route path='/' exact element={
        !localStorage.getItem("token") ?
        <Home />:<Navigate to="/login" />
        } 
      />
        
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='/signup' exact element={<SignUp />} />
      <Route path='/about-us'  element={<><NavBar2 /><div className='pt-24'><AboutUs /></div></>} />

      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route element={<PrivateRoutes />} >
        <Route path='/dashboard' exact  element={<Dashboard />} >
          <Route path='favourites' element={<Favourites />} />
          <Route path='products' element={<Products isUser={true} />} />

        </Route>
        

        <Route path='/admin/dashboard' exact element={<AdminDashboard />} >
          <Route path='products' element={<ShowProducts />} />
          <Route path='users' element={<ShowUsers />} />
          <Route path='add-product' element={<HandleAddProducts />} />
          <Route path='' element={<AdminHome />} />
        </Route>
        
      </Route>
      
      
      <Route path='/verifiedemail/:token' exact element={<VerifyEmail />} />
      
      <Route path='/emailverification' exact element={<EmailVerification />} />
    </Routes>

)
const App = () => {
  return (  
    <>
    <Router>
      <div>{router}</div>
      
        <CartRoute />
      </Router>
    </>
  )
}

export default App
