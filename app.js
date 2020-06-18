const inquirer = require('inquirer');
// const { Table } = require('console-table-printer');
const Query = require('./db/query.js');
const Questions = require('./questions.js');

const database = new Query();
const questions = new Questions();

let newEmployee = {
    "first_name" : "Madeline",
    "last_name" : "Lamour",
    "role_id" : 3,
    "manager_id" : 10
};

let newDep = {
    "name" : 'fuck it inc dose'
};

let newRole = {
    "title" : "paperwork donkey", 
    "salary" : 3.50, 
    "department_id" : 2
};

// database.addRow('roles', newRole).then((response) => {
//     console.log('ADD ROW:');
//     console.table(response);
// });

// database.updateRow("employees", 11, newEmployee).then((response) => {
//     console.log('UPDATE ROW:');
//     console.log(response);
// });

// database.viewTable('employees').then((response) => {
//     console.log('VIEW TABLE:');
//     console.table(response);
// });


function init(){
    // let table = '';
    inquirer.prompt(questions.showMainMenu())
        .then(async (answers) => {
            // table = answers.tables;
            await database.viewTable(answers.tables.toLowerCase())
                .then((res) => {
                    console.log('\n');
                    console.table(res);
                    console.log('\n');
                });
                return answers.tables;
        })
        .then((returnedTable) => {
            // console.log(thing)
            inquirer.prompt(questions.showActions())
                .then((answers) => {
                    let { actions } = answers;
                    let thing = actions.toLowerCase() + returnedTable;
                    // console.log(thing)
                    inquirer.prompt(questions[thing]())
                        .then( (answers) => {
                            console.log(answers)
                        })

                    // if(answers.actions == 'Add'){
                    //     inquirer.prompt(questions[actions.toLowerCase() + table])
                    // }else if(answers.actions == 'Update'){

                    // }else if(answers.actions == 'Delete'){

                    // }else{
                    //     init();
                    // }
                })
        });  
}

init();

// ----------------------------------------------------------

// async function askQuestions(q){
//     let obj = {};

//     inquirer.prompt(q)
//     .then((answers) => {
//         obj = answers;
//         obj.id = allEmployees.length + 1;

//         inquirer.prompt(questions[obj.role.toLowerCase()])
//         .then((answers) => {
//             for(answer in answers){ //ADD ROLE SPECIFIC ATTRIBUTE TO OBJ
//                 obj[answer] = answers[answer];
//             }

//             inquirer.prompt(questions.add)
//             .then((answers) => {
//                 allEmployees.push(obj);

//                 if(answers.continue){
//                     askQuestions(questions.common)
//                 }else{
//                     inquirer.prompt(questions.team)
//                     .then((answers) => {
//                         let teamName = answers.team ? answers.team : 'My Team';  
//                         let team = buildTeamObjs(allEmployees);
//                         writeToFile(render(team, teamName), teamName.replace(/\s/g, "").toLowerCase());
//                     }) 
//                 }
//             })
//         })
//     })
// }