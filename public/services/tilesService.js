/**
 * Created by finnetrolle on 08.05.2015.
 */

cheetahApp.service('tilesService', [function () {

    var tilesService = {

        tilesArray: [
            {
                name: 'OpenStreetMap',
                url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                icon: "img/icon_tiles.png",
                options: {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
            }, {
                name: 'OpenCycleMap',
                url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                icon: "img/icon_tiles.png",
                options: {attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'}
            }, {
                name: 'Mapbox Outdoors',
                url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                icon: "img/icon_tiles.png",
                type: 'xyz',
                options: {
                    apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                    mapid: 'bufanuvols.lia3no0m'
                }
            }, {
                name: 'Mapbox Wheat Paste',
                url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                icon: "img/icon_tiles.png",
                type: 'xyz',
                options: {
                    apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                    mapid: 'bufanuvols.lia35jfp'
                }
            }]

    };
    return tilesService;
}]);
