/**
 * Created by syachin on 25.05.2015.
 */

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
