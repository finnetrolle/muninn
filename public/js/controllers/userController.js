/**
 * Created by syachin on 18.05.2015.
 */

muninnApp.controller('userController',
    ['$scope', 'userService',
        function ($scope, userService) {

            $scope.users = {};

            userService.getUsers().success(function(data){
                var users = {};
                console.log(data);
                for (var i = 0; i < data.length; ++i) {
                    users[data[i].email] = data[i];
                }
                $scope.users = users;
                console.log(users);
            });


        }]);
