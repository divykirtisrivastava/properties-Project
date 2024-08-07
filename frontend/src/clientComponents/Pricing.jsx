import React from 'react'

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
              <button className='btn3'>{item.best}</button>
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
            <button
              className='btn5'
              style={{
                background: item.plan === "Standard" ? "#27ae60" : "#fff",
                color: item.plan === "Standard" ? "#fff" : "#27ae60",
              }}
            >
              Start {item.plan}
            </button>
          </div>
        ))}
      </div>
        </div>
      </section>
   </>
  )
}
