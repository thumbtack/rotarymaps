cg.Map = cg.Class.extend({
    init: function(container, options) {
        this.id = cg.map_counter++;
        this.container = container;
        this.listeners = [];
        this.controllers = [];
        this.options = options;
    },
    attach: function() {
        var controller, datasource, layer;
        if (arguments[0] instanceof cg.Controller) {
            controller = arguments[0];
        } else {
            datasource = arguments[0];
            layer = arguments[1];
            controller = new cg.Controller(this, datasource, layer);
        }
        this.controllers.push(controller);
        return this;
    },
    bind: function(event_type, callback) {
        if (!this.listeners[event_type]) {
            this.listeners[event_type] = [];
        }
        this.listeners[event_type].push(callback);
        return this;
    },
    trigger: function(event_type) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (this.listeners[event_type]) {
            for (var i in this.listeners[event_type]) {
                var listener = this.listeners[event_type][i];
                listener.apply(listener, args);
            }
        }
        return this;
    },
    addMarker: function(options) { },
    removeMarker: function(marker) { },
    circle: function(options) { }
});

