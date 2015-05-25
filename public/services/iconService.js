/**
 * Created by syachin on 06.05.2015.
 */

var psMessage = '<power-source-info-panel documents="selectedDocuments"' +
'attributes="selectedAttributes" ps="selectedPowerSource"' +
'show-panel="showAdditionalPowerSourceInfoPanel && showAdditionalPanel">' +
'</power-source-info-panel>';

cheetahApp.service('iconService', [function () {
    var iconService = {

        scope: null,

        init: function(scope) {
            this.scope = scope;
        },

        generateIconName: function (power, load, status) {
            /**
             * status = 0 - usual power source
             * status = 1 - reconstruction
             * status = 2 - building
             */

            var filename = 'img/center_';

            if (status == 2) {
                filename += '_build';
            } else {
                if (load < 75) {
                    filename += 'open';
                } else if (load < 105) {
                    filename += 'limited';
                } else {
                    filename += 'closed';
                }

                if (status == 1) {
                    filename += '-rec';
                }
            }

            if (power == 11000) {
                filename += '_035';
            } else if (power == 35000) { // todo change to actual
                filename += '_035';
            } else if (power == 75000) {
                filename += '_035';
            }

            filename += '.png';

            return filename;
        },

        getRandomArbitary: function(min, max)
        {
            return Math.random() * (max - min) + min;
        },


        createMarker: function (data) {
            // =================================================
            // =     This section needed only for testing      =
            // =     Todo: remove this shit away after rdy     =
            // =================================================
            var lng = this.getRandomArbitary(29.0, 31.0);
            var lat = this.getRandomArbitary(59.0, 61.0);
            if (data.location != null) {
                lng= data.location.coordinates[0];
                lat= data.location.coordinates[1];
            };
            // =================================================

            var marker = {
                lng: lng,
                lat: lat,
                id: data.id,
                name: data.name,
                power: data.power,
                load: data.load,
                iconUrl: this.generateIconName(data.power, data.load, 0),
                message: "<div ng-include src=\"'fragments/powerSourceBaloon.html'\"></div>",
                compileMessage: true,
                focus: false,
                active: false,
                icon: this.createIcon(data.power, data.load, 0),
                polygon: data.polygon
            };
            console.log(psMessage);
            return marker;
        },

        createIcon: function (power, load, status) {
            return {
                iconUrl: this.generateIconName(power, load, status),
                iconSize: [34, 34],
                iconAnchor: [17, 17],
                popupAnchor: [0, -17],
                shadowUrl: '',
                shadowSize: [0, 0],
                shadowAnchor: [0, 0]
            };
        }

        //createSelectedIcon: function(icon) {
        //    return {
        //        iconUrl: icon.iconUrl,
        //        iconSize: icon.iconSize,
        //        iconAnchor: icon.iconAnchor,
        //        popupAnchor: icon.popupAnchor,
        //        shadowUrl: 'img/selected_shadow.png',
        //        shadowSize: [36, 36],
        //        shadowAnchor: [18, 20]
        //    };
        //},
        //
        //createUsualIcon: function(icon) {
        //    return {
        //        iconUrl: icon.iconUrl,
        //        iconSize: icon.iconSize,
        //        iconAnchor: icon.iconAnchor,
        //        popupAnchor: icon.popupAnchor,
        //        shadowUrl: '',
        //        shadowSize: [0, 0],
        //        shadowAnchor: [0, 0]
        //    };
        //}

    };
    return iconService;
}]);


