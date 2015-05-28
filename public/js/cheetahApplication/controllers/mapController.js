/**
 * Created by syachin on 25.05.2015.
 */

cheetahApp.controller('mapController',
        [   '$scope', 'leafletEvents',
            'leafletData', 'editableEventingService', '$rootScope',
            'universalFilterService', 'tilesService', 'markerAdapterService', 'restConnector',
            function ($scope, leafletEvents,
                      leafletData, editableEventingService, $rootScope,
                      filter, tilesService, markerAdapterService, restConnector) {

                restConnector.setCompanyId('a991709d-8bbc-409f-ba25-81e69647abd7'); // work
                //restConnector.setCompanyId('5c9a8644-6de0-4257-aa0e-55f063acd94d'); // home

                $scope.baloonHtml = 'views/powerSourceBaloon.html';

                $scope.messaging = {
                    attributesLoaded: false,
                    documentsLoaded: false
                };

                $scope.ui = {
                    showPowerSourcesList: false,
                    showStandalonePanel: false,
                    showAuthPanel: false,
                    searchInputString: '',
                    selectedPowerSourceId: 0,
                    centerMapOnSelectPowerSource: false,

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

                $scope.moveCenterTo = function(lat, lng) {
                    var initialCenter = {
                        lat: lat,
                        lng: lng,
                        zoom: $scope.initialCenter.zoom
                    };
                    $scope.initialCenter = initialCenter;
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
                        $scope.$emit('attributesLoaded');
                    });

                    restConnector.getDocuments(id).success(function(documents){
                        $scope.viewModel.selected.documents = documents;
                        $scope.$emit('documentsLoaded');
                    });

                    // center map
                    if ($scope.ui.centerMapOnSelectPowerSource) {
                        $scope.moveCenterTo($scope.viewModel.selected.powerSource.lat, $scope.viewModel.selected.powerSource.lng);
                    }
                };

                $scope.$on('attributesLoaded', function(event, args){
                    $scope.messaging.attributesLoaded = true;
                    if ($scope.messaging.documentsLoaded == true) {
                        $scope.$emit('powersourceloaded');
                    }
                });

                $scope.$on('documentsLoaded', function(event, args){
                    $scope.messaging.documentsLoaded = true;
                    if ($scope.messaging.attributesLoaded == true) {
                        $scope.$emit('powersourceloaded');
                    }
                });

                $scope.$on('powersourceloaded', function(event, args){
                    $rootScope.$emit('markerselected', $scope.viewModel.selected);
                    $scope.messaging.attributesLoaded = false;
                    $scope.messaging.documentsLoaded = false;
                });

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
                    var psId = args.model.id;
                    $scope.setActiveElement(psId);


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