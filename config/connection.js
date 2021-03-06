const mysql = require("mysql");

let connection = mysql.createConnection(process.env.JAWSDB_URL ||{
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "burgers_db"
});

connection.connect( err =>{
    if (err) throw err.stack;

    console.log("connected as id " + connection.threadId);
});

module.exports = connection;