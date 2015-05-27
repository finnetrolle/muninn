/**
 * Created by syachin on 06.05.2015.
 */

cheetahApp.directive("powerSourcesList", function () {
    return {
        restrict: 'AE',
        templateUrl: 'directives/powerSourcesList.html',
        scope: {
            powerSources: "=",
            method: "&",
            selectedPowerSource: "=",
            selectedDocuments: '=',
            selectedAttributes: '='
        }
    }
});