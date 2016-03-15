var Employee = require('./controllers/employee');

// API Server Endpoints
exports.endpoints = [
    { method: 'POST', path: '/employee/add', config: Employee.add},
    { method: 'POST', path: '/login', config: Employee.login},
    { method: 'POST', path: '/employee/list', config: Employee.employeeList},
    { method: 'POST', path: '/employee/getDetail', config: Employee.getDetail},
    { method: 'POST', path: '/employee/update', config: Employee.updateEmployee},
    { method: 'POST', path: '/employee/delete', config: Employee.deleteEmployee}
];