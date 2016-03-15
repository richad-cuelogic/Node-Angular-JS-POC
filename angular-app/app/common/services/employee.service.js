angular.module('employee.service',[])
       .service('employeeService',['$q','$timeout','$rootScope','$location','$http', employeeService]);

function employeeService($q,$rootScope,$timeout,$location,$http) {
  var service = {};
   //  var employees = {};
   /* function employeeName(username) {
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

  }*/
  function getemployeeDetail(username) {
    return $http({
            method: "POST",
            url: "http://192.168.10.248:8081/employee/getDetail",
            dataType: 'json',
            data: { "email_id":username }
          });

  }
  
  function employeeList() {
    return $http({
            method: "POST",
            url: "http://192.168.10.248:8081/employee/list",
            dataType: 'json'
          });
  }
  function addEmployee(empdata) {
    return $http({
            method: "POST",
            url: "http://192.168.10.248:8081/employee/add",
            dataType: 'json',
            data: empdata
        });       
  }
   function deleteEmployee(username,id) {  
     return $http({
            method: "POST",
            url: "http://192.168.10.248:8081/employee/delete",
            dataType: 'json',
            data: { "email_id":username, "id":id }
        });    
  }

  function updateEmployee(empdata) { 
    console.log("update employee service");
    console.log(empdata);
     return $http({
            method: "POST",
            url: "http://192.168.10.248:8081/employee/update",
            dataType: 'json',
            data: empdata
        });    
  }
  function sortEmployees(sortVaL) { 
    console.log("update employee service");
    console.log(empdata);
     return $http({
            method: "POST",
            url: "http://192.168.10.248:8081/employee/sort",
            dataType: 'json',
            data: {sortVaL :sortVal}
        });    
  }
/*
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

  */

  //service.employeeName = employeeName;
  service.getemployeeDetail = getemployeeDetail;
  service.employeeList = employeeList;
  service.updateEmployee = updateEmployee;
  service.deleteEmployee = deleteEmployee;
  service.addEmployee = addEmployee;
  return service;

};