/*
 * Basic vector shape
 */

Shape = function( point, radius, options ) {
	if( !point ) { return; }
	this.point = point;
	this.pixelOffset = new GSize(-1*radius,radius);
	this.radius = radius;
	this.overlap = false;
	this.hidden = false;

	var defaults = {
		"shape": "circle", // or "square"
		"color": "#fc8d59",
		"stroke": "#000",
		"colorHover": "#ffffbf",
		"colorActive": "#ffffbf",
		"opacity":0.8,

		/* location in google map pane hierarchy */
		"isBackground": false, // set to "true" to have this be unclickable in the background
		"zIndexProcess": null,

		/* interaction */
		"animate": false,
		"onclick": null,
		"onmouseover": null,
		"onmouseout": null,
		"infoWindow": null
	};
	this.opts = cg.parseOptions( defaults, options ); 
	if( this.opts.opacity < 1 ) { 
		this.opts.opacity *= 100.0;
	}

	this.percentOpacity = this.opts.opacity;
}; 

Shape.prototype = cg.extend( GOverlay );

Shape.prototype.makeNode = function() { 
	// default is circle
	var div = document.createElement("div"),
	radius = ( this.opts.animate ) ? this.radius * .5 : this.radius - 1,
	color = this.opts.color,
	bcolor = Raphael.rgb2hsb( color );
	div.style.position = "absolute";
	this.paper = Raphael( div, this.radius*2, this.radius*2 );
	var c = this.paper.circle( this.radius, this.radius, radius ).attr({ 
		gradient:"90-hsb(" + bcolor.h + "," + bcolor.s + "," + Math.max(0,bcolor.b-.20) + ")-" + color, stroke:this.opts.stroke 
	});
	this.div_ = div;
	if( this.opts.animate ) { 
		c.animate({r:this.radius - 1 }, 2000, ">");
	}
	return c;
};

Shape.prototype.initialize = function(map) {
	var that = this;
	var c = this.makeNode();
	this.maintainOver = false;

	if( this.opts.isBackground ) {  
		map.getPane( G_MAP_FLOAT_SHADOW_PANE ).appendChild( this.div_ );
	} else { 
		if( cg.callable( that.opts.onclick ) || that.opts.infoWindow ) { 
			c.node.style.cursor = "pointer";
		}

		try { 
			c.node.onclick = function() { 
				if( that.opts.infoWindow ) { 
					var info = map.openInfoWindow( that.point, that.opts.infoWindow, 
						{ onCloseFn: function() { 
							that.maintainOver = false;
							var color = that.opts.color,
							bcolor = Raphael.rgb2hsb( color );
							c.attr({ gradient:"90-hsb(" + bcolor.h + "," + bcolor.s + "," + Math.max(0,bcolor.b-.20) + ")-" + color });
						}});
					if( !that.maintainOver ) { 
						var color = that.opts.colorHover,
						bcolor = Raphael.rgb2hsb( color );
						c.attr({ gradient:"90-hsb(" + bcolor.h + "," + bcolor.s + "," + Math.max(0,bcolor.b-.20) + ")-" + color });
					}
					that.maintainOver = !that.maintainOver;
				}
				if( cg.callable( that.opts.onclick ) ) { that.opts.onclick(); } 
			};
			c.node.onmouseover = function() { 
				var color = that.opts.colorHover,
				bcolor = Raphael.rgb2hsb( color );
				c.attr({ gradient:"90-hsb(" + bcolor.h + "," + bcolor.s + "," + Math.max(0,bcolor.b-.20) + ")-" + color });
				if( cg.callable( that.opts.onmouseover ) ) { that.opts.onmouseover(); }
			};
			c.node.onmouseout = function() { 
				if(!that.maintainOver) { 
					var color = that.opts.color,
					bcolor = Raphael.rgb2hsb( color );
					c.attr({ gradient:"90-hsb(" + bcolor.h + "," + bcolor.s + "," + Math.max(0,bcolor.b-.20) + ")-" + color });
				}
				if( cg.callable( that.opts.onmouseout ) ) { that.opts.onmouseout(); }
			};
		} catch(e) { }
		
		map.getPane( G_MAP_MARKER_PANE ).appendChild( this.div_ );
	}

	this.map_ = map;

	if (this.percentOpacity) {        
		if(typeof(this.div_.style.filter)=='string'){this.div_.style.filter='alpha(opacity:'+this.percentOpacity+')';}
		if(typeof(this.div_.style.KHTMLOpacity)=='string'){this.div_.style.KHTMLOpacity=this.percentOpacity/100;}
		if(typeof(this.div_.style.MozOpacity)=='string'){this.div_.style.MozOpacity=this.percentOpacity/100;}
		if(typeof(this.div_.style.opacity)=='string'){this.div_.style.opacity=this.percentOpacity/100;}
	}
	if( this.opts.zIndexProcess ) { 
		try { 
			this.div_.style.zIndex = this.opts.zIndexProcess();
		} catch(e) { 
			// TODO fix this in IE; non-essential for basic rendering
		}
	}
	if( this.hidden ) {
		this.hide();
	}
};

Shape.prototype.remove = function() {
	this.div_.parentNode.removeChild(this.div_);
};

Shape.prototype.copy = function() {
	return new Shape(this.point, this.pixelOffset, this.percentOpacity, this.overlap);
};

Shape.prototype.redraw = function(force) {
	var p = this.map_.fromLatLngToDivPixel(this.point);
	var h = parseInt(this.div_.clientHeight);
	this.div_.style.left = (p.x + this.pixelOffset.width) + "px";
	this.div_.style.top = (p.y +this.pixelOffset.height - h) + "px";
};

Shape.prototype.show = function() {
	if (this.div_) {
		this.div_.style.display="";
		this.redraw();
	}
	this.hidden = false;
};
      
Shape.prototype.hide = function() {
	if (this.div_) {
		this.div_.style.display="none";
	}
	this.hidden = true;
};

Shape.prototype.isHidden = function() {
	return this.hidden;
};

Shape.prototype.supportsHide = function() {
	return true;
};

Shape.prototype.setContents = function(html) {
	this.html = html;
	this.div_.innerHTML = '<div class="' + this.classname + '">' + this.html + '</div>' ;
	this.redraw(true);
};

Shape.prototype.setPoint = function(point) {
	this.point = point;
	if( this.overlap ) {
		var z = GOverlay.getZIndex( this.point.lat() );
		this.div_.style.zIndex = z;
	}
	this.redraw( true );
};

Shape.prototype.setOpacity = function( percentOpacity ) {
	if( percentOpacity ) {
		if( percentOpacity<0 ) { percentOpacity = 0; }
		if(percentOpacity>100){ percentOpacity=100; }
	}        
	this.percentOpacity = percentOpacity;
	if ( this.percentOpacity ) {        
		if( typeof( this.div_.style.filter ) == 'string' ){ this.div_.style.filter = 'alpha(opacity:' + this.percentOpacity + ')'; }
		if( typeof( this.div_.style.KHTMLOpacity ) == 'string' ){ this.div_.style.KHTMLOpacity = this.percentOpacity/100; }
		if( typeof( this.div_.style.MozOpacity ) == 'string' ){ this.div_.style.MozOpacity = this.percentOpacity/100; }
		if( typeof( this.div_.style.opacity ) == 'string' ){ this.div_.style.opacity = this.percentOpacity/100; }
	}
};

Shape.prototype.getPoint = function() {
	return this.point;
};

