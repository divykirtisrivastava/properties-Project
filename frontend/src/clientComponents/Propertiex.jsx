import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { FileHeart, Heart, HeartIcon, HeartOff, Heater, LucideHeart } from 'lucide-react';

export default function Propertiex() {
  let {auth, setCartList} = useContext(UserContext)
  let navigation = useNavigate()
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);
  const [imageIndices, setImageIndices] = useState({});

  async function getpropertylist() {
    let result = await axios.get('http://localhost:3000/api/getpropertylist');

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

  async function handleCart(data) {
      if(auth.username){
        let username = auth.username.email.split('@')[0]  
       let result= await axios.post(`http://localhost:3000/api/cartSave/${username}`, data)
       alert("item saved... 👍")
       getcartlist()
      }
    }
  
  async function getcartlist(){
    if(auth.username){
        let username = auth.username.email.split('@')[0]  
    let result = await axios.get(`http://localhost:3000/api/getCart/${username}`)
    setCartList(result.data.length)
    }
}
useEffect(()=>{
  getcartlist()
}, [auth])

  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <div className='heading'>
            <h1>Recent Property Listed</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </div>

          <div className='content grid3 mtop' >
            {data.map((val, index) => {
              const { id, image, category, location, name, price, type } = val;
              const currentImageIndex = imageIndices[id] || 0;
              return (
                <div className='box shadow' key={index} style={{paddingBottom:'20px'}}>
                  <div className='img relative w-full h-64'>
                    <img
                      src={`http://localhost:3000/${image[currentImageIndex]}`}
                      alt={`Property Image ${currentImageIndex + 1}`}
                      // className={`carousel-image ${currentImageIndex === index ? 'active' : ''} w-full h-full object-cover absolute top-0 left-0`}
                      className={`carousel-image w-full h-full object-cover absolute top-0 left-0`}
                      style={{ transition: 'opacity 1s ease-in-out' }}
                    />
                    <button
                      onClick={() => prevImage(id)}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={() => nextImage(id)}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                    >
                      &gt;
                    </button>
                  </div>
                  <div className='text'>
                    <div className='category flexbox'>
                      <span style={{ background: category === "For Sale" ? "#25b5791a" : "#ff98001a", color: category === "For Sale" ? "#25b579" : "#ff9800" }}>{category}</span>
                      <button onClick={()=>handleCart(val)}><LucideHeart fill='red'/></button>
                    </div>
                    <h4>{name}</h4>
                    <p>📌 {location}</p>
                  </div>
                  <div className='button flexbox'>
                    <div>
                      <Link to={`/viewProperty/${id}`} className='btn1 bg-gradient-to-r from-gray-900 to-gray-700' >Rs. {Number(price.replace(/[^0-9.-]+/g,"")).toLocaleString('En-In')}</Link> <label htmlFor=''>/sqft</label>
                    </div>
                    <span>{type}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
