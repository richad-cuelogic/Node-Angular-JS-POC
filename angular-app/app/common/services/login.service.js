angular.module('loginService', [])
    .service('loginService', [loginService]);

function loginService() {

   	var loginService = {};

    function login(loginCredentials) {
		return true;
		/*true;$http({
            method: "POST",
            url: "",
            dataType: 'json',
            data: loginCredentials
        });
        */
	}



    loginService.login= login;
   

    return loginService;
   

};


