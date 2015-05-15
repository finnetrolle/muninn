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

            /**
             * Method
             */
            $scope.login = function() {
                authService.login($scope.username, $scope.password)
                    .success(function(data){
                        $scope.checkAuth();
                    });
                $scope.username = '';
                $scope.password = '';
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
                        if (data.name == null) {
                            console.log("auth = false by data.name==null");
                            $rootScope.user = null;
                            $rootScope.authenticated = false;
                        } else {
                            console.log("auth = true");
                            console.log(data);
                            $rootScope.user = data.name;
                            $rootScope.authenticated = true;
                        }
                    })
                    .error(function(data){
                        console.log("auth = false by error");
                        console.log(data);
                    });
            }
            $scope.checkAuth();

        }]);