angular.module('login.service', [])
    .service('loginService', ['$http',loginService]);

function loginService($http) {

    var loginService = {};

    function login(loginCredentials) {
        console.log('service');
        console.log(loginCredentials);
        return $http({
            method: "POST",
            url: "http://idea-PC:8081/login",
            dataType: 'json',
            data: loginCredentials
        });
    }



    loginService.login= login;
   

    return loginService;
   

};


