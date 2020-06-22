const connection = require('../connection.js');

class Query {
  constructor() {
    this.connection = connection;
  }

  viewTable(table) {
    return this.connection.query("SELECT * FROM ??;",[table]);
  }

  viewCols(table, arr) {
    return this.connection.query("SELECT ?? FROM ??;",[arr, table]);
  }

  async viewRow(table, obj){
    // todo select from table where title, name already exist should work
    // todo select from tabel where both first and lastnme exist needs to be figured out

    // console.log('viewRow')
    // console.log(table, obj)
    let keys = Object.keys(obj)
    let vals = keys.map((key) => obj[key]);
    let where = keys.length > 1 ? `${keys[0]}='${vals[0]}' AND ${keys[1]}='${vals[1]}'` : `${keys[0]}='${vals[0]}'`;

    return this.connection.query(`SELECT * FROM ?? WHERE ${where};`,[table]);
  }

  viewTeam(id){
    return this.connection.query(`SELECT * FROM Employees WHERE manager_id = ?;`, [id]);
  }

// TO ELIAS OR MICHAEL, IM NOT PROUD OF THE FOLLOWING SPEGHETTI CODE BUT TIME WAS SHORT
// AND GETTIGN IT TO WORK WAS MORE IMPORTANT THAN MAKING IT LOOK SEXY
// ENJOY PARSING THE MESS THAT FOLLOWS
  async modRow(table, obj, update, del) {
    // MY HACK TO DEAL WITH NOT FINDING AN ELEGANT WAY TO PASS INFO FROM INQUIRER WITHOUT HAVING IT BEING DISPLAYED
    // ESSENTIALLY SEARCH FOR THE LIST SPECIFIC KEYS (E.G. THOSE WITH 'S' ON THE END)
    // REPLACE THOSE WITH THE APPROPRIATE KEY THE DB IS LOOKING FOR
    // THEN DO SOME DB LOOKUPS TO PAIR THE NAME VALUE WITH THE ID OF THE CHOSEN ITEM
    let originalKeys = Object.keys(obj).filter((key) => obj[key] != '');
    let badkeys = ['role', 'roles', 'department', 'departments', 'manager', 'employee', 'names'];
    let moddedKeys;
    let vals;

    for(let key of originalKeys){
      // REMOVE WHITESPACE FROM INSIDE OF NAMES
      if( key == 'first_name' || key == 'last_name'){
        obj[key] = obj[key].replace(/\s+/g, '')
      }

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
              sendObj.first_name = names[0]
              sendObj.last_name = names[1]
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

    if(del){
      return this.connection.query(`DELETE FROM ?? WHERE id = ?;`, [table, obj.id]).catch((err)=> {
        if(err){
          console.log(
            `********* FORBIDDEN *********
            Item is referenced in another item/table.
            If item is a Manager, please update all reporting employees to another manager.
            If item is a Role, please update all associated employees to another Role.
            If item is a Department, please update associated Roles to another Department.`
          );
        }
      });
    }

    return this.connection.query("INSERT INTO ?? (??) VALUES (?);", [table, moddedKeys, vals]);
  }
}

module.exports = Query;
