/**
 * Created by syachin on 25.05.2015.
 */

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