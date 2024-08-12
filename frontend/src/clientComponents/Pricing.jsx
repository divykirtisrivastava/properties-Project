import React, { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'

export const price = [
    {
      plan: "Basic",
      price: "29",
      ptext: "per user, per month",
      list: [
        {
          icon: '✔',
          text: "99.5% Uptime Guarantee",
        },
        {
          icon: '✔',
          text: "120GB CDN Bandwidth",
        },
        {
          icon: '✔',
          text: "5GB Cloud Storage",
        },
        { change: "color", icon: '❌', text: "Personal Help Support" },
        { change: "color", icon: '❌', text: "Enterprise SLA" },
      ],
    },
    {
      best: "Best Value",
      plan: "Standard",
      price: "49",
      ptext: "per user, per month",
      list: [
        {
          icon: '✔',
          text: "99.5% Uptime Guarantee",
        },
        {
          icon: '✔',
          text: "150GB CDN Bandwidth",
        },
        {
          icon: '✔',
          text: "10GB Cloud Storage",
        },
        {
          icon: '✔',
          text: "Personal Help Support",
        },
        {
          change: "color",
          icon: '❌',
          text: "Enterprise SLA",
        },
      ],
    },
    {
      plan: "Platinum",
      price: "79",
      ptext: "2 user, per month",
      list: [
        {
          icon: '✔',
          text: "100% Uptime Guarantee",
        },
        {
          icon: '✔',
          text: "200GB CDN Bandwidth",
        },
        {
          icon: '✔',
          text: "20GB Cloud Storage",
        },
        {
          icon: '✔',
          text: "Personal Help Support",
        },
        {
          icon: '✔',
          text: "Enterprise SLA",
        },
      ],
    },
  ]

export default function Pricing() {
  let {setAdminFlag, haveAdmin , paymentStatusUpdate, adminLogout} = useContext(UserContext)
  let navigation = useNavigate()
  useEffect(()=>{
adminLogout()
  },[])


    const handlePayment = async (event, price) => {
      if(haveAdmin){
      const amount = price;
      const currency = 'INR';
      const receiptId = '1234567890';
  
      const response = await fetch('http://localhost:3000/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId
        })
      })
  
        const order = await response.json();
        console.log('order', order);
  
  
        var option = {
          key:"rzp_test_GJHHBFZE4O8Ub6",
          amount,
          currency,
          name:"Web Codder",
          description: "Test Transaction",
          image:"https://i.ibb.co/5Y3m33n/test.png",
          order_id:order.id,
          handler: async function(response) {
            
            const body = {...response,}
  
            const validateResponse = await fetch('http://localhost:3000/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
  
            })
  
            const jsonResponse = await validateResponse.json();
            if(jsonResponse.status == 'success'){
             let result = await paymentStatusUpdate(true)
             if(result){
              setAdminFlag(true)
              navigation('/admin')
             }else{
              navigation('/pricing')
             }
            }
  
            console.log('jsonResponse', jsonResponse);
            
          },
          prefill: {
            name: "Web Coder", 
            email: "webcoder@example.com",
            contact: "9000000000", 
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        }
  
        var rzp1 = new Razorpay(option);
        rzp1.on("payment.failed", function(response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        })
  
        rzp1.open();
        event.preventDefault();
        
     
        }else{
          navigation('/admin/adminRegister')
        }
      }
      
  

  return (
   <>
     <section className='price padding'>
        <div className='container'>
        <div className='heading'>
        <h1 >Select Your Package </h1>
        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores</p>
      </div>
      <div className='content flexbox mtop'>
        {price.map((item, index) => (
          <div className='box shadow' key={index}>
            <div className='topbtn'>
              <button className='btn1 bg-gradient-to-r from-red-900 to-red-700'>{item.best}</button>
            </div>
            <h3>{item.plan}</h3>
            <h1>
              <span>Rs.</span>
              {item.price}
            </h1>
            <p>{item.ptext}</p>

            <ul>
              {item.list.map((val) => {
                const { icon, text, change } = val
                return (
                  <li>
                    <label
                      style={{
                        background: change === "color" ? "#dc35451f" : "#27ae601f",
                        color: change === "color" ? "#dc3848" : "#27ae60",
                      }}
                    >
                      {icon}
                    </label>
                    <p>{text}</p>
                  </li>
                )
              })}
            </ul>
            <Link
              className='btn1 bg-gradient-to-r from-gray-900 to-gray-700'
              // style={{
              //   background: item.plan === "Standard" ? "#27ae60" : "#fff",
              //   color: item.plan === "Standard" ? "#fff" : "#27ae60",
              // }}
              onClick={(e)=>handlePayment(e,49)}
         
            >
              Start {item.plan}
            </Link>
          </div>
        ))}
      </div>
        </div>
      </section>
   </>
  )
}
