const connection = require('../connection.js');

class Query {
  constructor() {
    this.connection = connection;
  }

  viewTable(table) {
    // return this.connection.query("SELECT * FROM ?? ORDER BY id;",[table]);
    return this.connection.query("SELECT * FROM ??;",[table]);
  }
// todo add validation, if row already exists
  addRow(table, obj) {
    let keys = Object.keys(obj);
    let vals = keys.map((key) => obj[key]);
    console.log('getting this far?')
    return this.connection.query("INSERT INTO ?? (??) VALUES (?);", [table, keys, vals]);
  }

  async updateRow(table, row, obj) {
    let keys = Object.keys(obj);
    let arr = keys.map((key) => {
      let val = typeof obj[key] == 'string' ? `'${obj[key]}'`: obj[key];
      return `${key}=${val}`;
    }).join(',');

    return this.connection.query(`UPDATE ?? SET ${arr} WHERE id = ?;`, [table, row]);
  }

  // TODO BONUS METHODS BELOW

    // updateManager(employee_id, new_manager_id);
    // viewTeam(manager_id); // and join the employees that share that id
    // deleteRow(table, id);
    // viewBudget(department_id); //filter employess by department_id join roles matching at role id sum salary
    
    // return this.connection.query('SELECT * FROM songs WHERE artist = ?;', [artist,]);
    // return this.connection.query('SELECT artist FROM songs GROUP BY ARTIST having COUNT(*) > 1;');
    // return this.connection.query('SELECT * FROM songs where position BETWEEN ? AND ?;',[start, end]);
    // return this.connection.query('SELECT * FROM songs WHERE song_name = ?;', [title,]);
}

module.exports = Query;
