/**
 * Created by syachin on 06.05.2015.
 */

cheetahApp.service('modelService', ['powerSourceService', '$rootScope', function (powerSourceService, $rootScope) {
    var modelService = {
        popuppedMarkerId: 0,
        lastObject: {
            powerSource: null,
            attributes: null,
            documents: null
        },
        highlightingLayersGroup: null,
        polygonsGeoJson: null,
        polygonLayers: {},
        highlightedLayer: null,
        powerSources: [],


        init: function (data) {
            this.highlightingLayersGroup = L.layerGroup();//.addTo(this.map);

            this.buildPolygonLayers(data);

            this.highlightedLayer = null;

            return this.highlightingLayersGroup;
        },

        getPowerSource: function (id) {
            var self = this;
            var pss = powerSourceService.getPowerSource(id);
            pss.then(function (data) {
                    self.lastObject.powerSource = data.powerSource;
                    self.lastObject.attributes = data.attributes;
                    self.lastObject.documents = data.documents;
                    $rootScope.$emit('modelService:powerSource:updated', self.lastObject);
                    console.log("emitting for id = " + id);
            });
            return pss;
        },

        showHighlightedLayer: function (id) {
            this.hideHighlightedLayer();
            var strId = '' + id;
            var layer = this.polygonLayers[strId];
            if (layer != null) {
                this.highlightingLayersGroup.addLayer(layer);
                this.highlightedLayer = layer;
            }
        },

        hideHighlightedLayer: function () {
            if (this.highlightedLayer != null) {
                this.highlightingLayersGroup.removeLayer(this.highlightedLayer);
                this.highlightedLayer = null;
            }
        },

        buildPolygonLayers: function (data) {
            for (var key in data) {
                if (data[key].polygon != null) {
                    this.polygonLayers[key] = L.polygon(this.createLatLngArray(data[key].polygon), {});
                    this.powerSources.push(data[key]);
                }
            }
        },

        createLatLngArray: function (polygon) {
            var latLngs = [];
            var p = polygon.coordinates[0];
            for (var i = 0; i < p.length; ++i) {
                latLngs.push(L.latLng(p[i][1], p[i][0]));
            }
            return latLngs;
        }

    };
    return modelService;

}]);