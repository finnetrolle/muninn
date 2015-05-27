/**
 * Created by syachin on 05.05.2015.
 */

var cheetahApp = angular.module('cheetahApp', ['ngRoute', 'leaflet-directive']);

cheetahApp.config(function ($routeProvider) {
    $routeProvider

        .when("/", {
            templateUrl: 'views/map.html',
            controller: 'mapController'
        })
});
















