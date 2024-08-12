const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({
  path:'./.env'
})
const db = require('./dataBaseConfig.js')
const propertylistRouter = require('./routes/propertylistRoutes.js')
const cartRouter = require('./routes/cartRoute.js')
const clientRouter = require('./routes/clientRoute.js')
const paymentRoute = require('./routes/paymentRoute.js')

let app  = express()
app.use(express.json())
app.use(express.static('uploads'))
app.use(cors())

db.connect((err)=>{
      if(err) throw err;
      else{
            console.log("database connected")
      }
})

// create product Table
let propertyTableQuery = `CREATE TABLE if not exists propertylist (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NULL,
      location VARCHAR(255) NULL,
      category VARCHAR(255) NULL,
      price VARCHAR(255) NULL,
      type VARCHAR(255) NULL,
      image TEXT NULL,
      PRIMARY KEY (id)
    );`
    
    db.query(propertyTableQuery, (err, result) => {
      if (err) throw err;
      else {
        console.log("propertylist table created");
      }
    });
let clientTableQuery = `CREATE TABLE if not exists clientlist (
      id INT NOT NULL AUTO_INCREMENT,
      fullname VARCHAR(255) NULL,
      email VARCHAR(255) NULL,
      password VARCHAR(255) NULL,
      image TEXT NULL,
      PRIMARY KEY (id)
    );`
    
    db.query(clientTableQuery, (err, result) => {
      if (err) throw err;
      else {
        console.log("clientlist table created");
      }
    });
let adminTableQuery = `CREATE TABLE if not exists adminlist (
      id INT NOT NULL AUTO_INCREMENT,
      fullname VARCHAR(255) NULL,
      email VARCHAR(255) NULL,
      password VARCHAR(255) NULL,
      paymentStatus VARCHAR(255) NULL,
      image TEXT NULL,
      PRIMARY KEY (id)
    );`
    
    db.query(adminTableQuery, (err, result) => {
      if (err) throw err;
      else {
        console.log("adminlist table created");
      }
    });
// let cartTableQuery = `CREATE TABLE if not exists cart (
//   id INT NOT NULL AUTO_INCREMENT,
//   productType VARCHAR(255) NULL,
//   productBrand VARCHAR(255) NULL,
//   productPrice VARCHAR(255) NULL,
//   productRating VARCHAR(255) NULL,
//   image VARCHAR(255) NULL,
//   PRIMARY KEY (id));`

// db.query(cartTableQuery, (err, result)=>{
//       if(err) throw err
//       else{
//             console.log("cart table created")
//       }
// } )


app.use('/api', propertylistRouter)
app.use('/api', cartRouter)
app.use('/api', clientRouter)
app.use('/api', paymentRoute);

app.listen(3000, ()=>{
      console.log("server is running....")
})