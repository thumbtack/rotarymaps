cg.GMap2 = cg.Map.extend({
    init: function(container) {
        var that = this;
        this._super(container);
        GEvent.addListener(container, "zoomend", function(old_level, new_level) {
            that.trigger("zoomEnd", old_level, new_level);
        });
        GEvent.addListener(container, "moveend", function() {
            that.trigger("moveEnd");
        });
        GEvent.addListener(container, "maptypechanged", function() {
            that.trigger("mapTypeChanged");
        });
    },
    colorize: function(color, opacity) {
        var rects = [];
        rects.push([
            new GLatLng(-85,0),
            new GLatLng(85,0),
            new GLatLng(85,90),
            new GLatLng(-85,90)]);
        rects.push([
            new GLatLng(-85,90),
            new GLatLng(85,90),
            new GLatLng(85,180),
            new GLatLng(-85,180)]);
        rects.push([
            new GLatLng(-85,180.000001),
            new GLatLng(85,180.000001),
            new GLatLng(85,270),
            new GLatLng(-85,270)]);
        rects.push([
            new GLatLng(-85,270),
            new GLatLng(85,270),
            new GLatLng(85,360),
            new GLatLng(-85,360)]);
        for (var i in rects) {
            this.container.addOverlay(new GPolygon(rects[i], null, 0, 0, color, opacity));
        }
    },
    addMarker: function(marker) {
        this.container.addOverlay(marker.getGMapMarker());
        return marker;
    },
    circle: function(lat, lng, radius, options) {
        return this.addMarker(new cg.marks.gmap2.Circle(this, lat, lng, radius));
    },
    removeMarker: function(marker) {
        marker.gmap_marker.remove();
        marker = null;
        return this;
    }
});

