/**
 * Created by finnetrolle on 25.05.2015.
 */

// version 0.1.0
// date: 25.05.2015

// =====================================
// cheetah.js
// =====================================
var cheetahApp = angular.module('cheetahApp', ['ngRoute', 'leaflet-directive']);

cheetahApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

        .when("/", {
            templateUrl: 'fragments/map.html',
            controller: 'mapController'
        })
}]);

// =====================================
// universalFilterService.js
// =====================================
cheetahApp.service('universalFilterService', [function () {

    var universalFilterService = {

        minimalFilterStringLength: 3,

        alwaysCreateNewMap: false,

        setAlwaysCreateNewMap: function(alwaysCreateNewMap) {
            this.alwaysCreateNewMap = alwaysCreateNewMap;
        },

        setMinimalFilterStringLength: function(minimalFilterStringLength) {
            this.minimalFilterStringLength = minimalFilterStringLength;
        },

        _returnOnEmptyFilterString: function(unfilteredMap) {
            if (this.alwaysCreateNewMap == true) {
                var result = {};
                for (key in unfilteredMap) {
                    result[key] = unfilteredMap[key];
                }
                return result;
            } else {
                return unfilteredMap;
            }
        },

        filter: function(unfilteredMap, filterString, fields) {
            if (filterString == null || filterString == undefined || filterString.length < this.minimalFilterStringLength) {
                return this._returnOnEmptyFilterString(unfilteredMap);
            }

            var regExp = new RegExp(filterString, "i");
            var result = {};

            for (key in unfilteredMap) {
                var value = unfilteredMap[key];
                if (fields.hasOwnProperty("length")) {
                    for (var i = 0; i < fields.length; ++i) {
                        if (regExp.test(value[fields[i]])) {
                            result[key] = value;
                            continue;
                        }
                    }
                } else {
                    if (regExp.test(value[fields])) {
                        result[key] = value;
                    }
                }
            }
            return result;
        },

        // @Deprecated
        createFilteredMap: function (unfilteredMap, fieldName, filterString) {
            var result = {};

            if (filterString == null || filterString == undefined || filterString.length < 3) {
                return unfilteredMap;
            } else {
                var regExp = new RegExp(filterString, "i");
                for (key in unfilteredMap) {
                    var value = unfilteredMap[key];
                    if (regExp.test(value[fieldName])) {
                        result[key] = value;
                    }
                }
            }
            return result;
        }

    };
    return universalFilterService;
}]);

