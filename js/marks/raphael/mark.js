cg.marks.raphael = {};

cg.marks.raphael.Mark = cg.Mark.extend({
    init: function(map) {
        this._super(map);
    }
});

cg.marks.raphael.Circle = cg.marks.raphael.Mark.extend({
    init: function(map, x, y, radius) {
        this._super(map);
        this.node = this.map.paper.circle(x, y, radius);
    }
});
