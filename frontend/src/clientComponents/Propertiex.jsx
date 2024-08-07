import React, { useEffect, useState } from 'react'
import p1 from '../images/list/p-1.png'
import p2 from '../images/list/p-2.png'
import p4 from '../images/list/p-4.png'
import p5 from '../images/list/p-5.png'
import p6 from '../images/list/p-6.png'
import p7 from '../images/list/p-7.png'
import axios from 'axios'

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
  let [data, setData] = useState([])


  async function getpropertylist(){
      let result = await axios.get('http://localhost:3000/api/getpropertylist')

      const final = result.data.map(item => {
        if (typeof item.image === 'string') {
          return { ...item, image: JSON.parse(item.image) };
        }
        return item;
      });
     
      setData(final)

  }
  useEffect(()=>{
    getpropertylist()
  }, [])

  
const [currentImageIndex, setCurrentImageIndex] = useState(0);

const prevImage = (id) => {
  setCurrentImageIndex((prevIndex) => 
    prevIndex === 0 ? data.find(item => item.id == id).image.length - 1 : prevIndex - 1
  );
};

const nextImage = (id) => {
  setCurrentImageIndex((prevIndex) => 
    prevIndex === data.find(item => item.id == id).image.length - 1 ? 0 : prevIndex + 1
  );
};

// useEffect(() => {
//   const interval = setInterval(() => {
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === data[0].image.length - 1 ? 0 : prevIndex + 1
//     );
//   }, 3000);

//   return () => clearInterval(interval);
// }, [currentImageIndex]);
console.log(data)

  return (
   <>
    <section className='recent padding'>
        <div className='container'>
        <div className='heading'>
        <h1 >Recent Property Listed </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
      </div>

      <div className='content grid3 mtop'>
        {data.map((val, index) => {
          const {id, image, category, location, name, price, type } = val
          return (
            <div className='box shadow' key={index}>
              <div className='img relative w-full h-64'>
        {image.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:3000/${image}`}
          alt={`Property Image ${index + 1}`}
          className={`carousel-image ${currentImageIndex === index ? 'active' : ''} w-full h-full object-cover absolute top-0 left-0`}
          style={{ transition: 'opacity 1s ease-in-out' }}
        />
      ))}
      <button
        onClick={()=>prevImage(id)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
      >
        &lt;
      </button>
      <button
        onClick={()=>nextImage(id)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
      >
        &gt;
      </button>
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
                  <button className='btn2'>Rs. {Number(price).toLocaleString('En-In')}</button> <label htmlFor=''>/sqft</label>
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
