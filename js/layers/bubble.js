cg.Bubble = cg.Layer.extend({
    init: function(options) {
        this._super(cg.extend(OPTIONS.BUBBLE, options));
        this.markers = {};
    },
    addDataItem: function(data_item) {
        var fadeout_after = 0,
            fadeout_duration = 0,
            fadeout_callback = null,
            style = cg.extend(this.options.circle),
            opacity = style.opacity,
            radius = cg.callable(this.options.radius) ?
                    this.options.radius(data_item) : this.options.radius,
            marker = this.map.circle(data_item.lat, data_item.lng, radius);

        style.opacity = this.options.fade_in ? 0 : style.opacity;

        marker.applyStyle(style);
        this.markers[data_item.__id] = marker;

        if (this.options.fade_in) {
            marker.node.animate({opacity: opacity}, this.options.fade_in);
        }

        // Is there a callback for when the marker was created
        if (this.options.marker && cg.callable(this.options.marker)) {
            this.options.marker(this, marker, data_item);
        }

        // Should we fade out the marker after it was created?
        if (this.options.fade_out) {
            if (this.options.fade_out instanceof Object) {
                fadeout_after = this.options.fade_out.after ? this.options.fade_out.after : 0;
                fadeout_duration = this.options.fade_out.duration ?
                        this.options.fade_out.duration : 0;
            } else {
                fadeout_duration = parseInt(this.options.fade_out);
            }

            fadeout_callback = function() {
                marker.node.animate({opacity: 0}, fadeout_duration, function() {
                    marker.remove();
                });
            };

            if (fadeout_after) {
                setTimeout(fadeout_callback, fadeout_after);
            } else if (fadeout_duration) {
                fadeout_callback();
            }
        }
        return this;
    },
    removeDataItem: function(id) {
        this._super(id);
        this.map.removeMarker(this.markers[id]);
        delete this.markers[id];
        return this;
    }
});
