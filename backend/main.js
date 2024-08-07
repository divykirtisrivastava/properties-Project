const express = require('express')
const cors = require('cors')
const db = require('./dataBaseConfig.js')
const propertylistRouter = require('./routes/propertylistRoutes.js')
const cartRouter = require('./routes/cartRoute.js')

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

app.listen(3000, ()=>{
      console.log("server is running....")
})