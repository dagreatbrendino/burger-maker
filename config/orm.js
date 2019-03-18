//importing connection to burgers_db database
let connection = require ("../config/connection.js");

const questionMarks = (valuesArr)=>{
    let valuesString= "";
    for (let val in valuesArr) { valuesString+="?"};
    return valuesString;
}
//this function is used to properly format the columns for update queries
const setColsQuery = (cols) => {
    let colsQuery = ""
    for (let i = 0; i < cols.length; i++){
        //if there is more than one column and this is not the last element of the columns array
        if ( i !== (cols.length -1) && cols.length >= 1){
            colsQuery += cols[i] + " = ?, "
        }
        else {
            colsQuery += cols[i] + " = ? "
        }
       
    }
    console.log(colsQuery)
    return(colsQuery);
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
    updateOne: (tableToQuery, columns, location, values, callback) => {
        //the query string is built
        let queryString = "UPDATE " + tableToQuery;
        queryString += " SET ";
        queryString += setColsQuery(columns);
        queryString += "WHERE id = ?"
        console.log(queryString);
        //this will be an array populated by the actions of the client and will be used to provide
        //the escaped queries for the sql query
        let clientString = values.concat(location);
        console.log(clientString);
        connection.query(queryString, clientString, (err, result) =>{
            if (err) throw err;

            callback(result);
        });
    }
}
module.exports = orm;