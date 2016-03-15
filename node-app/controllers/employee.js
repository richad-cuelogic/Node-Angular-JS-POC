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
            date_of_birth: Joi.string().required()
            //total_experience: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        request.payload.scope = "Employee";
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
                date_of_birth: Joi.string().required()
            }
        },
        handler: function(request, reply) {   
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
        console.log("get detail");   
        console.log(request);
                 Employee.getDetail(request.payload, function(err, employee){
                    if (err) {
                        console.error(err);
                        return reply(Boom.badImplementation(err));
                    }
                    return reply(employee);

                });                      
        }
};