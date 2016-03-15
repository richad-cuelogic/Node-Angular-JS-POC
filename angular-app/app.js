 

angular
    .module('angularApp', [
    	'ngRoute',
        // 'ui.router',
        'login',
        'employee'

    ]).config(['$routeProvider', urlRouterProvider])
    

function urlRouterProvider($routeProvider) {

$routeProvider
 // route for the home page
            .when('/login', {
                templateUrl : 'app/modules/login/views/login.html',
                controller  : 'loginCtrl'
            })
            .when('/employee', {
                templateUrl : 'app/modules/employee/views/employeesList.html',
                controller  : 'employeeCtrl'
            })
            .when('/employee/addEmployee', {
                templateUrl: 'app/modules/employee/views/addEditEmployee.html',
                 controller: 'employeeCtrl'
              })
            .when('/employee/employeeEdit/:username', {
                templateUrl: 'app/modules/employee/views/addEditEmployee.html',
                 controller: 'employeeCtrl'
              });
    $routeProvider.otherwise('/login');
}

