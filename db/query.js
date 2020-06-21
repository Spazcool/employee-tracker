const connection = require('../connection.js');
const mysql = require('mysql');

class Query {
  constructor() {
    this.connection = connection;
  }

  viewTable(table) {
    // return this.connection.query("SELECT * FROM ?? ORDER BY id;",[table]);
    return this.connection.query("SELECT * FROM ??;",[table]);
  }

  viewCols(table, arr) {
    return this.connection.query("SELECT ?? FROM ??;",[arr, table]);
  }

  async viewRow(table, obj){
    console.log('viewRow')
    console.log(table, obj)
    // let filters = ['title', 'first_name', 'last_name', 'name'];
    // let keys = Object.keys(obj).filter((key) => obj[key] != '' && filters.includes(key));
    let keys = Object.keys(obj)
    let vals = keys.map((key) => obj[key]);
    let where = keys.length > 1 ? `${keys[0]}='${vals[0]}' AND ${keys[1]}='${vals[1]}'` : `${keys[0]}='${vals[0]}'`;
    // todo select from table where title, name already exist should work
    // todo select from tabel where both first and lastnme exist needs to be figured out
  //   let thing = this.connection.query(`SELECT * FROM ?? WHERE ${where};`,[table]);
  //   thing.then((res) => {
  //     console.log("@@@@", res);
  // });
    console.log('wherer', where)
    return this.connection.query(`SELECT * FROM ?? WHERE ${where};`,[table]);
  }

  viewTeam(id){
    return this.connection.query(`SELECT * FROM Employees WHERE manager_id = ?;`, [id]);
  }
// TO ELIAS OR MICHAEL, IM NOT PROUD OF THE FOLLOWING SPEGHETTI CODE BUT TIME WAS SHORT
// AND GETTIGN IT TO WORK WAS MORE IMPORTANT THAN MAKING IT LOOK SEXY
// ENJOY
  async modRow(table, obj, update) {
    let originalKeys = Object.keys(obj).filter((key) => obj[key] != '');
    let badkeys = ['role', 'roles', 'department', 'departments', 'manager', 'employee', 'names'];
    let moddedKeys;
    let vals;

    for(let key of originalKeys){
      for(let badkey of badkeys){
        if(key == badkey){
          let tabName;
          let sendObj = {};
          if(badkey == 'role' || badkey == 'roles'){
            tabName = 'roles';
            sendObj.title = obj[badkey];
          }else if(badkey == 'department' || badkey == 'departments'){
            tabName = 'departments';
            sendObj.name = obj[badkey];
          }else{
            tabName = 'employees';
            if(obj[badkey] !== '-- N/A --'){
              let names = obj[badkey].split(" ");
              sendObj.first_name = names[0];
              sendObj.last_name = names[1];
            }else{
              sendObj.first_name = ''
            }
          }
         
          obj[`${key}_id`] = obj[badkey];
          delete obj[badkey];

          await this.viewRow(tabName, sendObj)
          .then((res) => {
              if(res[0]){
                if(`${key}_id` == 'names_id' || `${key}_id` == 'roles_id' || `${key}_id` == 'departments_id'){
                  obj['id'] = obj[`${key}_id`];
                  obj['id'] = res[0].id;
                  delete obj[`${key}_id`];
                }else{
                  obj[`${key}_id`] = res[0].id;
                }
              }else{
                delete obj[`${key}_id`];
              }
          })
        }  
      }
    }

    moddedKeys = Object.keys(obj);
    vals = moddedKeys.map((key) => obj[key]);

    if(update){
      let arr = moddedKeys.map((key) => {
        let val = typeof obj[key] == 'string' ? `'${obj[key]}'`: obj[key];
        return `${key}=${val}`;
      }).join(',');
     
      return this.connection.query(`UPDATE ?? SET ${arr} WHERE id = ?;`, [table, obj.id]);
    }

    return this.connection.query("INSERT INTO ?? (??) VALUES (?);", [table, moddedKeys, vals]);
  }

  // updateRow(table, id, obj) {
  //   console.log("update row")
  //   let badkeys = ['role', 'department', 'manager', 'employee', 'names'];

  //   console.log(table, id, obj)
  //   let keys = Object.keys(obj);
  //   let arr = keys.map((key) => {
  //     let val = typeof obj[key] == 'string' ? `'${obj[key]}'`: obj[key];
  //     return `${key}=${val}`;
  //   }).join(',');

  //     // todo update relations
  //   // if manager
  //   // this.viewTeam(id).then((res) => {
  //     // returns emloyees related to manager
  //   //   console.log(res)
  //   // });

  //   // query whole table, check for parent ids (manager)
  //   // update users with manager id to == new id
  //   // update manager 

  //   // return this.connection.query(`UPDATE ?? SET ${arr} WHERE id = ?;`, [table, id]);
  //   // return this.connection.query(`UPDATE ?? SET (?) WHERE id = ?;`, [table, obj, row]);
  // }

  deleteRow(table, id) {
    // todo delete relations
    // if manager
    // query whole table, check for parent ids (manager)
    // update users with manager id to == null
    // delete manager
    return this.connection.query(`DELETE FROM ?? WHERE id = ?;`, [table, id]);
    // return this.connection.query(`UPDATE ?? SET (?) WHERE id = ?;`, [table, obj, row]);
  }
  // TODO BONUS METHODS BELOW

    // updateManager(employee_id, new_manager_id);
    // viewTeam(manager_id); // and join the employees that share that id
    // viewBudget(department_id); //filter employess by department_id join roles matching at role id sum salary
    
    // return this.connection.query('SELECT * FROM songs WHERE artist = ?;', [artist,]);
    // return this.connection.query('SELECT artist FROM songs GROUP BY ARTIST having COUNT(*) > 1;');
    // return this.connection.query('SELECT * FROM songs where position BETWEEN ? AND ?;',[start, end]);
    // return this.connection.query('SELECT * FROM songs WHERE song_name = ?;', [title,]);
}

module.exports = Query;
