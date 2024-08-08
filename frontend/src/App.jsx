import React from 'react'
import Navbar from './clientComponents/Navbar'
import Footer from './clientComponents/Footer'
import {Outlet} from 'react-router-dom'
import UserContextProvider from './context/UserContextProvider'

export default function App() {
  return (
   <UserContextProvider>
   <Navbar/>
   <Outlet/>
   <Footer/>
   </UserContextProvider>
  )
}
