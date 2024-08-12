import React, { useContext, useEffect, useState } from 'react'
import pic from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
export const nav = [
    {
      text: "home",
      path: "",
    },
    {
      text: "about",
      path: "/about",
    },
    {
      text: "properties",
      path: "/properties",
    },
    {
      text: "pricing",
      path: "/admin/pricing",
    }
  ]
export default function Navbar() {
  const [navList, setNavList] = useState(false)
  let [data, setData] = useState('')
  let navigation = useNavigate()

  let {auth,adminLogout, logout, cartList} = useContext(UserContext)
useEffect(()=>{
  setData(auth.username)
  adminLogout()
},[auth])
function handleLogout(){
  logout()
  window.location.reload()
}

  return (
   <>
      <header>
        <div className='container flexbox'>
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
            {cartList ? <Link to='wishlist'>
              <span className='bg-gradient-to-r from-red-900 to-red-700'>{cartList}</span> My List
            </Link> : ''}
            {data ? <div className='flex gap-5'>
            <div className='flex items-center gap-2'>
              <img src={`http://localhost:3000/${data.image}`}  className='w-[50px] h-[50px] rounded-full' alt="" /> 
              <p className='text-red-600 uppercase font-bold'>{data.fullname}</p>
            </div>
            <button onClick={handleLogout} className='p-2 text-white rounded-[15px] font-bold bg-gradient-to-r from-red-900 to-red-700'>
              Log out
            </button>
            </div>
           : <Link className='btn1 bg-gradient-to-r from-gray-900 to-gray-700' to='/signin'>
              Sign In
            </Link>}
          <Link to='/admin/pricing' className='btn1 bg-gradient-to-r from-gray-900 to-gray-700' >
              List Properpty
            </Link>
          </div>
          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
   </>
  )
}
