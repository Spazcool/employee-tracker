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

  viewRow(table, obj){
    let filters = ['title', 'first_name', 'last_name', 'name'];
    let keys = Object.keys(obj).filter((key) => obj[key] != '' && filters.includes(key));
    let vals = keys.map((key) => obj[key]);
    let where = keys.length > 1 ? `${keys[0]}='${vals[0]}' AND ${keys[1]}='${vals[1]}'` : `${keys[0]}='${vals[0]}'`;

    // todo select from table where title, name already exist should work
    // todo select from tabel where both first and lastnme exist needs to be figured out
  //   let thing = this.connection.query(`SELECT * FROM ?? WHERE ${where};`,[table]);
  //   thing.then((res) => {
  //     console.log("@@@@", res);
  // });
   return this.connection.query(`SELECT * FROM ?? WHERE ${where};`,[table]);
  }

  viewTeam(id){
    return this.connection.query(`SELECT * FROM Employees WHERE manager_id = ?;`, [id]);
  }

  addRow(table, obj) {
    let keys = Object.keys(obj).filter((key) => obj[key] != '');
    let vals = keys.map((key) => obj[key]);
// todo add validation, if row already exists
    // this.viewRow(table, obj).then( (res) =>  {
    //   if(res){
    //     // todo give them an option to do it anyway
    //     console.log( `${table.substr(0, table.length - 1)} already exists`);
    //   }
    //   return this.connection.query("INSERT INTO ?? (??) VALUES (?);", [table, keys, vals]);
    // })
    return this.connection.query("INSERT INTO ?? (??) VALUES (?);", [table, keys, vals]);

  }

  updateRow(table, id, obj) {
    let keys = Object.keys(obj);
    let arr = keys.map((key) => {
      let val = typeof obj[key] == 'string' ? `'${obj[key]}'`: obj[key];
      return `${key}=${val}`;
    }).join(',');

      // todo update relations
    // if manager
    this.viewTeam(id).then((res) => {
      // returns emloyees related to manager
      console.log(res)
    });

    // query whole table, check for parent ids (manager)
    // update users with manager id to == new id
    // update manager 

    return this.connection.query(`UPDATE ?? SET ${arr} WHERE id = ?;`, [table, id]);
    // return this.connection.query(`UPDATE ?? SET (?) WHERE id = ?;`, [table, obj, row]);
  }

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
