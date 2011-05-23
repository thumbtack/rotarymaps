cg.marks.gmap2 = {};

cg.marks.gmap2.Mark = cg.Mark.extend({
    init: function(map) {
        this._super(map);
        this.gmap_marker = null;
        initGMap2Marks();
    },
    getGMapMarker: function() {
        return this.gmap_marker;
    }
});

cg.marks.gmap2.Circle = cg.marks.gmap2.Mark.extend({
    init: function(map, lat, lng, radius) {
        this._super(map);
        this.gmap_marker = new GMap2Paper(lat, lng, radius * 2 + 2, radius * 2 + 2);
        this.node = this.gmap_marker.paper.circle(radius + 1, radius + 1, radius);
    }
});

var GMap2Paper = null;

// Separate out the initilization, parent classes wouldn't be available otherwise
function initGMap2Marks() {
    if (GMap2Paper !== null) {
        return;
    }

    GMap2Paper = function(lat, lng, width, height) {
        this.point = new GLatLng(lat, lng);
        this.width = width;
        this.height = height;
        this.div_ = document.createElement("div"),
        this.div_.style.position = "absolute";
        this.paper = raphael(this.div_, width, height);
    };

    GMap2Paper.prototype = cg.inheritFrom(GOverlay);

    GMap2Paper.prototype.initialize = function(map) {
        this.map_ = map;
        map.getPane(G_MAP_MARKER_PANE).appendChild(this.div_);
    };

    GMap2Paper.prototype.remove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    };

    GMap2Paper.prototype.copy = function() {
        return new GMap2Paper(this.point, width, height);
    };

    GMap2Paper.prototype.redraw = function(force) {
        var coord, height;
        if (force) {
            coord = this.map_.fromLatLngToDivPixel(this.point),
            height = parseInt(this.div_.clientHeight);
            this.div_.style.left = (coord.x - (this.width * .5)) + "px";
            this.div_.style.top = (coord.y + (this.height * .5) - height) + "px";
        }
    };

    GMap2Paper.prototype.setPoint = function(point) {
        this.point = point;
        this.redraw(true);
    };
}
