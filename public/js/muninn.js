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
            controller: 'navigationController'
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
            $http.post('logout', {}).success(function() {
                $rootScope.authenticated = false;
                $location.path("/");
            }).error(function(data) {
                $rootScope.authenticated = false;
            });
        };

        // continue with https://spring.io/guides/tutorials/spring-security-and-angular-js/

    }]);