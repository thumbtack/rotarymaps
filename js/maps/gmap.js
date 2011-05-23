cg.GMap = cg.Map.extend({
    init: function(container) {
        this._super(container);
    },
    addMarker: function(marker) {
        // no-op in this case
        return marker;
    },
    circle: function(lat, lng, radius, options) {
        return this.addMarker(new cg.marks.gmap.Circle(this, lat, lng, radius));
    },
    removeMarker: function(marker) {
        marker.gmap_marker.setMap(null);
        marker.gmap_marker = null;
        marker = null;
        return this;
    }
});

