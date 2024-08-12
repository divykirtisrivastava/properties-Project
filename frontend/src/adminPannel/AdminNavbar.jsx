import React, { useContext, useEffect, useState } from 'react'
import pic from '../images/logo.png'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
export const nav = [
    {
      text: "home",
      path: "",
    },
    {
      text: "pricing",
      path: "/admin/pricing",
    }
  ]
export default function AdminNavbar() {
  const [navList, setNavList] = useState(false)
  let [data, setData] = useState('')

  let {adminAuth, adminLogout} = useContext(UserContext)
useEffect(()=>{
  setData(adminAuth.adminName)
},[adminAuth])
function handleLogout(){
  adminLogout()
  window.location.reload()
}
  return (
   <>
      <header>
        <div className='Admincontainer flexbox'>
          <div className='logo'>
            <img src={pic} alt='' />
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flexbox"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='button flexbox gap-5'>
       
            {data ? <div className='flex gap-5'>
            <Link to='/admin/addProduct' className='btn1 bg-gradient-to-r from-gray-900 to-gray-700' >
              Add Properpty
            </Link>
            <div className='flex items-center gap-2'>
              <img src={`http://localhost:3000/${data.image}`}  className='w-[50px] h-[50px] rounded-full' alt="" /> 
              <p className='text-red-600 uppercase font-bold'><span className='text-white text-sm bg-gradient-to-r from-gray-900 to-gray-700 relative top-[-5px]'>Admin</span> <br />{data.fullname}</p>
            </div>
            <button onClick={handleLogout} className='p-2 text-white rounded-[15px] font-bold bg-gradient-to-r from-red-900 to-red-700'>
              Log out
            </button>
            </div>
           : <Link className='btn1 bg-gradient-to-r from-gray-900 to-gray-700' to='/admin/adminLogin'>
              Sign In
            </Link>}
          
          </div>
          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
   </>
  )
}
