angular.module('employee.controller',[])
      .controller('employeeCtrl',['$scope','$routeParams','$rootScope','$location', '$route','$timeout','employeeService', employeeCtrl])

function employeeCtrl($scope,$routeParams,$rootScope,$location, $route, $timeout,employeeService) { 
	$scope.employees = {};
  $scope.employeeList= function(){
        employeeService.employeeList().then(
                function(response) {       
                  var objtoarr = $.map(response.data, function(el) { return el } );
                  $scope.employees = normalizeObjtoArray(objtoarr);
                }, function(rejected){
                  $scope.error=rejected;
              } 
        );
  };
  $scope.isEdit= false;
  if($routeParams.username){
     	$rootScope.username = $routeParams.username;
     	$scope.isEdit= true;
  }

  $scope.addEmployee = function (){
      $scope.employee.id= "Cue"+Math.floor(1000 + Math.random() * 9000);;
      employeeService.addEmployee($scope.employee).then(
          function(response) {
            $location.path('/employee');
        }, function(rejected){
                $scope.error=rejected;
          } 
      );
  };

  $scope.updateEmployee = function (){
      $scope.inProcess = true;
      employeeService.updateEmployee($scope.employee).then(
          function(response) {
                $location.path('/employee');
          }, 
          function(rejected){
                $scope.error=rejected;
          } 
         );
     };

  $scope.deleteEmployee = function (username,id){
      employeeService.deleteEmployee(username,id).then(
          function(response) {
             $route.reload();
          },
          function(rejected){
              $scope.error=rejected;
          } 
        );
  };

  $scope.editEmployeeRedirect = function(username){   
      $location.path('/employee/employeeEdit/'+username);     
  };

  $scope.getemployeeDetail = function(){
      if($routeParams.username){
              employeeService.getemployeeDetail($routeParams.username).then(
                function(response) {
                var objtoarr = $.map(response.data, function(el) { return el } );                
                var employeeArr = normalizeObjtoArray(objtoarr);
                var empObj = {};
                $scope.employee = angular.extend(empObj, employeeArr[0]);
                console.log($scope.employee);
                },
                 function(rejected){
                  $scope.error=rejected;
              } 
         );
      }
    }
     
  function normalizeObjtoArray(obj) {
      var finalArr = [];
        for(var i = 0; i < obj.length; i++) {        
          if(Object.keys(obj[i]).length <= 1) {
          } else {
            finalArr[i] = [];
          for(var inner_obj in obj[i]) {
                finalArr[i][inner_obj] = (obj[i][inner_obj]["N"])?obj[i][inner_obj]["N"]:obj[i][inner_obj]["S"];
            }
          }
      }
        return finalArr;
  }

  $scope.sortEmployees= function(sortBy){
        sortBy = document.getElementById('sortOption').value;
       if(sortBy != "") {
               employeeService.sortEmployees(sortBy).then(
                function(response) {          
                    var objtoarr = $.map(response.data, function(el) { return el } );
                    $scope.employees =normalizeObjtoArray(objtoarr);
                },
                 function(rejected){
                    $scope.error=rejected;
                } 
           );
        }
  };
  $scope.filterEmp = function() {
      var filterBy = document.getElementById('searchOption').value;
      var filterVal = document.getElementById('searchValue').value;
      if(filterVal == "") return;
            employeeService.filterEmployees(filterBy, filterVal).then(
                function(response) {          
                    var objtoarr = $.map(response.data, function(el) { return el } );
                    $scope.employees =normalizeObjtoArray(objtoarr);
                }, 
                function(rejected){
                  $scope.error=rejected;
                } 
            );
  }

  $scope.filterByRangeEmp = function() {
      var filterFrom = document.getElementById('fromDate').value;
      if(filterFrom == "") 
        {
          $scope.error="Please select From date";
          return ;
        }
      var filterTo = document.getElementById('toDate').value;
      if(filterTo == "") {
          $scope.error="Please select To date";
          return ;
        }
      var filterBy = document.getElementById('filterOption').value;
      if(filterBy == ""){
          $scope.error="Please select filter option ";
          return ;
        }
      employeeService.filterByRangeEmp(filterFrom, filterTo, filterBy).then(
                function(response) {          
                  var objtoarr = $.map(response.data, function(el) { return el } );
                  $scope.employees =normalizeObjtoArray(objtoarr);
                }, function(rejected){
                  $scope.error=rejected;
                } 
           );
  }

   
};