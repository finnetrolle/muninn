/**
 * Created by syachin on 08.05.2015.
 */

cheetahApp.directive("toolboxLegendContainer", function () {
    return {
        restrict: 'AE',
        templateUrl: 'directives/toolboxLegendContainer.html',
        scope: {
            toolboxPressedButton: "@"
        }
    }
});