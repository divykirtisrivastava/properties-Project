const mysql = require('mysql')

let connection  = mysql.createConnection({
    host: "localhost",
    user: "root",
    database:"propertiy-project"
})

module.exports = connection;
