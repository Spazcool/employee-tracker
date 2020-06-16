const inquirer = require('inquirer');
const { Table } = require('console-table-printer');
const Query = require('./db/query.js');
const database = new Query();

// database.viewTable('employees').then((response) => {
//     console.table(response);
// });
let newEmployee = 
    {
        "first_name" : "billy",
        "last_name" : "bob",
        "role_id" : 2,
        "manager_id" : 6
    };
let newDep = {"name" : 'Menswear'};

database.addRow('employees', newEmployee).then((response) => {
    console.table(response);
});

database.viewTable('employees').then((response) => {
    console.table(response);
});

// database.updateRow("roles", 2, 
// {
//     "title" : "Intern",
//     "salary" : 15,
//     "department_id" : 2
// }).then((response)=>{
//     console.log(response);
// })
database.updateRow("departments", 2, newDep).then((response)=>{
    console.log(response);
})

database.viewTable('employees').then((response) => {
    console.table(response);
});
//     // addRow("employees", 
        // {
        //     "first_name" : "p",
        //     "last_name" : "diddy",
        //     "role_id" : 2,
        //     "manager_id" : 5
        // }
//     // );

    // updateRow("roles", 2, 
    //     {
    //         "title" : "Intern",
    //         "salary" : 15,
    //         "department_id" : 2
    //     }
//     );
//     viewTable('roles');
//     // // ---
//     // updateManager(employee_id, new_manager_id);
//     // viewTeam(manager_id); // and join the employees that share that id
//     // deleteRow(table, id);
//     // viewBudget(department_id); //filter employess by department_id join roles matching at role id sum salary
//     // connection.end();

// });