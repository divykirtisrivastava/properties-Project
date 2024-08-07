import React from 'react'
import p1 from '../images/list/p-1.png'
import p2 from '../images/list/p-2.png'
import p4 from '../images/list/p-4.png'
import p5 from '../images/list/p-5.png'
import p6 from '../images/list/p-6.png'
import p7 from '../images/list/p-7.png'

export const list = [
    {
      id: 1,
      cover: p1,
      name: "Red Carpet Real Estate",
      location: "210 Zirak Road, Canada",
      category: "For Rent",
      price: "Rs.3,700",
      type: "Apartment",
    },
    {
      id: 2,
      cover: p2,
      name: "Fairmount Properties",
      location: "5698 Zirak Road, NewYork",
      category: "For Sale",
      price: "Rs.9,750",
      type: "Condos",
    },
    {
      id: 3,
      cover: p7,
      name: "The Real Estate Corner",
      location: "5624 Mooker Market, USA",
      category: "For Rent",
      price: "Rs.5,860",
      type: "Offices",
    },
    {
      id: 4,
      cover: p4,
      name: "Herringbone Realty",
      location: "5621 Liverpool, London",
      category: "For Sale",
      price: "Rs.7,540",
      type: "Homes & Villas",
    },
    {
      id: 5,
      cover: p5,
      name: "Brick Lane Realty",
      location: "210 Montreal Road, Canada",
      category: "For Rent",
      price: "Rs.4,850",
      type: "Commercial",
    },
    {
      id: 6,
      cover: p6,
      name: "Banyon Tree Realty",
      location: "210 Zirak Road, Canada",
      category: "For Sale",
      price: "Rs.2,742",
      type: "Apartment",
    },
  ]

export default function Propertiex() {
  return (
   <>
    <section className='recent padding'>
        <div className='container'>
        <div className='heading'>
        <h1 >Recent Property Listed </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
      </div>

      <div className='content grid3 mtop'>
        {list.map((val, index) => {
          const { cover, category, location, name, price, type } = val
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={cover} alt='' />
              </div>
              <div className='text'>
                <div className='category flexbox'>
                  <span style={{ background: category === "For Sale" ? "#25b5791a" : "#ff98001a", color: category === "For Sale" ? "#25b579" : "#ff9800" }}>{category}</span>
                 🤍
                </div>
                <h4>{name}</h4>
                <p>
                  📌 {location}
                </p>
              </div>
              <div className='button flexbox'>
                <div>
                  <button className='btn2'>{price}</button> <label htmlFor=''>/sqft</label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          )
        })}
      </div>
        </div>
      </section>
   </>
  )
}
