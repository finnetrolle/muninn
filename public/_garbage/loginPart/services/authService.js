/**
 * Created by syachin on 15.05.2015.
 */

muninnApp.service('authService', ['$http', function($http){

    var authService = {

        login: function(username, password) {
            var payload = 'username=' + username + '&password=' + password;
            var config = {
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
            }
            return $http.post('login', payload, config);
        },

        logout: function() {
            return $http.post('logout');
        },

        check: function() {
            return $http.post('/checkauth');
        }

    };
    return authService;

}]);