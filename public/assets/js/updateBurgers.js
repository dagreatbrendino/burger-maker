$( ()=>{
    $(".form-div").on("submit", (event) =>{
        event.preventDefault();
        let ingredientsIndexes = [];
        let checked = $(":checked")
        for (let i =0; i < checked.length; i++ ){
            ingredientsIndexes.push(checked[i].value);
        }

        let changedBurger = {
            burger_name: $("#burg-name").val().trim(),
            ingredients: ingredientsIndexes
        };
        //This is the front end frame work that allows users to access the controller routes
        if (changedBurger.burger_name !=="" && changedBurger.ingredients.length > 0){
            let id = $("#update-header").data("burg-id");
            console.log(id);
            $.ajax("/api/burgers/"+ id,{
                type: "PUT",
                data: changedBurger
            }).then(
                () => {
                    console.log("updating burger");
                    //reload the current page
                    location.assign("/");
                }
            );
        }
    });
})