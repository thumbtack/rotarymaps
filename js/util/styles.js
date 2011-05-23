cg.applySvgStyle = function(svg_object, options, override) {
    var bcolor = null,
        style = cg.extend(options, override || {});

    // Custom options
    if (style.emboss) {
        bcolor = raphael.rgb2hsb(style.fill);
        style.fill = "90-hsb(" + bcolor.h + "," + bcolor.s + "," +
                Math.max(0, bcolor.b - .20) + ")-" + style.fill;
    }

    svg_object.attr(style);
};

