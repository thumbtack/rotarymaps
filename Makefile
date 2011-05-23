# RotaryMaps Makefile
#
# Requires YUI compressor and RaphaelJS

VERSION = $(shell head -n 1 VERSION)

JS_RM_FILES = \
	js/raphael_1.5.2.js \
	js/start.js \
	js/inheritance.js \
	js/options.js \
	js/util/colors.js \
	js/util/styles.js \
	js/util/gmap_styles.js \
	js/controllers/controller.js \
	js/controllers/realtime.js \
	js/datasources/datasource.js \
	js/maps/map.js \
	js/maps/canvas.js \
	js/maps/raphael.js \
	js/maps/gmap.js \
	js/maps/gmap2.js \
	js/marks/start.js \
	js/marks/raphael/mark.js \
	js/marks/gmap/mark.js \
	js/marks/gmap2/mark.js \
	js/layers/layer.js \
	js/layers/bubble.js \
	js/end.js

JS_FILES = \
	js/license.js \
	$(JS_RM_FILES)

all: build/rotarymaps.js

min: build/rotarymaps_min.js

release: release/rotarymaps_min.$(VERSION).js

build/rotarymaps.js: $(JS_FILES) Makefile
	mkdir -p build
	cat $(JS_FILES) > $@

build/rotarymaps_min.js: build/rotarymaps.js
	rm -f $@
	cat js/license.js >> $@
	cat build/rotarymaps.js | java -jar yuicompressor-2.4.2.jar --charset UTF-8 --type js >> $@

release/rotarymaps_min.$(VERSION).js: build/rotarymaps_min.js
	mkdir -p release
	cp build/rotarymaps_min.js $@

clean:
	rm -rf build/*

