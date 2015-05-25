/**
 * Created by syachin on 05.05.2015.
 */

cheetahApp.config(function ($routeProvider) {
    $routeProvider

        .when("/", {
            templateUrl: 'fragments/map.html',
            controller: 'mapController'
        })

});