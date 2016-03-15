angular.module('employee.controller',[])
      .controller('employeeCtrl',['$scope','$routeParams','$rootScope','$location','$timeout','employeeService', employeeCtrl])

function employeeCtrl($scope,$routeParams,$rootScope,$location,$timeout,employeeService) { 
	$scope.employees = {};
  $scope.employeeList= function(){
         employeeService.employeeList().then(
              function(response) {          
                var objtoarr = $.map(response.data, function(el) { return el } );
                $scope.employees =normalizeObjtoArray(objtoarr);
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
     //var randomNum= Math.floor(1000 + Math.random() * 9000);
        $scope.employee.id= "Cue"+Math.floor(1000 + Math.random() * 9000);;
           employeeService.addEmployee($scope.employee).then(
              function(response) {
                console.log(response);
                $location.path('/employee');

              }, function(rejected){
                $scope.error=rejected;
              } 
         );
    };

    $scope.updateEmployee = function (){
      $scope.inProcess = true;
      console.log("update employee controller");
           employeeService.updateEmployee($scope.employee).then(
              function(response) {
                console.log(response);
                $location.path('/employee');
              }, function(rejected){
                $scope.error=rejected;
              } 
         );
     };

      $scope.deleteEmployee = function (username,id){
        console.log("controller delete employee");
         employeeService.deleteEmployee(username,id).then(
            function(response) {
                console.log(response);
             $route.reload();
            }, function(rejected){
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
                $scope.employee = employeeArr[0];
                                console.log($scope.employee);

              }, function(rejected){
                $scope.error=rejected;
              } 
         );
      }
    }
     function normalizeObjtoArray(obj) {
        var finalArr = [];
        for(var i = 0; i < obj.length; i++) {
            finalArr[i] = [];
            for(var inner_obj in obj[i]) {
                finalArr[i][inner_obj] = (obj[i][inner_obj]["N"])?obj[i][inner_obj]["N"]:obj[i][inner_obj]["S"];
            }
        }
        return finalArr;
  }
    $scope.sortEmployees= function(sortVal){

         employeeService.sortEmployees(sortVal).then(
              function(response) {          
                var objtoarr = $.map(response.data, function(el) { return el } );
                $scope.employees =normalizeObjtoArray(objtoarr);
              }, function(rejected){
                $scope.error=rejected;
              } 
         );
  };


    /*
      employeeService.employeeInfo($routeParams.username).then(
      	      function(response) {
      	         $scope.employee = response;
      	      }, function(rejected){
      	        $scope.error=rejected;
      	      } 
      	 );

     employeeService.employeeName($routeParams.username).then(
	      function(response) {
	         $scope.name = response;

	      }, function(rejected){
	        $scope.error=rejected;
	      } 
	 );
     */
  /*	 $scope.updateEmployeeInfo = function (){
      $scope.inProcess = true;
        	 employeeService.updateEmployeeInfo($scope.employee).then(
      	      function(response) {
      	        $scope.employees = response;
                /* $timeout(function(){
                  $scope.inProcess = false;
                  $location.path('/home/');
                 }, 
                 3000);*/
      	      	  
       /*        
      	      }, function(rejected){
      	        $scope.error=rejected;
      	      } 
      	 );
     // }
  	};
  	
  
  	 
  $scope.editEmployeeRedirect = function(username){
        $location.path('/employee/employeeEdit/'+username);
  };
  $scope.editEmployeeSelected = function(index){
      if($scope.isSelected[index]){        
        $scope.isSelected[index] = false;
      }else{
        $scope.isSelected[index] = true;
      }
  };
  */
/*
  $scope.clearLocalStorage = function() {
            apiLocalStorageService.clearAll();
             $location.path('/login');
             apiLocalStorageService.get('tokenid');
  }
*/
  /*multiple employee selection for delete start*/
  /* $scope.gridOptions = { 
        data: 'employees',
        showGroupPanel: true,
        jqueryUIDraggable: true
    };
     $scope.multipleDeletion = function(){
        var newEmployeeList=[];
        angular.forEach($scope.employees,function(val){
        if(!val.isDelete){
            newEmployeeList.push(val);
        }
    });    $scope.employees=newEmployeeList;
    };
*/
  /*multiple employee selection for delete end*/
/*
  	$scope.predicate = "name";
    $scope.reverse = true;
    $scope.order = function() {
    	$scope.predicate = $scope.sortOption;
        $scope.reverse = ($scope.predicate === $scope.sortOption) ? !$scope.reverse : false;    
    };
*/
};