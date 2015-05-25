/**
 * Created by syachin on 06.05.2015.
 */

cheetahApp.directive("powerSourceInfoPanel", function () {
    return {
        restrict: 'AE',
        templateUrl: 'directives/powerSourceInfoPanel.html',
        scope: {
            ps: "=",
            attributes: "=",
            documents: "=",
            showPanel: "="
        }
    }
});

