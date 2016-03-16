angular.module('employee.service',[])
       .service('employeeService',['$rootScope','$location','$http', employeeService]);

function employeeService($rootScope,$location,$http) {
  var service = {};

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
     return $http({
            method: "POST",
            url: "http://192.168.10.248:8081/employee/update",
            dataType: 'json',
            data: empdata
        });    
  }
  function sortEmployees(sortVaL) { 
     return $http({
            method: "POST",
            url: "http://192.168.10.248:8081/employee/sort",
            dataType: 'json',
            data: {sortVaL :sortVaL}
        });    
  }
  function filterEmployees(filterBy, filterVal) { 
     return $http({
            method: "POST",
            url: "http://192.168.10.248:8081/employee/filter",
            dataType: 'json',
            data: {filterBy : filterBy, filterVal : filterVal}
        });    
  }
  function filterByRangeEmp(filterFrom, filterTo, filterBy) { 
     return $http({
            method: "POST",
            url: "http://192.168.10.248:8081/employee/filterrange",
            dataType: 'json',
            data: {filterFrom : filterFrom, filterTo : filterTo, filterBy : filterBy}
        });    
  }
  


  service.getemployeeDetail = getemployeeDetail;
  service.employeeList = employeeList;
  service.updateEmployee = updateEmployee;
  service.deleteEmployee = deleteEmployee;
  service.addEmployee = addEmployee;
  service.sortEmployees = sortEmployees;
  service.filterEmployees = filterEmployees;
  service.filterByRangeEmp = filterByRangeEmp;


  return service;

};