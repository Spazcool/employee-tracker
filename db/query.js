const connection = require('../connection.js');

class Query {
  constructor() {
    this.connection = connection;
  }

  viewTable(table) {
    return this.connection.query("SELECT * FROM ??;",[table]);
  }

  addRow(table, obj) {
    let keys = Object.keys(obj);
    let vals = keys.map((key) => obj[key]);

    return this.connection.query("INSERT INTO ?? (??) VALUES (?);", [table, keys, vals]);
  }

  async updateRow(table, row, obj) {
    let keys = Object.keys(obj);
    let vals = keys.map((key) => obj[key]);
    let res = [];

// todo might not work with latency, might need to be async
    keys.forEach(async (key) => {
      let temp = await this.connection.query("UPDATE ?? SET ?? = ? WHERE id = ?;", [table, key, obj[key]]);
      res.push(temp);
    });
    console.log(res)
    // async function printFiles () {
    //   const files = await getFilePaths();
    
    //   await Promise.all(files.map(async (file) => {
    //     const contents = await fs.readFile(file, 'utf8')
    //     console.log(contents)
    //   }));
    // }
    // const start = async () => {
    //   await asyncForEach(keys, async (num) => {
    //     await waitFor(50);
    //     console.log(num);
    //   });
    //   console.log('Done');
    // }
    // return res;
    // this.connection.end();

    // return `Updated | ${vals.join(' | ')} | successfully!`;
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
