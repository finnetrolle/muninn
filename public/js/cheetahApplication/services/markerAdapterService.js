/**
 * Created by syachin on 25.05.2015.
 */

/***
 * This service gets powerSources array and converts it into marker-friendly powersource map
 */

cheetahApp.service('markerAdapterService', ["$http", function ($http) {

    var markerAdapterService = {

        _convertXYToLatLng: function (x, y) {
            return L.Projection.Mercator.unproject(L.point(x, y));
        },

        _generateIconName: function (power, load, status) {
            // Todo fix this to normal generator
            return "img/center_open_035.png";
        },

        _buildMarker: function (powerSource) {
            var latlng = this._convertXYToLatLng(powerSource.location.x, powerSource.location.y);
            var marker = {
                lng: latlng.lng,
                lat: latlng.lat,
                id: powerSource.id,
                name: powerSource.name,
                power: powerSource.power,
                load: powerSource.load,
                message: "<div ng-include src=\"'views/powerSourceBaloon.html'\"></div>",
                //message: '<power-source-info-panel ' +
                //         'documents="viewModel.selected.documents" ' +
                //         'attributes="viewModel.selected.attributes" ' +
                //         'ps="viewModel.selected.powerSource" ' +
                //         'show-panel="true" ></power-source-info-panel>',
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
                polygon: this._createLeafletPolygon(powerSource.polygon)
            };
            return marker;
        },

        _createLeafletPolygon: function (restPolygon) {
            if (restPolygon == null) {
                return restPolygon;
            }
            var geojson = {
                data: this._createGeoJson(restPolygon),
                style: {
                    fillColor: "green",
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                }
            };

            return geojson;
        },

        createMarkers: function (powerSourcesArray) {
            var result = {};

            for (var i = 0; i < powerSourcesArray.length; ++i) {
                var powerSource = powerSourcesArray[i];
                result[powerSource.id] = this._buildMarker(powerSource);
            }

            return result;
        },

        createRestPolygon: function (leafletPolygon) {
            var polygonToSend = {};
            polygonToSend.points = [];
            for (var i = 0; i < leafletPolygon.length; ++i) {
                var point = {};
                point.x = leafletPolygon[i].lat;
                point.y = leafletPolygon[i].lng;
                polygonToSend.points.push(point);
            }
            return polygonToSend;
        },

        createRestPoint: function (leafletPoint) {
            var point = {};
            point.x = leafletPoint.lat;
            point.y = leafletPoint.lng;
            return point;
        },

        _createGeoJson: function (restPolygon) {
            var geojson =
            {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": []
                        }
                    }
                ]
            };
            var ring = [];
            geojson.features[0].geometry.coordinates.push(ring);

            for (var i = 0; i < restPolygon.points.length; ++i) {
                var point = [];
                point.push(restPolygon.points[i].y);
                point.push(restPolygon.points[i].x);
                ring.push(point);
            }
            var point = [];
            point.push(restPolygon.points[0].y);
            point.push(restPolygon.points[0].x);
            ring.push(point);
            return geojson;
        }

    };
    return markerAdapterService;


}]);
