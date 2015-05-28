/**
 * Created by syachin on 06.05.2015.
 */
cheetahApp.controller('baloonController',
    ['$scope', '$rootScope',
        function ($scope, $rootScope) {

            $rootScope.$on('markerselected', function(event, selected){
                $scope.powerSource = selected.powerSource;
                $scope.attributes = selected.attributes;
                $scope.documents = selected.documents;
                console.log('message markerselected recieved');
                console.log($scope.powerSource);
                console.log($scope.attributes);
                console.log($scope.documents);
            });

        }]);
