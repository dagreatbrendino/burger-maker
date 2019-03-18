const express = require("express");

const burger = require("../models/burger.js");

const router = express.Router();

//This is the route to the top level of the server. It will query burgers_db and then
//send a response the renders with index.handlebars passing in all burgers that were returned from
//the query
router.get("/" , (request, response) => { 
    burger.all( (data)=> {
        
        for(row in data){
            //the ingredients array is a JSON array and needs to be parsed into an array that handlebars will 
            //be able to understand
            data[row].ingredients = JSON.parse(data[row].ingredients)
        }
        //the object for handlebars
        let o4H = {
            burgers: data
        }
        // console.log(o4H);
        response.render("index", o4H)
    });
});
//This route provides the client with the ability to post a new burger to the burgers table
//by default the burger has not yet been devoured, so we only need to get the name of the new burger
//from the post requst. We will send the resulting 
router.post("/api/burgers", (req, res) =>{
    burger.insert([
        "burger_name"
    ], [
        req.body.burger_name
    ], 
    //this will send a response with the id of the resulting row as a json object
    (result) =>{
        
        res.json({ id: result.insertId });
    });
});
//this route should be able to handle update requests for various updates from the client
router.put("/api/burgers/:id", (req, res) =>{
    //this is the burger that we will be updating in the table
    let ID = req.params.id;
    //these arrays will hold the columns to be updated, and the the values to update them wtih
    let cols = [ ];
    let vals = [ ]
    //the request body will be parsed into the cols and vals array
    for (key in req.body){
        cols.push(key);
       //the values will need to be parsed into proper json objects so they can be undertood in the query
        vals.push(JSON.parse(req.body[key]));
    }
    console.log(cols, vals);
    //using the burger model to query the database
    burger.update(cols, ID, vals, (result) =>{
        res.status(200).end();
    });
})

module.exports = router;

