var Joi = require('joi'),
    Boom = require('boom'),
    Employee = require('../models/employee');
    Config = require('../config/config');

var privateKey = Config.key.privateKey;

exports.login = {
    validate: {
        payload: {
            username: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        if(request.payload.username==Config.email.username && request.payload.password==Config.email.password){
                    reply(true);
            } else {
                reply(Boom.forbidden("Invalid Username/Password"));
            }
    
    }
};

exports.add = {
    validate: {
        payload: {
            id: Joi.string().required(),
            emp_name: Joi.string().required(),
            email_id:Joi.string().email().required(),
            date_of_joining: Joi.string().required(),
            date_of_birth: Joi.string().required(),
            total_experience: Joi.number().required()
        }
    },
    handler: function(request, reply) {
        request.payload.scope = "Employee";
        request.payload.date_of_joining = (new Date(request.payload.date_of_joining)).getTime();
        request.payload.date_of_birth = (new Date(request.payload.date_of_birth)).getTime();
        Employee.addEmployee(request.payload, function(err, employee) {
            if (!err) {

              reply("Employee added successfully!!");
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("Please provide another user email"));
                } else reply(Boom.forbidden(err)); // HTTP 403
            }
        });
    }
};

exports.updateEmployee = {
        validate: {
            payload: {
                id: Joi.string().required(),
                emp_name: Joi.string().required(),
                email_id:Joi.string().email().required(),
                date_of_joining: Joi.string().required(),
                date_of_birth: Joi.string().required(),
                total_experience: Joi.number().required(),
                employee_type: Joi.string().required()
            }
        },
        handler: function(request, reply) {   
                request.payload.date_of_joining = (new Date(request.payload.date_of_joining)).getTime();
                request.payload.date_of_birth = (new Date(request.payload.date_of_birth)).getTime();
                  Employee.updateEmployee(request.payload, function(err, employee){
                    if (err) {
                        console.error(err);
                        return reply(Boom.badImplementation(err));
                    }
                    return reply("Employee details updated successfully!!");

                });                      
        }
};


exports.employeeList = {
        handler: function(request, reply) {
            Employee.employeeList(function(err, employee) {
                 if (!err) {
                      return reply(employee);                  
                 }
                else{
                     return reply(Boom.badImplementation(err));
                }
            });
        }
};

exports.deleteEmployee = {
        validate: {
            payload: {
                id: Joi.string().required(),
                email_id: Joi.string().required()
            }
        },
        handler: function(request, reply) {        
                 Employee.deleteEmployee(request.payload, function(err, employee){
                    if (err) {
                        console.error(err);
                        return reply(Boom.badImplementation(err));
                    }
                    return reply("Employee deleted successfully!!");

                });                      
        }
};

exports.getDetail = {
        validate: {
            payload: {
                email_id: Joi.string().required()
            }
        },
        handler: function(request, reply) {  
                 Employee.getDetail(request.payload, function(err, employee){
                    if (err) {
                        console.error(err);
                        return reply(Boom.badImplementation(err));
                    }
                    return reply(employee);

                });                      
        }
};

exports.sortEmployees = {

        handler: function(request, reply) {
          console.log("api controler");
    console.log(request);  
                 Employee.sortEmployees(request, function(err, employee){
                    if (err) {
                        console.error(err);
                        return reply(Boom.badImplementation(err));
                    }
                    return reply(employee);

                });                      
        }
};

exports.filterEmployee = {
        handler: function(request, reply) {  
                 Employee.filterEmployee(request, function(err, employee){
                    if (err) {
                        console.error(err);
                        return reply(Boom.badImplementation(err));
                    }
                    return reply(employee);

                });                      
        }
};

exports.filterByRange = {
        handler: function(request, reply) {  
                 Employee.filterByRange(request, function(err, employee){
                    if (err) {
                        console.error(err);
                        return reply(Boom.badImplementation(err));
                    }
                    return reply(employee);

                });                      
        }
};