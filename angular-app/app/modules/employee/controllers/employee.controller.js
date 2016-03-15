angular.module('employee.controller',[])
      .controller('employeeCtrl',['$scope','$routeParams','$rootScope','$location','$timeout','employeeService', employeeCtrl])

function employeeCtrl($scope,$routeParams,$rootScope,$location,$timeout,employeeService) { 
	$scope.employees = {};
  $scope.employeeList= function(){
         employeeService.employeeList().then(
              function(response) {
                console.log(response.data);
                $scope.arr = $.map(response.data, function(el) { return el } );
                $scope.employees =normalizeObjtoArray($scope.arr);
                console.log($scope.employees);
              }, function(rejected){
                $scope.error=rejected;
              } 
         );

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

};
      $scope.isEdit= false;
     if($routeParams.username){
     	$rootScope.username = $routeParams.username;
     	$scope.isEdit= true;
     }

      $scope.addEmployee = function (){
           employeeService.addEmployee($scope.employee).then(
              function(response) {
                console.log(response);
                $location.path('/employee');

              }, function(rejected){
                $scope.error=rejected;
              } 
         );
    };

     $scope.editEmployeeRedirect = function(username){
      
        $location.path('/employee/employeeEdit/'+username);
      
    };
    $scope.employeeInfo = function(){
      if($routeParams.username){
        for($i=0;$i<$scope.employees.length;$i++){
          if($.inArray($scope.employees[$i].email_id==username)){
            $scope.employee=$scope.employees[$i];
            console.log($scope.employee);
          }
       }
      }
    }
    
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
  	$scope.deleteEmployee = function (username){

  		 employeeService.deleteEmployee(username).then(
	      function(response) {
	         $rootScope.employees = response;

	      	$location.path('/employee/'+ $rootScope.username);

	      }, function(rejected){
	        $scope.error=rejected;
	      } 
	 	);
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