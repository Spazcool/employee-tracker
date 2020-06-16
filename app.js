const inquirer = require('inquirer');
const mysql = require('mysql');
const { Table } = require('console-table-printer');
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
    // addRow("employees", 
    //     {
    //         "first_name" : "p",
    //         "last_name" : "diddy",
    //         "role_id" : 2,
    //         "manager_id" : 5
    //     }
    // );

    updateRow("roles", 2, 
        {
            "title" : "Intern",
            "salary" : 15,
            "department_id" : 2
        }
    );
    viewTable('roles');
    // // ---
    // updateManager(employee_id, new_manager_id);
    // viewTeam(manager_id); // and join the employees that share that id
    // deleteRow(table, id);
    // viewBudget(department_id); //filter employess by department_id join roles matching at role id sum salary
    connection.end();

});
  
function viewTable(table) {
    connection.query("SELECT * FROM ??;",[table], (err, res) => {
        if (err) throw err;
        // const p = new Table();
        // p.addRow({ index: 1, text: 'red wine', value: 10.212 }, { color: 'red' });
        // p.addRow({ index: 2, text: 'green gemuse', value: 20.0 }, { color: 'green' });
        // p.addRow({ index: 3, text: 'gelb bananen', value: 100 }, { color: 'yellow' });
        // p.printTable();
        console.log(res);
    });
}

function addRow(table, obj) {
    let keys = Object.keys(obj);
    let vals = keys.map((key) => obj[key]);

    keys.forEach((key) => {})
    connection.query("INSERT INTO ?? (??) VALUES (?);", [table, keys, vals], (err, res) => {
        if (err) throw err;
        console.log(`Added | ${vals.join(' | ')} | successfully!`);
    });
}

function updateRow(table, row, obj) {
    let keys = Object.keys(obj);
    let vals = keys.map((key) => obj[key]);
// todo might not work with latency, might need to be async
    keys.forEach((key) => {
        connection.query("UPDATE ?? SET ?? = ? WHERE id = ?;", [table, key, obj[key], row], (err, res) => {
            if (err) throw err;
        });
    });
    console.log(`Updated | ${vals.join(' | ')} | successfully!`);
}