// =====================================
// tilesService.js
// =====================================
cheetahApp.service('tilesService', [function () {

    var tilesService = {

        tilesArray: [
            {
                name: 'OpenStreetMap',
                url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                icon: "img/icon_tiles.png",
                options: {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
            }, {
                name: 'OpenCycleMap',
                url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                icon: "img/icon_tiles.png",
                options: {attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'}
            }, {
                name: 'Mapbox Outdoors',
                url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                icon: "img/icon_tiles.png",
                type: 'xyz',
                options: {
                    apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                    mapid: 'bufanuvols.lia3no0m'
                }
            }, {
                name: 'Mapbox Wheat Paste',
                url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                icon: "img/icon_tiles.png",
                type: 'xyz',
                options: {
                    apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                    mapid: 'bufanuvols.lia35jfp'
                }
            }]

    };
    return tilesService;
}]);

// =====================================
// markerAdapterService.js
// =====================================
cheetahApp.service('markerAdapterService', ["$http", function ($http) {

    var markerAdapterService = {

        _convertXYToLatLng: function(x, y) {
            return L.Projection.Mercator.unproject(L.point(x, y));
        },

        _generateIconName: function(power, load, status) {
            // Todo fix this to normal generator
            return "img/center_open_035.png";
        },

        _buildMarker: function(powerSource) {
            var latlng = this._convertXYToLatLng(powerSource.location.x, powerSource.location.y);
            var marker = {
                lng: latlng.lng,
                lat: latlng.lat,
                id: powerSource.id,
                name: powerSource.name,
                power: powerSource.power,
                load: powerSource.load,
                message: "<div ng-include src=\"'fragments/powerSourceBaloon.html'\"></div>",
                compileMessage: true,
                focus: false,
                active: false,
                icon: {
                    iconUrl: this._generateIconName(powerSource.power, powerSource.usedPower, powerSource.status),
                    iconSize: [34, 34],
                    iconAnchor: [17, 17],
                    popupAnchor: [0, -17],
                    shadowUrl: '',
                    shadowSize: [0, 0],
                    shadowAnchor: [0, 0]
                },
                polygon: powerSource.polygon
            };
            console.log(marker);
            return marker;
        },

        createMarkers: function(powerSourcesArray) {
            var result = {};

            for (var i = 0; i < powerSourcesArray.length; ++i) {
                var powerSource = powerSourcesArray[i];
                result[powerSource.id] = this._buildMarker(powerSource);
            }

            return result;
        }

    };
    return markerAdapterService;


}]);

// =====================================
// editableEventingService.js
// =====================================
cheetahApp.service('editableEventingService', ['$log', function ($log) {
    var editableEventingService = {

        events: [
            'editable:created',
            'editable:enable',
            'editable:disable',
            'editable:editing',
            'editable:drawing:start',
            'editable:drawing:end',
            'editable:drawing:cancel',
            'editable:drawing:commit',
            'editable:drawing:click',
            'editable:drawing:clicked',
            'editable:vertex:click',
            'editable:vertex:clicked',
            'editable:vertex:ctrlclick',
            'editable:vertex:shiftclick',
            'editable:vertex:altclick',
            'editable:vertex:rawclick',
            'editable:vertex:contextmenu',
            'editable:vertex:deleted',
            'editable:vertex:mousedown',
            'editable:vertex:drag',
            'editable:vertex:dragstart',
            'editable:vertex:dragend',
            'editable:middlemarker:mousedown',
            'editable:shape:new',
            'editable:shape:delete',
            'editable:shape:deleted'
        ],

        initEvents: function (map, $scope) {
            for (var i = 0; i < this.events.length; ++i) {
                var self = this;
                map.on(this.events[i], function (i) {
                    return function (e) {
                        $scope.$emit(self.events[i], e);
                    }
                }(i));
            }
        }
    };
    return editableEventingService;
}]);

// =====================================
// restConnector.js
// =====================================
cheetahApp.service('restConnector', ["$http", function ($http) {

    var restConnector = {

        location: "",

        companyId: '',

        setCompanyId: function(companyId) {
            this.companyId = companyId;
        },

        getPowerSources: function() {
            return $http.get(this.location + '/powersource/' + this.companyId);
        },

        getAttributes: function(powerSourceId) {
            return $http.get(this.location + '/attribute/' + powerSourceId);
        },

        getDocuments: function(powerSourceId) {
            return $http.get(this.location + '/document/' + powerSourceId);
        },

        postNewLocation: function(powerSourceId, locationPoint) {
            return $http.post(this.location + '/powersource/' + powerSourceId + '/movelocation', locationPoint);
        },

        postNewPolygon: function(powerSourceId, polygon) {
            return $http.post(this.location + '/powersource/' + powerSourceId + '/addpolygon', polygon);
        }

    }
    return restConnector;


}]);

// =====================================
// powerSourceInfoPanel.js
// =====================================
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

// =====================================
// mapController.js
// =====================================
cheetahApp.controller('mapController',
    [   '$scope', 'leafletEvents',
        'leafletData', 'editableEventingService', '$rootScope',
        'universalFilterService', 'tilesService', 'markerAdapterService', 'restConnector',
        function ($scope, leafletEvents,
                  leafletData, editableEventingService, $rootScope,
                  filter, tilesService, markerAdapterService, restConnector) {

            //restConnector.setCompanyId('a991709d-8bbc-409f-ba25-81e69647abd7'); // work
            restConnector.setCompanyId('5c9a8644-6de0-4257-aa0e-55f063acd94d'); // home

            $scope.ui = {
                showPowerSourcesList: false,
                showStandalonePanel: false,
                showAuthPanel: false,
                searchInputString: '',
                selectedPowerSourceId: 0,
                centerMapOnSelectPowerSource: true,

                toolbox: {
                    legendButtonSrc: 'img/icon_legend.png',
                    layersButtonSrc: 'img/icon_layers_active.png',
                    pressedButton: ''
                }
            };

            $scope.model = {
                powerSources: {}
            };

            $scope.viewModel = {
                selected: {
                    powerSource: null,
                    attributes: {},
                    documents: {}
                },
                powerSources: [],
                tilesArray: tilesService.tilesArray,
                tiles: null
            };

            /**
             *
             * @param filterString
             */
            $scope.filterPowerSourcesList = function () {
                if ($scope.ui.searchInputString.length == 0) {
                    $scope.viewModel.powerSources = filter.filter($scope.model.powerSources);
                } else {
                    $scope.viewModel.powerSources = filter.filter($scope.model.powerSources, $scope.ui.searchInputString, ["name"]);
                }
            };

            /**
             *
             */
            $scope.updatePowerSources = function () {
                restConnector.getPowerSources().success(function(powerSourcesArray){
                    $scope.model.powerSources = markerAdapterService.createMarkers(powerSourcesArray);
                    $scope.viewModel.powerSources = $scope.model.powerSources;
                    $scope.ui.searchInputString = '';
                });
            };

            /**
             *
             * @param name
             */
            $scope.setBasemap = function (name) {
                for (var i = 0; i < $scope.viewModel.tilesArray.length; ++i) {
                    var tile = $scope.viewModel.tilesArray[i];
                    if (tile.name === name) {
                        $scope.viewModel.tiles = tile;
                    }
                }
            };

            $scope.setActiveElement = function (id) {
                if ($scope.viewModel.selected.powerSource != null) {
                    $scope.viewModel.selected.powerSource = null;
                    $scope.viewModel.selected.attributes = [];
                    $scope.viewModel.selected.documents = [];
                    if ($scope.ui.selectedPowerSourceId == id) {
                        $scope.ui.selectedPowerSourceId = 0;
                        return;
                    }
                }

                $scope.ui.selectedPowerSourceId = id;
                $scope.viewModel.selected.powerSource = $scope.model.powerSources['' + id];
                restConnector.getAttributes(id).success(function(attributes){
                    $scope.viewModel.selected.attributes = attributes;
                });

                // center map
                if ($scope.ui.centerMapOnSelectPowerSource) {
                    $scope.initialCenter.lat = $scope.viewModel.selected.powerSource.lat;
                    $scope.initialCenter.lng = $scope.viewModel.selected.powerSource.lng;
                }
            };

            /**
             *
             * @param buttonName
             */
            $scope.pressToolboxButton = function (buttonName) {
                $scope.ui.toolbox.legendButtonSrc = 'img/icon_legend.png';
                $scope.ui.toolbox.layersButtonSrc = 'img/icon_layers_active.png';

                if ($scope.ui.toolbox.pressedButton === buttonName) {
                    $scope.ui.toolbox.pressedButton = '';
                    return;
                }

                $scope.ui.toolbox.pressedButton = buttonName;
                if (buttonName === 'legend') {
                    $scope.ui.toolbox.legendButtonSrc = 'img/icon_legend_pressed.png';
                }
                if (buttonName === 'layers') {
                    $scope.ui.toolbox.layersButtonSrc = 'img/icon_layers_pressed.png';
                }
            };

            $scope.zoomMap = function (direction) {
                if (direction > 0) {
                    $scope.map.zoomIn();
                }
                if (direction < 0) {
                    $scope.map.zoomOut();
                }
            };

            /**
             *
             */
            $scope.init = function () {
                $scope.updatePowerSources();
                $scope.setBasemap('OpenStreetMap');

                leafletData.getMap().then(function(map){
                    $scope.map = map;
                });



                $scope.events = {
                    markers: {enable: leafletEvents.getAvailableMarkerEvents()}
                };

                $scope.initialCenter = {
                    lat: 59.95,
                    lng: 30.3,
                    zoom: 10,
                    autoDiscover: true
                };

                $scope.defaults = {
                    zoomControl: false
                };
            };
            $scope.init();

// ================================================================================================================== //
// ======================== HELL  BEGINS  NEAR  HERE ================================================================ //
// ================================================================================================================== //


            //iconService.init($scope);

            //leafletData.getMap().then(function (map) {
            //    $scope.map = map;
            //
            //    editableEventingService.initEvents(map, $scope);
            //
            //    powerSourceService.getPowerSourcesMarkers().then(function (data) {
            //        $scope.markers = data;
            //
            //        var lGroup = modelService.init(data);
            //        lGroup.addTo($scope.map);
            //        $scope.powerSources = modelService.powerSources;
            //    });
            //});

            $scope.$on('leafletDirectiveMarker.popupopen', function (event, args) {
                //modelService.popuppedMarkerId = args.model.id;
                //modelService.getPowerSource(args.model.id);
            });

            $scope.$on('leafletDirectiveMarker.popupclose', function (event, args) {
                $scope.showAdditionalPowerSourceInfoPanel = false;
            });

            $scope.$on('leafletDirectiveMarker.mouseover', function (event, args) {
                //modelService.showHighlightedLayer(args.model.id);
            });

            $scope.$on('leafletDirectiveMarker.mouseout', function (event, args) {
                //modelService.hideHighlightedLayer();
            });

            $scope.$on('editable:drawing:start', function (event, args) {
                console.log('editable:drawing:start');
                console.log(args);
            });

            $scope.$on('editable:drawing:end', function (event, args) {
                console.log('editable:drawing:end');
                console.log(args);
            });

            $scope.startDrawPolygon = function () {
                $scope.map.editTools.startPolygon();
            };

            $scope.startDrawPoint = function () {
                $scope.map.editTools.startMarker();
            };



        }
    ])
;

// =====================================
// baloonController.js
// =====================================
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

