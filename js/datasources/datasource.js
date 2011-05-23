cg.Datasource = cg.Class.extend({
    init: function(raw_data) {
        this.data = raw_data && this.formatData(raw_data) || [];
        this.controllers = [];
        this.dirty = true;

        this.stats = {};
        this.analyze();
    },
    addController: function(controller) {
        this.controllers.push(controller);
    },
    load: function() {
        // Total refresh of the data
        cg.each(this.controllers, function(controller) {
            controller.refresh();
        });
    },
    push: function(raw_data_item) {
        this.data.push(this.formatDataItem(raw_data_item));
        cg.each(this.controllers, function(controller) {
            controller.updateOne(raw_data_item);
        });
        return this;
    },
    pushMany: function(raw_data_items) {
        var formatted = this.formatData(raw_data_items)
            i = 0
            ii = formatted.length;
        for (; i < ii; i++) {
            this.data.push(formatted[i]);
        }
        cg.each(this.controllers, function(controller) {
            controller.updateMany(formatted);
        });
        return this;
    },
    formatData: function(raw_data) {
        var results = [],
            that = this;

        cg.each(raw_data, function(raw_data_item) {
            that.formatDataItem(raw_data_item);
            results.push(raw_data_item);
        });

        return results;
    },
    formatDataItem: function(raw_data_item) {
        raw_data_item.__id = cg.uniqueDataId();
        raw_data_item.__store = this;
        raw_data_item.__relative_value = function() {
            cg.convert(that.min(), that.max(), 0, 1, data_item.val);
        };
    },
    getDataItems: function() {
        return this.data;
    },
    analyze: function(force) {
        if (this.dirty || force) {
            this.stats.max = this.reduce(function(item, current) {
                return (current === null || item.val > current) ? item.val : current;
            });

            this.stats.min = this.reduce(function(item, current) {
                return (current === null || item.val < current) ? item.val : current;
            });

            this.dirty = false;
        }
        return this;
    },
    reduce: function(callback) {
        var result = null, key;
        for (key in this.data) {
            result = callback(this.data[key], result);
        }
        return result;
    }
});
