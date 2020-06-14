const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect( (err) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    viewTable("departments");
    // addRow("departments", "Marketing");
    // updateRow("departments", department_id, ["Marketing Team"]);
    // // ---
    // updateManager(employee_id, new_manager_id);
    // viewTeam(manager_id); // and join the employees that share that id
    // deleteRow(table, id);
    // viewBudget(department_id); //filter employess by department_id join roles matching at role id sum salary
});
  
function viewTable(table) {
    // SELECT * FROM profile WHERE age > ? AND color = ?
    //   connection.query(`SELECT * FROM songs WHERE ? = ?`, (err, res) => {
    connection.query("SELECT * FROM ?",[table], (err, res) => {
        if (err) throw err;
        // console.log(res);
        console.log(res[0].title);
        
        connection.end();
    });
}