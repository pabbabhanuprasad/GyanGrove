
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bhanu@123",
  database: "events_db",
});


connection.connect((err)=>{
    if(err){
        console.log(err,"Database Not Connection")
    }else{
        console.log("Database Connected")
    }
})

module.exports = connection;