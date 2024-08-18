import React from 'react'
import './Home.css'
import { Search } from 'lucide-react'

export default function Home() {
  return (
    <div>
      <section className='hero'>
        <div className='container'>
        <div className='heading'>
        <h1 style={{fontSize: '65px', color:'black',fontWeight:'600'}} >Search Your Next Home </h1>
        <p style={{color:"black", fontSize:'30px'}}>Find new & featured property located in your local city.</p>
      </div>

          {/* <form className='flexbox formBox'>
            <div className='box'>
              <span>City/Street</span>
              <input type='text' placeholder='Location' />
            </div>
            <div className='box'>
              <span>Property Type</span>
              <input type='text' placeholder='Property Type' />
            </div>
            <div className='box'>
              <span>Price Range</span>
              <input type='text' placeholder='Price Range' />
            </div>
            <div className='box'>
              <h4>Advance Filter</h4>
            </div>
            <button className='btn1 bg-gradient-to-r from-gray-900 to-gray-700'>
             <Search/>
            </button>
          </form> */}
        </div>
      </section>
    </div>
  )
}
