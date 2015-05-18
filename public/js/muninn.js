/**
 * Created by syachin on 14.05.2015.
 */

var muninnApp = angular.module('muninn', ['ngRoute']);

muninnApp.config(function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'authController'
        })
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'userController'
        })
        .otherwise('/');

    $httpProvider.defaults.headers.common["X-requested-With"] = 'XMLHttpRequest';
});

muninnApp.controller('homeController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/resource').success(function (data) {
        $scope.greeting = data;
    });
}]);

muninnApp.controller('navigationController', ['$rootScope', '$scope', '$http', '$location',
    function ($rootScope, $scope, $http, $location) {

        var authenticate = function (credentials, callback) {

            var headers = credentials ? {
                authorization: "Basic "
                + btoa(credentials.username + ":" + credentials.password)
            } : {};

            $http.get('user', {headers: headers})
                .success(function (data) {
                    if (data.name) {
                        $rootScope.authenticated = true;
                    } else {
                        $rootScope.authenticated = false;
                    }
                    callback && callback();
                }).error(function () {
                    $rootScope.authenticated = false;
                    callback && callback();
                });
        }

        console.log($scope.credentials);
        authenticate();
        $scope.credentials = {};
        $scope.login = function () {
            authenticate($scope.credentials, function () {
                if ($rootScope.authenticated) {
                    $location.path("/");
                    $scope.error = false;
                } else {
                    $location.path("/login");
                    $scope.error = true;
                }
            });
        };

        $scope.logout = function() {
            //$http.post('logout', {}).success(function() {
            $http.post('logout', {}).success(function() {
                $rootScope.authenticated = false;
                $location.path("/");
            }).error(function(data) {
                alert(data);
                console.log(data);
                $rootScope.authenticated = false;
            });
        };

        $scope.login2 = function() {
            var payload = 'username=' + $scope.credentials.username + '&password=' + $scope.credentials.password;
            var config = {
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
            }
            $http.post('login', payload, config)
                .success(function(data){
                    console.log("Login success");
                    console.log(data);
                }).error(function(data){
                    console.log("Login failed");
                    console.log(data);
                });
            //
            //
            //var request = {
            //    method: 'POST',
            //    url: 'login',
            //    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            //    data: $.param({
            //        username: $scope.credentials.username,
            //        password: $scope.credentials.password
            //    })
            //};
            //
            ////$http.post('login', {username: $scope.credentials.username, password: $scope.credentials.password})
            //$http(request)
            //    .success(function(data){
            //        console.log("success");
            //        console.log(data);
            //    })
            //    .error(function(data){
            //        console.log("failed");
            //        console.log(data);
            //    });
        };

        $scope.logout2 = function() {
            $http.post('logout', {}).success(function(data){
                console.log("logout success");
                console.log(data);
            }).error(function(data){
                console.log("logout failed");
                console.log(data);
            });
        };



        // continue with https://spring.io/guides/tutorials/spring-security-and-angular-js/

    }]);