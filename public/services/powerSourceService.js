/**
 * Created by syachin on 06.05.2015.
 */

cheetahApp.service('powerSourceService', ["$http", "iconService", function ($http, iconService) {

    var powerSourceService = {

        setCompanyId: function(companyId) {
            this.companyId = companyId;
        },

        getPowerSource: function (id) {
            //var promise = $http.get('http://trollsmedjan.ru:8080/burst/rest_read_attributes',
            //    {
            //        params: {psId: id}
            //    })
            //    .then(function (response) {
            //
            //        return response.data;
            //    });
            //return promise;
            var promise = $http.get('attribute/' + id,{})
                .then(function (response) {
                    return response.data;
                });
            return promise;
        },

        getPowerSourcesMarkers: function () {
            //var promise = $http.get('http://trollsmedjan.ru:8080/burst/rest_read_powersources')
            var promise = $http.get('/powersource/' + this.companyId)
                .then(function (response) {
                    var markers = {};
                    //var src = response.data.powerSources;
                    var src = response.data;
                    for (var i = 0; i < src.length; ++i) {
                        var marker = iconService.createMarker(src[i]);
                        markers['' + src[i].id] = marker;
                    }
                    return markers;
                });
            return promise;
        }
    };
    return powerSourceService;
}]);
