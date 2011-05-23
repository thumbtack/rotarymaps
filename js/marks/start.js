cg.marks = {};

cg.Mark = cg.Class.extend({
    init: function(map, id) {
        // Rotary Map class
        this.map = map;
        // SVG node
        this.node = null;
    },
    remove: function() {
        this.map.removeMarker(this);
    },
    applyStyle: function(options, override) {
        cg.applySvgStyle(this.node, options, override);
    }
});

