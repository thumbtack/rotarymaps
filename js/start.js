var RotaryMaps = window.RotaryMaps = (function(raphael) {

var cg = {},
    map_counter = 0,
    data_id = 0,
    fudge = 0.0001;

cg.log = function() {
    if (window.console) {
        console.log(arguments);
    }
};

cg.callable = function(val) {
    return typeof val == "function";
};

cg.isObject = function(val) {
    return typeof val == "object";
};

cg.convert = function(min_in, max_in, min_out, max_out, val) {
    val = parseFloat(Math.min(max_in, Math.max(min_in, val)))
    return parseFloat(val - min_in) / parseFloat(max_in - min_in) * (max_out - min_out) + min_out;
};

cg.extend = function() {
    var rtn = {},
        i = 0,
        ii = arguments.length;

    for (; i < ii; i++) {
        cg.each(arguments[i], function(val, key) {
            if (val && cg.isObject(val) && !cg.callable(val)) {
                rtn[key] = cg.extend(rtn[key] && cg.isObject(rtn[key]) ? rtn[key] : {}, val);
            } else {
                rtn[key] = val;
            }
        });
    }
    return rtn;
};

cg.config = function(option, value) {
    if (option instanceof Object) {
        for (var key in option) {
            cg.config(key, option[key]);
        }
        return;
    }
    switch (option) {
        case "fudge":
            fudge = value;
            break;
        case "logging":
            if (!value) {
                // turn off logging
                cg.log = function() {};
            }
            break;
        case "raphael":
            // Use a custom Raphael (e.g. a globally scoped one instead of the local one)
            raphael = value;
            break;
        default:
            cg.log(option, "Not available");
    };
};

cg.uniqueDataId = function() {
    return data_id++;
};

cg.each = function(arr, callback) {
    for (var i in arr) {
        callback(arr[i], i);
    }
};

cg.inheritFrom = function(f) {
    function g() {}
    g.prototype = f.prototype || f;
    return new g();
};


// TODO - build AUTO or TEMPLATE methods to make construction of maps simpler

cg.autoController = function(dom_element, options) {
    var controller = new cg.Controller(options),
        map = new cg.SvgMap(dom_element);
    return controller.addMap(map);
};

cg.auto = {
    bubble: function(dom_element, data, options) {
        // etc etc
    }
};
