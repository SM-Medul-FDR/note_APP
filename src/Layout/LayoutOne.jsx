import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { useSelector } from 'react-redux'
import SideNavbar from '../components/sideNavbar/SideNavbar'

const LayoutOne = () => {
// ----------- Redax Data
const sliceUser = useSelector((state)=> state.currentUser.value)
const navigate = useNavigate()
  useEffect(()=>{
    if(sliceUser == null){
      navigate('/login')
    }
  },[])


  return (
    <>
    
        <Navbar/>
        <div className="flex h-screen dark:bg-darkTheme transition-all duration-[.2s] ">
        <SideNavbar/>
        <Outlet/>

        </div>
    
    </>
  )
}

export default LayoutOne