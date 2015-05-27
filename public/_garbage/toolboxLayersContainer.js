/**
 * Created by syachin on 08.05.2015.
 */

cheetahApp.directive("toolboxLayersContainer", function () {
    return {
        restrict: 'AE',
        templateUrl: 'directives/toolboxLayersContainer.html',
        scope: {
            toolboxPressedButton: "@",
            tilesArray: "=",
            setBasemap: "&",
            tiles: "="
        }
    }
});