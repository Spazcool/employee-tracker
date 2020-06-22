const inquirer = require('inquirer');
const { Table } = require('console-table-printer');
const Query = require('./db/query.js');
const Questions = require('./questions.js');
const database = new Query();
const questions = new Questions();
const colors = [
'red',
'green',
'yellow',
'white',
'blue',
'magenta',
'cyan',
'crimson',
'white_bold'
];

function print(arr){
    let randoColor = Math.floor(Math.random() * (colors.length));
    const table = new Table();

    arr.forEach((item) => {
        table.addRow( item , { color: colors[randoColor] });
    })
    table.printTable()
}

function init(){
// MAIN MENU / SELECT A TABLE
    inquirer.prompt(questions.showMenu())
    .then(async (answers) => {
        await database.viewCols(answers.tables.toLowerCase(), '*')
        .then((res) => {
            print(res);
        });
        return answers.tables;  
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
                        await database.modRow(obj.table, answers, false, false);
                    break;
                    case 'update':
                        await database.modRow(obj.table, answers, true, false);
                    break;
                    case 'delete':
                        await database.modRow(obj.table, answers, false, true);
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
                print(res)
            });
        }
    })
// SHOW MAIN MENU
    .then(() => {
        init();
    })
}

init();
