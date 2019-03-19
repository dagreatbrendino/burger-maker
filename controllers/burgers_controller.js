const express = require("express");

const burger = require("../models/burger.js");
const ingredient = require("../models/ingredient.js");

const router = express.Router();

//This is the route to the top level of the server. It will query burgers_db and then
//send a response the renders with index.handlebars passing in all burgers that were returned from
//the query
let allIngredientsArr;
router.get("/" , (request, response) => { 
    burger.all( (burgerData)=> {
        allIngredientsArr = [];
        for(row in burgerData){
            //the ingredients array is a JSON array and needs to be parsed into an array that handlebars will 
            //be able to understand
            burgerData[row].ingredients = JSON.parse(burgerData[row].ingredients)
        }
        //get all ingredients from ingredients table
        // let allIngredientsArr =[];
        ingredient.all((ingredientData) =>{
            for (row in ingredientData){
                allIngredientsArr.push(ingredientData[row].ingredient_name);
            }
        });
        //the object for handlebars
        let obj4Hbrs = {
            burgers: burgerData,
            allIngredients: allIngredientsArr
        }
        response.render("index", obj4Hbrs)
    });
});
//This route provides the client with the ability to post a new burger to the burgers table
//by default the burger has not yet been devoured, so we only need to get the name of the new burger
//from the post requst. We will send the resulting 
router.post("/api/burgers", (req, res) =>{
    console.log("all ings" + allIngredientsArr)
    let burgerIngredients = [];

    for (item  in req.body.ing_ind){
        // console.log("burgr ingredient " + allIngredientsArr[req.body.ing_ind[item]]);
        burgerIngredients.push(allIngredientsArr[req.body.ing_ind[item]]);
    }
    console.log(burgerIngredients)
    burgerIngredients = JSON.stringify(burgerIngredients);
    console.log(burgerIngredients)
    burger.insert([
        "burger_name",
        "ingredients"
    ], [
        req.body.burger_name,
        burgerIngredients
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

router.get("/api/burgers/:id", (req, res) =>{
    let location = req.params.id;
    let returnedBurger;
    burger.one(location, (burgerInfo) =>{
        returnedBurger =burgerInfo[0];
        returnedBurger.ingredients = JSON.parse(returnedBurger.ingredients);
        allIngredientsArr = [];
        ingredient.all((ingredientData) =>{
            for (row in ingredientData){
                allIngredientsArr.push(ingredientData[row].ingredient_name);
            }
        });
        let burgerHbs = {
            burger: returnedBurger,
            allIngredients: allIngredientsArr
        }
        res.render("burgerEdit", burgerHbs);
    });
});

router.post("/api/ingredients", (req, res) =>{
    let newIngredient = req.body.ingredient_name;
    ingredient.insert([
        "ingredient_name"
    ],[
        newIngredient
    ],
    (result) =>{
        res.json({ id: result.insertId})
    })
})

module.exports = router;

