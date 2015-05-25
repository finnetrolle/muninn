/**
 * Created by syachin on 06.05.2015.
 */
cheetahApp.controller('baloonController',
    ['$scope', 'powerSourceService', 'modelService',
        function ($scope, powerSourceService, modelService) {

            var psid = modelService.popuppedMarkerId;

            var pss = modelService.getPowerSource(psid)
                .then(function(data){
                    $scope.powerSource = data.powerSource;
                    $scope.attributes = data.attributes;
                    $scope.documents = data.documents;
            });

        }]);
