/**
 * Created by syachin on 06.05.2015.
 */
cheetahApp.service('editableEventingService', ['$log', function ($log) {
    var editableEventingService = {

        events: [
            'editable:created',
            'editable:enable',
            'editable:disable',
            'editable:editing',
            'editable:drawing:start',
            'editable:drawing:end',
            'editable:drawing:cancel',
            'editable:drawing:commit',
            'editable:drawing:click',
            'editable:drawing:clicked',
            'editable:vertex:click',
            'editable:vertex:clicked',
            'editable:vertex:ctrlclick',
            'editable:vertex:shiftclick',
            'editable:vertex:altclick',
            'editable:vertex:rawclick',
            'editable:vertex:contextmenu',
            'editable:vertex:deleted',
            'editable:vertex:mousedown',
            'editable:vertex:drag',
            'editable:vertex:dragstart',
            'editable:vertex:dragend',
            'editable:middlemarker:mousedown',
            'editable:shape:new',
            'editable:shape:delete',
            'editable:shape:deleted'
        ],

        initEvents: function (map, $scope) {
            for (var i = 0; i < this.events.length; ++i) {
                var self = this;
                map.on(this.events[i], function (i) {
                    return function (e) {
                        $scope.$emit(self.events[i], e);
                    }
                }(i));
            }
        }
    };
    return editableEventingService;
}]);