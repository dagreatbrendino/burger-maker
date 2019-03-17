//this function contains functions that will be activated by events triggerd by the client
$( ()=>{
    $(".form-div").on("submit", (event) =>{
        event.preventDefault();

        let newBurger = {
            burger_name: $("#burg").val().trim()
        };
        //This is the front end frame work that allows users to access the controller routes
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
    });
});