/**
 * Created by syachin on 05.05.2015.
 */
cheetahApp.directive("powerSourceBaloon", function () {
    return {
        restrict: 'AE',
        templateUrl: 'directives/powerSourceBaloon.html',
        scope: {
            powerSource: "=",
            attributes: "=",
            documents: "="
        }
    }
});