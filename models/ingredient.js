const orm = require("../config/orm");

const ingredient = {
    all: (cb) => {
        orm.selectAll("ingredients", (res) => {
            console.log("calling orm")
            cb(res);
        } );
    },
    //the cols to update, values to update with, and callback function will be defined in the controller
    insert: (cols, vals, cb) => {
        orm.insertOne("ingredients", cols, vals, (res) => {
            cb(res);
        } );
    }
}

module.exports = ingredient;