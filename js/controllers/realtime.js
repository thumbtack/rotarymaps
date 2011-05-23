cg.Realtime = cg.Controller.extend({
    init: function(map, datasource, layer, options) {
        this._super(map, datasource, layer, cg.extend(OPTIONS.REALTIME, options));
        setInterval(this.deleteExpired, 5000);
    },
    updateOne: function(new_data_item) {
        var that = this,
            time = this.convertTimeIntoFutureMs(new_data_item.timestamp);
        window.setTimeout(function() {
            that.layer.addDataItem(new_data_item);
        }, time);
        return this;
    },
    updateMany: function(new_data_items) {
        var that = this;
        cg.each(new_data_items, function(new_data_item) {
            that.updateOne(new_data_item);
        });
        return this;
    },
    convertTimeIntoFutureMs: function(desired_time) {
        var now = new Date().getTime();
        return Math.max(0, (desired_time + this.options.expected_delay) - now);
    },
    deleteExpired: function() {
        // TODO
    }
});

