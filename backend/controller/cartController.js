let db  = require('../dataBaseConfig.js')

exports.cartSave = (req, res)=>{
    let username = req.params.username
    let name = req.body.name
    let location = req.body.location
    let category = req.body.category
    let price = req.body.price
    let type = req.body.type
    const imagePaths = req.body.image
    let value = [[name,location, category, price,type, JSON.stringify(imagePaths)]]

    let sql  = `insert into ${username}(name,location, category, price,type, image) values ?`

    db.query(sql, [value], (err, result)=>{
        if(err) throw err
        else{
            res.send(result)
        }
    })
}

exports.getCart = (req, res)=>{
    let username = req.params.username
    let sql  = `select * from ${username}`

    db.query(sql, (err, result)=>{
        if(err) throw err
        else{
            res.json(result)
        }
    })
}

exports.deleteCart = (req, res)=>{
    let id = req.params.id
    let username = req.params.username

    let sql = `delete from ${username} where id = ?`

    db.query(sql, [id], (err, result)=>{
        if(err) throw err
        else{
            res.send("data deleted")
        }
    })
}


exports.getwishlistById = (req, res)=>{
    let id = req.params.id
    let username = req.params.username

    let sql = `select * from ${username} where id = ?`

    db.query(sql, [id], (err, result)=>{
        if(err){
            res.send(false)
        }
        else{
            res.json(result[0])
        }
    })
}
