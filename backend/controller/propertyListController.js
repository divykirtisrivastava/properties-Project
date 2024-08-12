let db  = require('../dataBaseConfig.js')
const path = require('path');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

 function generateToken(user) {
    return  jwt.sign({email: user.email}, process.env.JWT_Admin_SECRET, {expiresIn: '1d'})
}
exports.propertylistSave = (req, res)=>{
    let adminName = req.params.adminName
    let name = req.body.name
    let location = req.body.location
    let category = req.body.category
    let price = req.body.price
    let type = req.body.type
    const imagePaths = req.files.map(file => file.filename);
    console.log(imagePaths)
    let value = [[name,location, category, price,type, JSON.stringify(imagePaths)]]

    let sql  = `insert into ${adminName}(name,location, category, price,type, image) values ?`
    let sql2  = `insert into propertylist(name,location, category, price,type, image) values ?`

    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            db.query(sql2, [value], (err, result)=>{
                if(err) throw err
                else{
                    res.send("propertylist saved")
                }
            })
        }
    })
}

exports.getpropertylist = (req, res)=>{
    let sql  = "select * from propertylist"

    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}
exports.getadminpropertylist = (req, res)=>{
    let adminName = req.params.adminName
    let sql  = `select * from ${adminName}`

    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.deletepropertylist = (req, res)=>{
    let id = req.params.id
    let adminName = req.params.adminName

    let sql = `delete from ${adminName} where id = ?`
    let sql2 = "delete from propertylist where id = ?"

    db.query(sql, [id], (err, result)=>{
        if(err) throw err
        else{
            db.query(sql2, [id], (err, result)=>{
                if(err) throw err
                else{
                    res.send("propertylist deleted")
                }
            })
        }
    })
}

exports.getpropertylistById = (req, res)=>{
    let id = req.params.id

    let sql = "select * from propertylist where id = ?"

    db.query(sql, [id], (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}
exports.getadminpropertylistById = (req, res)=>{
    let id = req.params.id
    let adminName = req.params.adminName

    let sql = `select * from ${adminName} where id = ?`

    db.query(sql, [id], (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.updatepropertylist = (req, res)=>{
    let id = req.params.id
    let newData = req.body
    let adminName = req.params.adminName

    let sql = `update ${adminName} set ? where id = ?`
    let sql2 = "update propertylist set ? where id = ?"

    db.query(sql, [newData, id], (err, result)=>{
        if(err) throw err
        else{
            db.query(sql2, [newData, id], (err, result)=>{
                if(err) throw err
                else{
                    res.send("propertylist updated")
                }
            })
        }
    })
}
exports.updatepyamentStatus = (req, res)=>{
    let id = req.params.id
    let data = req.params.data

    let sql = `update adminList set paymentStatus = ? where email = ?`


    db.query(sql, [data, id], (err, result)=>{
        if(err) throw err
        else{
           
                    res.send(true)
    
        }
    })
}
exports.checkpyamentStatus = (req, res)=>{
    let email = req.params.email

    let sql = `select * from adminlist where email = ? and paymentStatus = "paid"`
    db.query(sql, [email], (err, result)=>{
        if(err) throw err
        else{
            res.send(true)
    
        }
    })
}



exports.adminSave = async (req, res)=>{

    let name = req.body.name
    let email = req.body.email
    let password = req.body.password

    let hash = await bcrypt.hash(password, 8)
    const image = req.file.filename;
    // let final = {...req.body, image}
    let value = [[name,email, hash, image]]

    let sql  = 'insert into adminlist(fullname,email, password, image) values ?'

    db.query(sql, [value], async (err, result)=>{
        if(err) throw err
        else{
        //     let token = await generateToken(final)
        //     let adminName = email.split('@')[0]
        //     createAdmintable(adminName)
        //    res.json({adminName, final, token})
        res.send(true)
        }
    })
}

exports.adminLogin = (req, res)=>{
    let email = req.body.email
    let password = req.body.password
   console.log(email)
    db.query('select * from adminlist where email = ?', [email], async (err, result)=>{
        if(err) throw err
        else{
          await  bcrypt.compare(password, result[0].password, async (err, isMatch)=>{
                if(err) throw err
                else{
                    if(isMatch){
                        let token = await generateToken(result[0])
                        let adminName = result[0].email.split('@')[0]
                        createAdmintable(adminName)
                        res.json({token, adminName, isMatch, result})
                    }
                    else{
                        res.json({isMatch})
                    }
                }
            })
        }
    })
}

function createAdmintable(tname){
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
          console.log("admin table created");
        }
      });
}

exports.adminverify =async (req, res)=>{
    let token = req.headers['authorization'].split(" ")[1]

    console.log("admin token:- "+token)
    if(token){
      await  jwt.verify(token, process.env.JWT_ADMIN_SECRET, (err, decode)=>{
            if(err) throw err
            else{
                db.query("select * from adminlist where email = ?", [decode.email], (err, result)=>{
                    if(err) throw err
                    else{
                        // console.log(result)
                        res.json(result[0])
                    }
                })
            }
        })
    }else{
        res.send("token not get")
    }
}
