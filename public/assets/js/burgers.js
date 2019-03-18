//this function contains functions that will be activated by events triggerd by the client
$( ()=>{
    $(".form-div").on("submit", (event) =>{
        event.preventDefault();
        let ingredientsIndexes = [];
        let checked = $(":checked")
    
        for (let i =0; i < checked.length; i++ ){
            ingredientsIndexes.push(checked[i].value);
        }
        console.log(ingredientsIndexes);
        let newBurger = {
            burger_name: $("#burg-name").val().trim(),
            ing_ind: ingredientsIndexes
        };
        //This is the front end frame work that allows users to access the controller routes
        if (newBurger.burger_name !=="" && newBurger.ing_ind.length > 0){
            $.ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(
                () =>{
                    console.log("creating new burger");
                    //reload the current page
                    location.reload();
                }
            );
        }
    });
    $("#submit-ingredient").on("click", (event) =>{
        event.preventDefault();
        console.log("submitting ingr ", $("#ingr-name").val().trim());
        let newIngredient = {
            ingredient_name: $("#ingr-name").val().trim()
        }
        if (newIngredient.ingredient_name !== ""){
            $.ajax("/api/ingredients", {
                type: "POST",
                data: newIngredient
            }).then(
                () =>{
                    location.reload();
                }
            )
        }
    })
    $(".devour-button").on("click", (event) => {
        event.preventDefault(); 
        console.log(this);
        let id = $(event.currentTarget).data("id");
        console.log(id);
        let currentStatus = $(event.currentTarget).data("devoured-status");
        console.log(currentStatus);
        let newStatus = {
            devoured: !currentStatus
        }
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newStatus
        }).then( () => {
            console.log("changed devoured from " + currentStatus);
            location.reload();
        });
    })
});