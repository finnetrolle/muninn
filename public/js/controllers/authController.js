/**
 * Created by syachin on 15.05.2015.
 */

muninnApp.controller('authController',
    ['$scope', 'authService', '$rootScope',
        function ($scope, authService, $rootScope) {

            $rootScope.authenticated = false;
            $rootScope.user = null;
            $scope.username = null;
            $scope.password = null;

            $scope.login = function() {
                authService.login($scope.username, $scope.password)
                    .success(function(data){
                        console.log("login success");
                        console.log(data);
                    })
                    .error(function(data){
                        console.log("login failed");
                        console.log(data);
                    });
            };

            $scope.logout = function() {
                authService.logout()
                    .success(function(data){
                        $rootScope.user = null;
                        console.log("logout success");
                    })
                    .error(function(date){
                        console.log("logout failed");
                    });
            };

            $scope.checkAuth = function() {
                authService.check()
                    .success(function(data){
                        if (data == undefined || data == null) {
                            console.log("auth = false");
                            console.log(data);
                        } else {
                            console.log("auth = true");
                            console.log(data);
                            $rootScope.user = data.name;
                        }
                    })
                    .error(function(data){
                        console.log("auth = false");
                        console.log(data);
                    });
            }
            $scope.checkAuth();

        }]);