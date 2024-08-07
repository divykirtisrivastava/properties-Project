let db  = require('../dataBaseConfig.js')
const path = require('path');

exports.propertylistSave = (req, res)=>{
    let name = req.body.name
    let location = req.body.location
    let category = req.body.category
    let price = req.body.price
    let type = req.body.type
    const imagePaths = req.files.map(file => file.filename);
    console.log(imagePaths)
    let value = [[name,location, category, price,type, JSON.stringify(imagePaths)]]

    let sql  = 'insert into propertylist(name,location, category, price,type, image) values ?'

    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send("propertylist saved")
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

exports.deletepropertylist = (req, res)=>{
    let id = req.params.id

    let sql = "delete from propertylist where id = ?"

    db.query(sql, [id], (err, result)=>{
        if(err) throw err
        else{
            res.send("propertylist deleted")
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

exports.updatepropertylist = (req, res)=>{
    let id = req.params.id
    let newData = req.body

    let sql = "update propertylist set ? where id = ?"

    db.query(sql, [newData, id], (err, result)=>{
        if(err) throw err
        else{
            res.send("propertylist updated")
        }
    })
}