/**
 * Created by finnetrolle on 08.05.2015.
 */

cheetahApp.service('filterService', [function () {

    var filterService = {

        createFilteredPowerSourcesMap: function(powerSourcesMap, filterString) {
            var result = {};

            if (filterString == null || filterString == undefined) {
                for (key in powerSourcesMap) {
                    result[key] = powerSourcesMap[key];
                }
            } else {
                var regExp = new RegExp(filterString, "i");
                for (key in powerSourcesMap) {
                    if (regExp.test(powerSourcesMap[key].name)) {
                        result[key] = powerSourcesMap[key];
                    }
                }
            }

            return result;
        },

        createFilteredPowerSourcesArray: function(powerSourcesArray, filterString) {
            var result = [];

            if (filterString == null || filterString == undefined) {
                for (var i = 0; i < powerSourcesArray.length; ++i) {
                    result.push(powerSourcesMap[i]);
                }
            } else {
                var regExp = new RegExp(filterString, "i");
                for (var i = 0; i < powerSourcesArray.length; ++i) {
                    if (regExp.test(powerSourcesMap[i].name)) {
                        result.push(powerSourcesMap[key]);
                    }
                }
            }

            return result;
        }

    };
    return filterService;
}]);
