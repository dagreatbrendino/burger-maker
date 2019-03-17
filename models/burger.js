//Import ORM to create functions that will interact with burgers_db
const orm = require("../config/orm.js");

/*The burger object contains methods that call the functions defined in the ORM
the burger object will be exported an used as a model for the front end to manipulate
burgers_db*/
const burger = {
    all: (cb) => {
        orm.selectAll("burgers", (res) => {
            console.log("calling orm")
            cb(res);
        } );
    },
    insert: (cb) => {
        orm.insertOne("burgers", (res) => {
            cb(res);
        } );
    },
    update: (cb) => {
        orm.updateOne("burgers", (res) => {
            cb(res);
        } );
    }

}

module.exports = burger;
