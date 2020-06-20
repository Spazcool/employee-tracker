class Questions {
    constructor() {
    }

    showMenu(){
        return [
            {
                type: 'list',
                name: 'tables',
                message: 'Which would you like to view?',
                choices: ['Employees', 'Departments', 'Roles', 'Team']
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
                type : 'input',
                name : 'manager_id',
                message : 'Manager ID:',
                validate: (input) => this.validInt(input)
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
// todo show role list?
                type: 'input',
                name: 'role_id',
                message: 'Role ID:',
                validate: (input) => this.validInt(input)
            },
            {
// todo show manager list?
                type: 'input',
                name: 'manager_id',
                message: 'Manager ID:',
                validate: (input) => this.validOptionalInt(input)
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
                type: 'input',
                name: 'department_id',
                message: 'Department ID:',
                validate: (input) => this.validInt(input)
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
// todo show list of currently used ids
            {
                type: 'input',
                name: 'id',
                message: 'Employee ID: ',
                validate: (input) => this.validInt(input)
            },
// todo put the current value here
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
// todo show role list?
                type: 'input',
                name: 'role_id',
                message: 'Role ID:',
                validate: (input) => this.validInt(input)
            },
            {
// todo show manager list?
                type: 'input',
                name: 'manager_id',
                message: 'Manager ID:',
                validate: (input) => this.validOptionalInt(input)
            }
        ]
    }

    updateRoles(){
        return [
// todo show list of currently used ids
            {
                type: 'input',
                name: 'id',
                message: 'Role ID:',
                validate: (input) => this.validInt(input)
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
                type: 'input',
                name: 'department_id',
                message: 'Department ID:',
                validate: (input) => this.validInt(input)
            }
        ]
    }

    updateDepartments(){
        return [
// todo show list of currently used ids
            {
                type: 'input',
                name: 'id',
                message: 'Department ID:',
                validate: (input) => this.validInt(input)
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
// todo show list of currently used ids
            {
                type: 'input',
                name: 'id',
                message: 'Employee ID: ',
                validate: (input) => this.validInt(input)
            }
        ]
    }

    deleteRoles(){
        return [
// todo show list of currently used ids
            {
                type: 'input',
                name: 'id',
                message: 'Role ID:',
                validate: (input) => this.validInt(input)
            }
        ]
    }

    deleteDepartments(){
        return [
// todo show list of currently used ids
// todo add confirmation
            {
                type: 'input',
                name: 'id',
                message: 'Department ID:',
                validate: (input) => this.validInt(input)
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
};

module.exports = Questions;
