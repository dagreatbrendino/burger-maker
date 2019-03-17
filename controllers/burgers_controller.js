const express = require("express");

const burger = require("../models/burger.js");

const router = express.Router();

//This is the route to the top level of the server. It will query burgers_db and then
//send a response the renders with index.handlebars passing in all burgers that were returned from
//the query
router.get("/" , (request, response) => { 
    console.log("controller routing");
    burger.all( (data)=> {
        //the object for handlebars
        let o4H = {
            burgers: data
        }
        console.log(o4H);
        response.render("index", o4H)
    });
});

module.exports = router;

