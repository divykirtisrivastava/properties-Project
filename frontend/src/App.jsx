import React from 'react'
import Navbar from './clientComponents/Navbar'
import Footer from './clientComponents/Footer'
import {Outlet} from 'react-router-dom'

export default function App() {
  return (
   <>
   <Navbar/>
   <Outlet/>
   <Footer/>
   </>
  )
}
