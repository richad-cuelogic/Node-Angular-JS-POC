var Employee = require('./controllers/employee');

// API Server Endpoints
exports.endpoints = [
    { method: 'POST', path: '/employee/add', config: Employee.add},
    { method: 'POST', path: '/login', config: Employee.login},
    { method: 'POST', path: '/employee/list', config: Employee.employeeList},
    { method: 'POST', path: '/employee/getDetail', config: Employee.getDetail},
    { method: 'POST', path: '/employee/update', config: Employee.updateEmployee},
    { method: 'POST', path: '/employee/sort', config: Employee.sortEmployee},
    { method: 'POST', path: '/employee/filter', config: Employee.filterEmployee},
    { method: 'POST', path: '/employee/filterrange', config: Employee.filterByRange},
    { method: 'POST', path: '/employee/delete', config: Employee.deleteEmployee}

];