cg.Layer = cg.Class.extend({
    init: function(options) {
        this.options = options;
        this.map = null;
        this.controller = null;
        this.listeners = ["moveEnd", "zoomEnd"];
    },
    getListeners: function() {
        return this.listeners;
    },
    setController: function(controller) {
        this.controller = controller;
    },
    setMap: function(map) {
        var that = this;
        this.map = map;
        cg.each(this.listeners, function(listener) {
            map.bind(listener, that[listener]);
        });
        return this;
    },
    addDataItem: function(data_item) { },
    removeDataItem: function(id) { },
    moveEnd: function() { },
    zoomEnd: function(old_zoom, new_zoom) { }
});

