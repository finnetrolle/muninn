/**
 * Created by syachin on 25.05.2015.
 */

/***
 * This service gets powerSources array and converts it into marker-friendly powersource map
 */

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
                polygon: powerSource.polygon
            };
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
