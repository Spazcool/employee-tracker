const inquirer = require('inquirer');
// const { Table } = require('console-table-printer');
const Query = require('./db/query.js');
const Questions = require('./questions.js');

const database = new Query();
const questions = new Questions();

function init(){
// MAIN MENU / SELECT A TABLE
    inquirer.prompt(questions.showMenu())
    .then(async (answers) => {
        if(answers.tables === 'Team'){
            // return inquirer.prompt(questions.showTeam())
            // .then(async (answers) => {

            //     await database.viewTeam(answers.name)
            //     .then((res) => {
            //         console.log('\n');
            //         console.table(res);
            //         console.log('\n');
            //     })
            // })
            // .then(() => {
            //     init();
            // })
        }else{
            await database.viewCols(answers.tables.toLowerCase(), '*')
            .then((res) => {
                console.log('\n');
                console.table(res);
                console.log('\n');
            });
            return answers.tables;
        }  
    })
// SHOW AVAILABLE ACTIONS
    .then(async (returnedTable) => {
        return inquirer.prompt(questions.showActions())
        .then( (answers) => {
            return {
                qAction : answers.actions == 'Return to Menu' ? 'showMenu' : answers.actions.toLowerCase() + returnedTable,
                dbAction : answers.actions, 
                table : returnedTable
            };
        });
    })
// APPLY ACTION TO DB
    .then((obj) => {
        if(obj.qAction !== 'showMenu'){
            return inquirer.prompt(questions[obj.qAction]())
            .then( async (answers) => {
                switch(obj.dbAction.toLowerCase()){
                    case 'add':
                        await database.modRow(obj.table, answers, false);
                    break;
                    case 'update':
                        await database.modRow(obj.table, answers, true);
                    break;
                    case 'delete':
                        await database.deleteRow(obj.table, answers.id);
                    break;
                    default:
                }
                return obj;
            })
        }
    })
// SHOW CHANGES MADE TO DB
    .then(async (obj) => {
        if(obj){
            await database.viewTable(obj.table.toLowerCase())
            .then((res) => {
                console.log('\n');
                console.table(res);
                console.log('\n');
            });
        }
    })
// SHOW MAIN MENU
    .then(() => {
        init();
    })
}

init();
