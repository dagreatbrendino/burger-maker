const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    dasbase: "burgers_db"
});

connection.connect( err =>{
    if (err) throw err.stack;

    console.log("connected as id " + connection.threadId);
});

module.exports = connection;