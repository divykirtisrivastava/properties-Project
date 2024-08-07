import React, { useState } from 'react'
import pic from '../images/logo.png'
import { Link } from 'react-router-dom'
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
      path: "/pricing",
    }
  ]
export default function Navbar() {
  const [navList, setNavList] = useState(false)

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
          <div className='button flexbox'>
            <h4>
              <span>2</span> My List
            </h4>
            <button className='btn1'>
              <i className='fa fa-sign-out'></i> Sign In
            </button>
          </div>

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
   </>
  )
}
