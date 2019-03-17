
const express = require("express");

var PORT = process.env.PORT || 8080;

// Create an instance of the express app
var app = express();

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//handlebars import
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Import routes and give the server acces to them 
const routes = require("./controllers/burgers_controller.js")

app.use(routes);

app.listen(PORT, ()=>{
    console.log("Server listening on: http://localhost:" + PORT);
});