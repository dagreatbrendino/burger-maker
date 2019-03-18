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
//This route provides the client with the ability to post a new burger to the burgers table
//by default the burger has not yet been devoured, so we only need to get the name of the new burger
//from the post requst. We will send the resulting 
router.post("/api/burgers", (req, res) =>{
    console.log("logging request " + req.body.burger_name);
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

router.put("/api/burgers/:id", (req, res) =>{
    let ID = req.params.id;
    let cols = [ ];
    let vals = [ ]
    console.log(req.body.devoured);
    for (key in req.body){
        cols.push(key);
        console.log("req body key " , req.body[key]);
        vals.push(JSON.parse(req.body[key]));
        console.log(typeof req.body[key]);
    }
    console.log(cols, vals);
    burger.update(cols, ID, vals, (result) =>{
        res.status(200).end();
    });
})

module.exports = router;

