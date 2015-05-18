/**
 * Created by syachin on 18.05.2015.
 */

muninnApp.service('userService', ['$http', function($http){

    var authService = {

        getUsers: function() {
            return $http.get('user');
        }

    };
    return authService;

}]);