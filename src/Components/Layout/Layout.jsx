import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { usercontext } from '../Context/Usercontext'
import { Offline, Online } from "react-detect-offline";
export default function Layout() {
  let {setusertoken} = useContext(usercontext)
  useEffect(()=>{
    if (localStorage.getItem('usertoken') !== null) {
      setusertoken(localStorage.getItem('usertoken'))
    }
  })
  return (<>
  <Navbar/>
  <div className="container">
  <Outlet></Outlet>
  </div>
  <div>
  <Offline>
    <div className='network'>
    <i className='fas fa-wifi'></i> You are offline(surprise!)
    </div>
    </Offline>
  </div>
  <Footer/>
  </>)
}
