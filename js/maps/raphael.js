cg.RaphaelMap = cg.Map.extend({
    init: function(container, options) {
        this._super(container, options);
        this.width = this.options.width;
        this.height = this.options.height;
        this.paper = raphael(container, this.width, this.height);
    },
    bind: function(event_type, callback) {
        if (!this.listeners[event_type]) {
            this.listeners[event_type] = [];
        }
        this.listeners[event_type].push(callback);
        return this;
    },
    handle: function(event_type) {
        var args = arguments.slice(1);
        if (this.listeners[event_type]) {
            for (var i in this.listeners[event_type]) {
                this.listeners[event_type][i](args);
            }
        }
        return this;
    },
    layer: function(layer_object) {
        var listeners = layer_object.listensOn();
        layer_object.setMap(this);
        for (var i in listeners) {
            this.bind(listeners[i], layer_object[listeners[i]]);
        }
        return this;
    },
    circle: function(lat, lng, radius, options) {
        return new cg.marks.raphael.Circle(this, this.lngToX(lng), this.latToY(lat), radius);
    },
    removeMarker: function(marker) {
        // assume marker is a valid Raphael SVG/VML object
        marker.remove();
        return this;
    },
    lngToX: function(lng) {
        return cg.convert(-180, 180, 0, this.width, lng);
    },
    latToY: function(lat) {
        return this.height - cg.convert(-90, 90, 0, this.height, lat);
    }
});


