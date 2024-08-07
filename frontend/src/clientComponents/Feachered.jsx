import React from 'react'
import h1 from '../images/hero/h1.png';
import h2 from '../images/hero/h2.png';
import h3 from '../images/hero/h3.png';
import h4 from '../images/hero/h4.png';
import h6 from '../images/hero/h6.png';

const featured = [
    {
      cover: h1,
      name: "Family House",
      total: "122 Property",
    },
    {
      cover: h2,
      name: "House & Villa",
      total: "155 Property",
    },
    {
      cover: h3,
      name: "Apartment",
      total: "300 Property",
    },
    {
      cover: h4,
      name: "Office & Studio",
      total: "80 Property",
    },
    {
      cover: h6,
      name: "Villa & Condo",
      total: "80 Property",
    },
  ];

export default function Feachered() {
  return (
    <div>
       <section className='featured background'>
        <div className='container'>
        <div className='heading'>
        <h1 >Featured Property Types</h1>
        <p>Find All Type of Property.</p>
      </div>
      <div className='content grid5 mtop'>
        {featured.map((items, index) => (
          <div className='box' key={index}>
            <img src={items.cover} alt='' />
            <h4>{items.name}</h4>
            <label>{items.total}</label>
          </div>
        ))}
      </div>
        </div>
      </section>
    </div>
  )
}
