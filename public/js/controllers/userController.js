/**
 * Created by syachin on 18.05.2015.
 */

muninnApp.controller('userController',
    ['$scope', 'userService',
        function ($scope, userService) {

            $scope.users = {};
            $scope.usersViewModel = {};

            $scope.createUsersViewModel = function(users, filterMethod) {
                var usersViewModel = {};
                for (key in users) {
                    if (filterMethod(users[key])) {
                        usersViewModel[key] = users[key];
                    }
                }
                return usersViewModel;
            };

            $scope.doFilterUsers = function (str) {
                $scope.usersViewModel = $scope.createUsersViewModel($scope.users, function(user) {
                    if (str == null || str == undefined || str == '') {
                        return true;
                    }
                    var regExp = new RegExp(str, "i");
                    if (regExp.test(user.email) || regExp.test(user.name)) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }

            userService.getUsers().success(function(data){
                var users = {};
                console.log(data);
                for (var i = 0; i < data.length; ++i) {
                    users[data[i].email] = data[i];
                }
                $scope.users = users;
                console.log(users);
                $scope.doFilterUsers(null);
            });




        }]);
