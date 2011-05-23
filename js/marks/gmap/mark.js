cg.marks.gmap = {};

cg.marks.gmap.Mark = cg.Mark.extend({
    init: function(map) {
        this._super(map);
        this.gmap_marker = null;
        initGMapMarks();
    },
    getGMapMarker: function() {
        return this.gmap_marker;
    }
});

cg.marks.gmap.Circle = cg.marks.gmap.Mark.extend({
    init: function(map, lat, lng, radius) {
        this._super(map);
        this.gmap_marker = new GMapPaper(map.container, lat, lng, radius * 2 + 2, radius * 2 + 2);
        this.node = this.gmap_marker.paper.circle(radius + 1, radius + 1, radius);
    }
});

var GMapPaper = null;

// Separate out the initilization, parent classes wouldn't be available otherwise
function initGMapMarks() {
    if (GMapPaper !== null) {
        return;
    }

    GMapPaper = function(gmap, lat, lng, width, height) {
        this.bounds_ = null;
        this.map_ = null;
        this.div_ = null;
        this.image_ = null;

        this.point = new google.maps.LatLng(lat, lng);
        this.width = width;
        this.height = height;
        this.div_ = document.createElement("div"),
        this.div_.style.position = "absolute";
        this.paper = raphael(this.div_, width, height);

        this.setMap(gmap);
    };

    GMapPaper.prototype = new google.maps.OverlayView();

    GMapPaper.prototype.onAdd = function() {
        var panes = this.getPanes();
        panes.overlayLayer.appendChild(this.div_);
    };

    GMapPaper.prototype.onRemove = function() {
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    };

    GMapPaper.prototype.draw = function() {
        var coord, height, projection = this.getProjection();
        coord = projection.fromLatLngToDivPixel(this.point),
        height = parseInt(this.div_.clientHeight);
        this.div_.style.left = (coord.x - (this.width * .5)) + "px";
        this.div_.style.top = (coord.y + (this.height * .5) - height) + "px";
    };
}

