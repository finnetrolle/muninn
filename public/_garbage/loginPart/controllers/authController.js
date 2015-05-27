/**
 * Created by syachin on 15.05.2015.
 */

muninnApp.controller('authController',
    ['$scope', 'authService', '$rootScope',
        function ($scope, authService, $rootScope) {

            // root auth variables
            $rootScope.authenticated = false;
            $rootScope.user = null;

            // input fields
            $scope.username = null;
            $scope.password = null;

            $scope.resetAuth = function() {
                $scope.username = '';
                $scope.password = '';
                $rootScope.authenticated = false;
                $rootScope.user = null;
            }

            $scope.login = function() {
                authService.login($scope.username, $scope.password)
                    .success(function(data){
                        $scope.checkAuth();
                    });
            };

            $scope.logout = function() {
                authService.logout()
                    .success(function(data){
                        $scope.checkAuth();
                    });
            };

            $scope.checkAuth = function() {
                authService.check()
                    .success(function(data){
                        if (data.name == null) { // failed by checkauth
                            $scope.resetAuth();
                        } else {
                            $rootScope.user = data.name;
                            $rootScope.authenticated = true;
                        }
                    })
                    .error(function(data){
                        $scope.resetAuth();
                    });
            }
            $scope.checkAuth();

        }]);