let db  = require('../dataBaseConfig.js')
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

 function generateToken(user) {
    return  jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

exports.clientSave = async (req, res)=>{

    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let hash = await bcrypt.hash(password, 10)
    const image = req.file.filename;

    let value = [[name,email, hash, image]]

    let sql  = 'insert into clientlist(fullname,email, password, image) values ?'

    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send("clientlist saved")
        }
    })
}

exports.clientLogin = (req, res)=>{
    let email = req.body.email
    let password = req.body.password
   
    db.query('select * from clientlist where email = ?', [email], async (err, result)=>{
        if(err) throw err
        else{
          await  bcrypt.compare(password, result[0].password, async (err, isMatch)=>{
                if(err) throw err
                else{
                    if(isMatch){
                        let token = await generateToken(result[0])
                        let tname = result[0].email.split('@')[0]
                        createUserWishListtable(tname)
                        res.json({token, tname, isMatch, result})
                    }
                    else{
                        res.json({isMatch})
                    }
                }
            })
        }
    })
}

function createUserWishListtable(tname){
    let userwishlistTableQuery = `CREATE TABLE if not exists ${tname} (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NULL,
        location VARCHAR(255) NULL,
        category VARCHAR(255) NULL,
        price VARCHAR(255) NULL,
        type VARCHAR(255) NULL,
        image TEXT NULL,
        PRIMARY KEY (id)
      );`
      
      db.query(userwishlistTableQuery, (err, result) => {
        if (err) throw err;
        else {
          console.log("userwishlist table created");
        }
      });
}

exports.verify =async (req, res)=>{
    let token = req.headers['authorization'].split(" ")[1]
    if(token){
      await  jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err) throw err
            else{
                db.query("select * from clientlist where id = ?", [decode.id], (err, result)=>{
                    if(err) throw err
                    else{
                        res.json(result[0])
                    }
                })
            }
        })
    }else{
        res.send("token not get")
    }
}
