cg.Controller = cg.Class.extend({
    init: function(map, datasource, layer, options) {
        this.options = cg.extend(OPTIONS.CONTROLLER, options);
        this.map = map;
        this.datasource = datasource;
        this.layer = layer;
        this.datasource.addController(this);
        this.layer.setMap(this.map).setController(this);
    },
    refresh: function() {
        // Total, naive refresh
        var layer = this.layer;
        cg.each(this.datasource.getDataItems(), function(data_item) {
            layer.addDataItem(data_item);
        });
        return this;
    }
});

