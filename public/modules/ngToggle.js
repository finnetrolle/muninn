/**
 * Created by syachin on 05.05.2015.
 */

var ngToggler = angular.module('ngToggle', [])
    .controller('AppCtrl',['$scope', function($scope){
        $scope.custom = true;
        $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true: false;
        };
    }]);