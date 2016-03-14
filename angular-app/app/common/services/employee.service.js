angular.module('employee.service',[])
       .service('employeeService',['$q','$timeout','$rootScope','$location','$http', employeeService]);

function employeeService($q,$rootScope,$timeout,$location,$http) {
  var service = {};
     var employees = {};
    function employeeName(username) {
      return $q(function(resolve, reject) {
        for(var i=0;i<employees.length;i++)
        { 
           if(employees[i]["username"]==username){
                resolve(employees[i]["name"]);
                break;
            } else {
              reject('Not registered');
            }
        }
      });

  }
  function employeeInfo(username) {
      return $q(function(resolve, reject) {
        for(var i=0;i<employees.length;i++)
        { 
           if(employees[i]["username"]==username){
                resolve(employees[i]);
                break;
            } 
        }
      });

  }
  function employeeList() {
    /*return $q(function(resolve, reject) {
      if(typeof employees == 'object'){
          resolve(employees);
      } else {
        reject('No Employees');
      }   
    });
    */
    return $http({
            method: "POST",
            url: "http://192.168.10.248:8081/employee/list",
            dataType: 'json',
            data: {email_id:'richa.dagar@cuelogic.co.in'}
        });
  }

  function updateEmployeeInfo(objParams) {
    employees.push(objParams);
    return $q(function(resolve, reject) {   
      if(typeof employees == 'object'){
          resolve(employees);
      } else {
        reject('Cannot update');
      }   
    });

  }
   function deleteEmployee(username) {  
     for(var i=0;i<employees.length;i++)
        { 
           if(employees[i]["username"]==username){
                 delete $rootScope.employees[i];
                $location.path('/employee/list');
                break;
            } 
        }  
        return $rootScope.employees;    
  }

  function addEmployee(objParams) {
    employees.push(objParams);
    return $q(function(resolve, reject) {   
      if(typeof employees == 'object'){
          resolve(employees);
      } else {
        reject('Cannot add');
      }   
    });

  }

  service.employeeName = employeeName;
  service.employeeInfo = employeeInfo;
  service.employeeList = employeeList;
  service.updateEmployeeInfo = updateEmployeeInfo;
  service.deleteEmployee = deleteEmployee;
  service.addEmployee = addEmployee;
  return service;

};