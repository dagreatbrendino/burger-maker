//importing connection to burgers_db database
let connection = require ("../config/connection.js");

const orm = {
    //this functtion will select column information for all burgers
    selectAll: (tableToQuery, callback) => {
        console.log(tableToQuery);
        let queryString = "SELECT * FROM " + tableToQuery + ";";
        connection.query(queryString, (err , result) => {
            if (err) throw err;
            callback(result);
        });
    },

    //this function will add a new burger to the burgers table
    insertOne: () => {

    },

    //this function will update column information for a particular burger in the burgers table
    updateOne: () => {

    }
}
module.exports = orm;