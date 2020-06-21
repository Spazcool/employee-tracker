const Query = require('./db/query.js');
const database = new Query();

class Questions {

    showMenu(){
        return [
            {
                type: 'list',
                name: 'tables',
                message: 'Which would you like to view?',
                // choices: ['Employees', 'Departments', 'Roles', 'Team']
                choices: ['Employees', 'Departments', 'Roles']

            }
        ]
    }

    showActions(){
        return [
            {
                type: 'list',
                name: 'actions',
                message: "What would you like to do?",
                choices: ["Add", "Update", "Delete", "Return to Menu"]
            }
        ]
    }

    showTeam(){
        return [
            {
                type : 'list',
                name : 'manager_id',
                message : 'Manager:',
                choices: async () => database.viewCols('employees', ['first_name', 'last_name']).then((res) => {
                    let managers = res.map((manager) => `${manager.first_name} ${manager.last_name}`)
                    managers.push('-- N/A --');
                    return managers
                })
            }
        ]
    }
// ----------- ADD --------------
    addEmployees(){ 
        return [
            {
                type: 'input',
                name: 'first_name',
                message: 'First Name:',
                validate: (input) => this.validString(input)
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Last Name:',
                validate: (input) => this.validString(input)
            },
            {
                type: 'list',
                name: 'role',
                message: 'Role:',
                choices: () => this.roleList()
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Manager:',
                choices: () => this.managerList()            
            }
        ]
    }

    addRoles(){
        return [
            {
                type: 'input',
                name: 'title',
                message: 'Role title:',
                validate: (input) => this.validString(input)
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Role salary:',
                validate: (input) => this.validInt(input)
            },
            {
                type: 'list',
                name: 'department',
                message: 'Department:',
                choices: () => this.departmentList()
            }
        ]
    }

    addDepartments(){
        return [
            {
                type: 'input',
                name: 'name',
                message: 'Department name:',
                validate: (input) => this.validString(input)
            }
        ]
    }
// ----------- UPDATE --------------
    updateEmployees(){ 
        return [
            {
                type: 'list',
                name: 'names',
                message: 'Employee: ',
                choices: () => this.employeeList()
            },
// todo put the chosen name value here
            {
                type: 'input',
                name: 'first_name',
                message: 'First Name:',
                validate: (input) => this.validString(input)
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Last Name:',
                validate: (input) => this.validString(input)
            },
            {
                type: 'list',
                name: 'role',
                message: 'Role:',
                choices: () => this.roleList()           
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Manager:',
                choices: () => this.managerList()
            }
        ]
    }

    updateRoles(){
        return [
            {
                type: 'list',
                name: 'roles',
                message: 'Role:',
                choices: () => this.roleList()
            },
            {
                type: 'input',
                name: 'title',
                message: 'Role title:',
                validate: (input) => this.validString(input)
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Role salary:',
                validate: (input) => this.validInt(input)
            },
            {
                type: 'list',
                name: 'department',
                message: 'Department:',
                choices: () => this.departmentList()
            }
        ]
    }

    updateDepartments(){
        return [
            {
                type: 'list',
                name: 'departments',
                message: 'Department:',
                choices: () => this.departmentList()
            },
            {
                type: 'input',
                name: 'name',
                message: 'Department name:',
                validate: (input) => this.validString(input)
            }
        ]
    }
// ----------- DELETE --------------
    deleteEmployees(){ 
        return [
            {
                type: 'list',
                name: 'id',
                message: 'Employee: ',
                choices: () => this.employeeList()
            }
        ]
    }

    deleteRoles(){
        return [
            {
                type: 'list',
                name: 'id',
                message: 'Role:',
                choices: () => this.roleList()
            }
        ]
    }

    deleteDepartments(){
        return [
// todo add confirmation
            {
                type: 'list',
                name: 'id',
                message: 'Department:',
                choices: () => this.departmentList()
            }
        ]
    }

// ----------- HELPERS --------------
    validString(str){
        return str.length > 0 ? true : `Must inlude a value.`;
    }

    validInt(int){
        return Number.isInteger(parseInt(int)) === true ? true : `Must inlude an integer value`;
    }

    validOptionalInt(int){
        if(Number.isInteger(parseInt(int)) || int == '') return true;
        else return 'Must be an integer value.'
    }

// ----------- DB CALLS --------------
    managerList (){
        return database.viewCols('employees', ['first_name', 'last_name', 'role_id'])
        .then((res) => {
            return database.viewCols('roles', ['id', 'title'])
            .then((response) => {
                let managerRole = response.filter((thing) => thing.title == 'Manager');
                let managers = res.filter((employee) => employee.role_id === managerRole[0].id)
                .map((manager) => `${manager.first_name} ${manager.last_name}`)
                managers.push('-- N/A --');
                return managers
            })
        })
    }

    roleList(){
        return database.viewCols('roles', 'title')
        .then((res) => {
            let roles = res.map((role) => role.title)
            return roles
        })
    }

    departmentList(){
        return database.viewCols('departments', 'name')
        .then((res) => {
            let depts = res.map((dept) => dept.name);
            return depts;
        })
    }

    employeeList(){
        return database.viewCols('employees', ['first_name', 'last_name'])
        .then((res) => {
            let employees = res.map((employee) => `${employee.first_name} ${employee.last_name}`)
            return employees
        }) 
    }
};

module.exports = Questions;
