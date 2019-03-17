//importing connection to burgers_db database
let connection = require ("../config/connection.js");

const questionMarks = (valuesArr)=>{
    let valuesString= "";
    for (let val in valuesArr) { valuesString+="?"};
    return valuesString;
}
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
    insertOne: (tableToQuery, columns, values, callback) => {
        //first the query that will be used to insert the new burger into the table is built
        let queryString = "INSERT INTO " + tableToQuery;

        queryString += " (";
        queryString += columns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += questionMarks(values);
        queryString += ") ";

        console.log("querying at " + queryString);
        console.log("for values " + values);
        //the database is queried with the string and the values received from the client
        connection.query(queryString, values, (err, result) =>{
            if (err) throw err;
            //this callback function will be defined in the controller
            callback(result);
        });
 
    },

    //this function will update column information for a particular burger in the burgers table
    updateOne: () => {

    }
}
module.exports = orm;