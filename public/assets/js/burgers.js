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

    $(".devour-button").on("click", (event) => {
        event.preventDefault(); 
        console.log(this);
        let id = $(event.currentTarget).data("id");
        console.log(id);
        let currentStatus = $(event.currentTarget).data("devoured-status");
        console.log(currentStatus);
        let newStatus = {
            devoured: !currentStatus,
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