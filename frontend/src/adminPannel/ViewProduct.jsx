import React, { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function ViewProduct() {
  let {id} = useParams()

let [data, setData] = useState([])
let [img, setimg] = useState([])
async function getpropertylistyId(){
  let result = await axios.get(`http://localhost:3000/api/getpropertylistyId/${id}`)
  setData(result.data[0])
  setimg(JSON.parse(result.data[0].image))
}
useEffect(()=>{
  getpropertylistyId()
}, [])
// console.log(img)

const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? img.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === img.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === img.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
  
    return () => clearInterval(interval);
  }, [currentImageIndex]);
  return (
   <div className='flex w-full justify-center h-[100vh] items-center'>
     <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
     <div className="relative w-full h-64">
     {img.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:3000/${image}`}
          alt={`Property Image ${index + 1}`}
          className={`carousel-image ${currentImageIndex === index ? 'active' : ''} w-full h-full object-cover absolute top-0 left-0`}
          style={{ transition: 'opacity 1s ease-in-out' }}
        />
      ))}
      <button
        onClick={prevImage}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
      >
        &gt;
      </button>
    </div>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{data.name}</div>
      <p className="text-gray-700 text-base">
        Location: {data.location}
      </p>
      <p className="text-gray-700 text-base">
        Category: {data.category}
      </p>
      <p className="text-gray-700 text-base">
        Price: {data.price}
      </p>
      <p className="text-gray-700 text-base">
        Type: {data.type}
      </p>
    </div>
  </div>
   </div>
  )
}
