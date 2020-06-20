class Questions {
    constructor() {
    }
// load
//     list options
//         employees
//         depatartments
//         roles
//             view ^
//                 view actions
//                     add
//                     update
//                     delete
//                     return to main menu
//                         run ^ & view again
    showMenu(){
        return [
            {
                type: 'list',
                name: 'tables',
                message: 'Which table would you like to view?',
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
// ----------- ADD --------------
    addEmployees(){ 
        return [
            {
                type: 'input',
                name: 'first_name',
                message: 'First Name:',
                // validate: this.validString(input, name)
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Last Name:',
                // validate: this.validString(input, name)
            },
            {
// todo show role list?
                type: 'input',
                name: 'role_id',
                message: 'Role ID:',
                // validate: this.validInt(input, name)
            },
            {
// todo show manager list?
                type: 'input',
                name: 'manager_id',
                message: 'Manager ID:',
                // validate: this.validInt(input, name)
            }
        ]
    }

    addRoles(){
        return [
            {
                type: 'input',
                name: 'title',
                message: 'Role title:',
                // validate: this.validString(input, name)
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Role salary:',
                // validate: this.validInt(input, name)
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Department ID:',
                // validate: this.validInt(input, name)
            }
        ]
    }

    addDepartments(){
        return [
            {
                type: 'input',
                name: 'name',
                message: 'Department name:',
                // validate: this.validString(input, name)
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
                // validate: this.validInt(input, name)
            },
// todo put the current value here
            {
                type: 'input',
                name: 'first_name',
                message: 'First Name:',
                // validate: this.validString(input, name)
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Last Name:',
                // validate: this.validString(input, name)
            },
            {
// todo show role list?
                type: 'input',
                name: 'role_id',
                message: 'Role ID:',
                // validate: this.validInt(input, name)
            },
            {
// todo show manager list?
                type: 'input',
                name: 'manager_id',
                message: 'Manager ID:',
                // validate: this.validInt(input, name)
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
                // validate: this.validString(input, name)
            },
            {
                type: 'input',
                name: 'title',
                message: 'Role title:',
                // validate: this.validString(input, name)
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Role salary:',
                // validate: this.validInt(input, name)
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Department ID:',
                // validate: this.validInt(input, name)
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
                // validate: this.validString(input, name)
            },
            {
                type: 'input',
                name: 'name',
                message: 'Department name:',
                // validate: this.validString(input, name)
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
                // validate: this.validInt(input, name)
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
                // validate: this.validString(input, name)
            }
        ]
    }

    deleteDepartments(){
        return [
// todo show list of currently used ids
            {
                type: 'input',
                name: 'id',
                message: 'Department ID:',
                // validate: this.validString(input, name)
            }
        ]
    }





    // validString(str, placeholder){
    // return str.lentgth > 0 ? true : `Must inlude ${placeholder}`;
    // if(str.length > 0){
    //     return true;
    // }
    // return `Must inlude ${placeholder}`;
    // }

    // validInt(int, placeholder){
    // return typeof int === "number" ? true : `Must inlude ${placeholder}`;
    // if(typeof int === "number"){
    //     return true;
    // }
    // return `Must inlude ${placeholder}`;
    // }
};

module.exports = Questions;
