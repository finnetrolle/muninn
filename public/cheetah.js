/**
 * Created by syachin on 05.05.2015.
 */

var cheetahApp = angular.module('cheetahApp', ['ngRoute', 'leaflet-directive', 'ngScrollbar']);

var tilesDict = [
    {
        name: 'OpenStreetMap',
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        icon: "img/icon_tiles.png",
        options: {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    },
    {
        name: 'OpenCycleMap',
        url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        icon: "img/icon_tiles.png",
        options: {
            attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
        }
    },
    {
        name: 'Mapbox Outdoors',
        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        icon: "img/icon_tiles.png",
        type: 'xyz',
        options: {
            apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
            mapid: 'bufanuvols.lia3no0m'
        }
    },
    {
        name: 'Mapbox Wheat Paste',
        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        icon: "img/icon_tiles.png",
        type: 'xyz',
        options: {
            apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
            mapid: 'bufanuvols.lia35jfp'
        }
    }
];


var mapController = cheetahApp.controller('mapController',
        ['$scope', 'leafletEvents',
         'leafletData', 'editableEventingService', '$rootScope',
         'iconService', 'universalFilterService', 'tilesService', 'markerAdapterService', 'restConnector',
            function ($scope, leafletEvents,
                      leafletData, editableEventingService, $rootScope,
                      iconService, filter, tilesService, markerAdapterService, restConnector) {

                restConnector.setCompanyId('a991709d-8bbc-409f-ba25-81e69647abd7');

                $scope.ui = {
                    showPowerSourcesList: false,
                    showStandalonePanel: false,
                    showAuthPanel: false,
                    searchInputString: '',
                    selectedPowerSourceId: 0,

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
                    //powerSourceService.getPowerSourcesMarkers().then(function (data) {
                    //    $scope.model.powerSources = data;
                    //    $scope.viewModel.powerSources = filter.filter($scope.model.powerSources);
                    //});
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

                    //powerSourceService.getPowerSource(id).then(function (data) {
                    //    $scope.viewModel.selected.attributes = data;
                    //    //$scope.viewModel.selected.attributes = data.attributes;
                    //    //$scope.viewModel.selected.documents = data.documents;
                    //});

                    // center map
                    $scope.initialCenter.lat = $scope.viewModel.selected.powerSource.lat;
                    $scope.initialCenter.lng = $scope.viewModel.selected.powerSource.lng;
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
                }


                /**
                 *
                 */
                $scope.init = function () {
                    $scope.updatePowerSources();
                    $scope.setBasemap('OpenStreetMap');

                    iconService.init($scope);

                    $scope.events = {
                        markers: {enable: leafletEvents.getAvailableMarkerEvents()}
                    };

                    $scope.initialCenter = {
                        lat: 59.95,
                        lng: 30.3,
                        zoom: 10,
                        autoDiscover: true
                    };
                };
                $scope.init();

// ================================================================================================================== //
// ======================== HELL  BEGINS  NEAR  HERE ================================================================ //
// ================================================================================================================== //

                //$scope.toolboxLegendButtonSrc = 'img/icon_legend.png';
                //$scope.toolboxLayersButtonSrc = 'img/icon_layers_active.png';
                //$scope.toolboxPressedButton = '';
                //$scope.showPowerSourcesList = false;
                //$scope.showStandalonePanel = false;


                $scope.list = {};

                $scope.activeElement = "0";

                for (var i = 1; i < 100; ++i) {
                    $scope.list['' + i] = {
                        name: 'Element ' + i,
                        active: false,
                        id: '' + i,
                        attributes: [],
                        documents: [],
                        power: 11000,
                        load: 50
                    };
                }

                //$scope.setActiveElement = function (id) {
                //    // unset current
                //    if ($scope.activeElement != '0') {
                //        $scope.list[$scope.activeElement].active = false;
                //    }
                //    // unset and return if id was current
                //    if ($scope.activeElement == id) {
                //        $scope.activeElement = 0;
                //        return;
                //    }
                //    $scope.activeElement = '' + id;
                //    $scope.list[$scope.activeElement].active = true;
                //},

                //$scope.selectedPowerSource = null;
                //$scope.selectedAttributes = null;
                //$scope.selectedDocuments = null;
                //$scope.showAdditionalPowerSourceInfoPanel = false;
                //$scope.showAdditionalPanel = false;



                //$scope.tiles = tilesDict.openstreetmap;




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

                //$scope.goToPowerSource = function (id) {
                //    //for (var key in $scope.markers) {
                //    //    if ($scope.markers[key].focus == true)
                //    //        $scope.markers[key].focus = false;
                //    //}
                //
                //    if (modelService.popuppedMarkerId == id) {
                //        modelService.popuppedMarkerId = 0;
                //        $scope.selectedPowerSource = null;
                //        $scope.selectedAttributes = null;
                //        $scope.selectedDocuments = null;
                //        return;
                //    }
                //
                //
                //    modelService.popuppedMarkerId = id;
                //
                //
                //    var marker = $scope.markers['' + id];
                //    $scope.initialCenter.lat = marker.lat;
                //    $scope.initialCenter.lng = marker.lng;
                //
                //    modelService.getPowerSource(id);
                //    //$scope.autoDiscover = false;
                //    //marker.focus = true;
                //};

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

                //$rootScope.$on('modelService:powerSource:updated', function (evt) {
                //    $scope.showAdditionalPowerSourceInfoPanel = true;
                //    $scope.selectedPowerSource = modelService.lastObject.powerSource;
                //    $scope.selectedAttributes = modelService.lastObject.attributes;
                //    $scope.selectedDocuments = modelService.lastObject.documents;
                //    // todo: fix multi catching
                //    //console.log(new Date());
                //    //console.log($scope.selectedPowerSource);
                //});


                $scope.zoomMap = function (direction) {
                    if (direction > 0) {
                        $scope.map.zoomIn();
                    }
                    if (direction < 0) {
                        $scope.map.zoomOut();
                    }
                };

            }
        ])
    ;













