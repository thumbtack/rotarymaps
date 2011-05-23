cg.GRADIENTS = {
    "spectral": ['#9e0142','#d53e4f','#f46d43','#fdae61','#fee08b','#ffffbf','#e6f598','#abdda4','#66c2a5','#3288bd','#5e4fa2'],
    "stoplight": ['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#ffffbf','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837'],
    "accent": ['#7fc97f','#beaed4','#fdc086','#ffff99','#386cb0','#f0027f','#bf5b17','#666666'],
    "sunrise": ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'],
    "floyd": ['#fff7fb','#ece7f2','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858'],
    "majesty": ['#f7fcfd','#e0ecf4','#bfd3e6','#9ebcda','#8c96c6','#8c6bb1','#88419d','#810f7c','#4d004b'],
    "stoic" : ['#67001f','#b2182b','#d6604d','#f4a582','#fddbc7','#ffffff','#e0e0e0','#bababa','#878787','#4d4d4d','#1a1a1a'],
    "meadow": ['#fff7fb','#ece2f0','#d0d1e6','#a6bddb','#67a9cf','#3690c0','#02818a','#016c59','#014636'],
    "mars": ['#7f3b08','#b35806','#e08214','#fdb863','#fee0b6','#f7f7f7','#d8daeb','#b2abd2','#8073ac','#542788','#2d004b'],
    "jupiter": ['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#bd0026','#800026'],
    "neptune": ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b'],
    "pluto": ['#f7f4f9','#e7e1ef','#d4b9da','#c994c7','#df65b0','#e7298a','#ce1256','#980043','#67001f'],
    "ink": ['#ffffff','#f0f0f0','#d9d9d9','#bdbdbd','#969696','#737373','#525252','#252525','#000000'],
    "reef": ['#f7fcf0','#e0f3db','#ccebc5','#a8ddb5','#7bccc4','#4eb3d3','#2b8cbe','#0868ac','#084081']
};

cg.COLOR_BLOCKS = {
    // Non-gradient colors schemes. Must be simple Arrays
    "oneset" : ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'],
    "twoset": ['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#ffffbf','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837'],
    "threeset": ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f'],
    "falcon": ['#1b9e77','#d95f02','#7570b3','#e7298a','#66a61e','#e6ab02','#a6761d','#666666'],
    "paired": ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99']
};

cg.colorScheme = function(name) {
    var gradient_min = null,
        gradient_max = null,
        scaled_gradient = {},
        num, pos;

    if (cg.GRADIENTS.hasOwnProperty(name)) {
        return cg.gradientColorScheme(name);
    } else if (cg.COLOR_BLOCKS.hasOwnProperty(name)) {
        return cg.blockColorScheme(name);
    } else {
        throw "Invalid color scheme";
    }
};

cg.gradientColorScheme = function(name) {
    var gradient = null,
        gradient_min = null,
        gradient_max = null,
        scaled_gradient = {},
        num, pos;

    if (cg.GRADIENTS.hasOwnProperty(name)) {
        gradient = cg.GRADIENTS[name];
    } else {
        throw "Invalid color scheme.";
    }

    for (num in gradient) {
        if (gradient_min === null || num < gradient_min) {
            gradient_min = num;
        }
        if (gradient_max === null || num > gradient_max) {
            gradient_max = num;
        }
    }

    for (num in gradient) {
        pos = cg.convert(gradient_min, gradient_max, 0, 1, num);
        scaled_gradient[pos] = gradient[num];
    }

    return function(val, lock_to_color) {
        // val should be from 0 to 1, and we'll return the color on the gradient
        // that matches
        var previous_step = null,
            pos = null;

        if (val - fudge < 0) {
            // return the first gradient element
            for (var key in scaled_gradient) {
                return scaled_gradient[key];
            }
        } else if (val + fudge > 1) {
            // return the last gradient element
            for (var key in scaled_gradient) {
                previous_step = scaled_gradient[key];
            }
            return previous_step;
        } else {
            // find something in the middle
            for (var key in scaled_gradient) {
                if (key == val) {
                    return val;
                }
                if (val > key) {
                    previous_step = key;
                    continue;
                } else {
                    pos = cg.convert(previous_step, key, 0, 1, val);
                    // TODO Now in theory we find the color in between the two colors
                    return previous_step;
                }
            }
            return previous_step;
        }
    };
};

cg.blockColorScheme = function(scheme_name) {
    // these color schemes aren't meant to be gradations
    var scheme = cg.COLOR_BLOCKS[scheme_name];

    return function(val) {
        var pos = parseInt(Math.floor(cg.scale(0, 1, 0, scheme.length + 1, val)));
        return scheme[Math.max(0, Math.min(pos, scheme.length))];
    };
};

