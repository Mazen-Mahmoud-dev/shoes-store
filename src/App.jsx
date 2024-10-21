import React from 'react'
import { BrowserRouter as Router , Route , Routes, Navigate } from 'react-router-dom'
import Login from './pages/LogIn/Login'
import SignUp from './pages/SignUp/SignUp'
import VerifyEmail from './components/VerifyEmail/VerifyEmail '
import EmailVerification from './pages/EmailVerification/EmailVerification'
import Home from './pages/Home/Home'
import PrivateRoutes from './utils/PrivateRoutes'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import Dashboard from './pages/Dashboard/Dashboard'
import AdminHome from './pages/AdminHome/Home'
import ShowProducts from './pages/ShowProducts/ShowProducts'
import ShowUsers from './pages/ShowUsers/ShowUsers'
import Favourites from './pages/Favourites/Favourites'
import CartRoute from './components/CartRoute/CartRoute'
import HandleAddProducts from './pages/AddProducts/HandleAddProducts'
import Products from './pages/Products/Products'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import AboutUs from './components/AboutUs/AboutUs'
import NavBar from './components/NavBar/NavBar'

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
      <Route path='/about-us'  element={<><NavBar /><div className='pt-24'><AboutUs /></div></>} />

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
