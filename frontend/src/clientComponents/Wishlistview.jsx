// import React, { useEffect, useState } from 'react'
// import { ArrowUpRight } from 'lucide-react'
// import axios from 'axios'
// import { Link, useParams } from 'react-router-dom'

// export default function ViewProduct() {
//   let {id} = useParams()

// let [data, setData] = useState([])
// let [img, setimg] = useState([])
// async function getpropertylistyId(){
//   let result = await axios.get(`http://localhost:3000/api/getpropertylistyId/${id}`)
//   setData(result.data[0])
//   setimg(JSON.parse(result.data[0].image))
// }
// useEffect(()=>{
//   getpropertylistyId()
// }, [])
// // console.log(img)

// const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === 0 ? img.length - 1 : prevIndex - 1
//     );
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === img.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         prevIndex === img.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 3000);
  
//     return () => clearInterval(interval);
//   }, [currentImageIndex]);
//   return (
//    <div className='flex w-full justify-center h-[100vh] items-center'>
//      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
//      <div className="relative w-full h-64">
//      {img.map((image, index) => (
//         <img
//           key={index}
//           src={`http://localhost:3000/${image}`}
//           alt={`Property Image ${index + 1}`}
//           className={`carousel-image w-full h-full object-cover absolute top-0 left-0`}

//           style={{ transition: 'opacity 1s ease-in-out' }}
//         />
//       ))}
//       <button
//         onClick={prevImage}
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
//       >
//         &lt;
//       </button>
//       <button
//         onClick={nextImage}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
//       >
//         &gt;
//       </button>
//     </div>
//     <div className="px-6 py-4">
//       <div className="font-bold text-xl mb-2">{data.name}</div>
//       <p className="text-gray-700 text-base">
//         Location: {data.location}
//       </p>
//       <p className="text-gray-700 text-base">
//         Category: {data.category}
//       </p>
//       <p className="text-gray-700 text-base">
//         Price: {data.price}
//       </p>
//       <p className="text-gray-700 text-base">
//         Type: {data.type}
//       </p>
//     </div>
//   </div>
//    </div>
//   )
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Wishlistview() {
  let {id} = useParams()
  const [data, setData] = useState([]);
  const [imageIndices, setImageIndices] = useState({});

  async function getpropertylist() {
    let result = await axios.get(`http://localhost:3000/api/getpropertylistyId/${id}`);

    const final = result.data.map(item => {
      if (typeof item.image === 'string') {
        return { ...item, image: JSON.parse(item.image) };
      }
      return item;
    });

    setData(final);

    // Initialize imageIndices with the first image index (0) for each property
    const indices = final.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {});
    setImageIndices(indices);
  }

  useEffect(() => {
    getpropertylist();
  }, []);

  const prevImage = (id) => {
    setImageIndices(prevIndices => ({
      ...prevIndices,
      [id]: prevIndices[id] === 0 ? data.find(item => item.id === id).image.length - 1 : prevIndices[id] - 1,
    }));
  };

  const nextImage = (id) => {
    setImageIndices(prevIndices => ({
      ...prevIndices,
      [id]: prevIndices[id] === data.find(item => item.id === id).image.length - 1 ? 0 : prevIndices[id] + 1,
    }));
  };

  useEffect(() => {
    const intervals = data.map(property => {
      return setInterval(() => {
        setImageIndices(prevIndices => ({
          ...prevIndices,
          [property.id]: prevIndices[property.id] === property.image.length - 1 ? 0 : prevIndices[property.id] + 1,
        }));
      }, 3000);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, [data]);

  return (
    <>
        <div className='h-[700px] relative mt-[0px]'>

            {data.map((data, index) => {
              // const { id, image, category, location, name, price, type } = val;
              const currentImageIndex = imageIndices[id] || 0;
              return (
                <div className='relative h-full bg-black' key={index}>
                  
                    <img
                      src={`http://localhost:3000/${data.image[currentImageIndex]}`}
                      alt={`Property Image ${currentImageIndex + 1}`}
                      // className={`carousel-image ${currentImageIndex === index ? 'active' : ''} w-full h-full object-cover absolute top-0 left-0`}
                      className={`carousel-image w-full h-[60%] object-cover  top-0 left-0`}
                      style={{ transition: 'opacity 1s ease-in-out' }}
                    />
                    <button
                      onClick={() => prevImage(data.id)}
                      className="absolute left-0 top-1/4 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={() => nextImage(data.id)}
                      className="absolute right-0 top-1/4 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                    >
                      &gt;
                    </button>
                  
                  <div className="flex flex-col justify-evenly items-center h-[40%] text-2xl text-white font-bold">
       <div className="">{data.name}</div>
       <p className="">
         Location: {data.location} 📌
       </p>
       <p className="">
         Category: {data.category}
       </p>
       <p className="">
         Price: {data.price}
       </p>
       <p className="">
         Type: {data.type}
       </p>
       <p className="bg-red-600 p-2 rounded-2xl">
         Contact Number: 7345783412
       </p>
                  </div>
                </div>
              );
            })}

      </div>
    </>
  );
}
