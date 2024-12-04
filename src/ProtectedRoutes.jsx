import { useState } from 'react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = () => {
    const [isLoggedIn,setIsLogIn] =useState(localStorage.getItem("Token")?true:false);
    return isLoggedIn==true?<Outlet/>:<Navigate to="/LogIn"/>;
}
export default Protected
