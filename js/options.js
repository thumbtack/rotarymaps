var OPTIONS = {};

// How to style a Raphael SVG circle
OPTIONS.CIRCLE = {
    // SVG attributes, see http://raphaeljs.com/reference.html#attr
    cursor: "pointer",
    fill: "#ff0000",
    opacity: 1,
    stroke: "#333",
    "stroke-width": 1,

    // Custom attributes
    emboss: true
};

OPTIONS.CLUSTER = {
    enable_dots: true,
    enable_grid: false,
    combine: function(a, b) { return a + b; },
    radius_from_value: function(val) { return val; },

    // colors for dots
    color: "#fc8d59",
    stroke: "#000",
    hover_color: "#ffffbf",
    active_color: "#ffffbf",
    opacity: 0.8,

    // grid
    grid_color: "#5e4fa2",
    grid_size: 24.0,

    // when user clicks on a grid cell
    onclick: function(grid_cell) {
        cg.log("onclick");
    }
};

OPTIONS.CHOROPLETH = {
    color_scheme: "spectral",
    reverse_colors: false
};

OPTIONS.BUBBLE = {
    radius: function(data_item) {
        return data_item && data_item.val ? data_item.val : 1;
    },
    // could be a callback function to return the color
    color_by: "value",
    // Number of seconds to fade in
    fade_in: null,
    // Fade the marker after it is created
    // - Integer: simple fade, starts immediately, duration is in ms
    // - Object: {after: N, duration: M} N, M are milliseconds
    fade_out: {
        after: null,
        duration: null
    },
    // When a marker is created, call this callback
    marker: null,
    circle: OPTIONS.CIRCLE
};

OPTIONS.CONTROLLER = {};

OPTIONS.REALTIME = {
    expected_delay: 60000
};

OPTIONS.TIMELINE = {
    something: true
};
