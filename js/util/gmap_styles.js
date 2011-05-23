// Some of these are from http://www.41latitude.com/post/1268734799/google-styled-maps
// Some are custom built

cg.GMAP_STYLES = {};

cg.GMAP_STYLES.Neutral = [
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      { saturation: -100 }
    ]
  },{
    featureType: "landscape",
    elementType: "all",
    stylers: [
      { saturation: -100 }
    ]
  },{
    featureType: "poi",
    elementType: "all",
    stylers: [
      { saturation: -100 }
    ]
  },{
    featureType: "road",
    elementType: "all",
    stylers: [
      { saturation: -100 }
    ]
  },{
    featureType: "transit",
    elementType: "all",
    stylers: [
      { saturation: -100 }
    ]
  },{
    featureType: "water",
    elementType: "all",
    stylers: [
      { saturation: -100 }
    ]
  }
];

cg.GMAP_STYLES.Subtle = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      { saturation: -47 }
    ]
  },{
    featureType: "poi",
    elementType: "all",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "water",
    elementType: "all",
    stylers: [
      { saturation: -68 },
      { visibility: "on" },
      { lightness: 50 }
    ]
  },{
    featureType: "road.local",
    elementType: "all",
    stylers: [
      { visibility: "simplified" }
    ]
  },{
    featureType: "road.arterial",
    elementType: "all",
    stylers: [
      { visibility: "simplified" }
    ]
  },{
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      { visibility: "simplified" }
    ]
  },{
    featureType: "administrative.province",
    elementType: "all",
    stylers: [
      { visibility: "simplified" }
    ]
  },{
    featureType: "transit",
    elementType: "all",
    stylers: [

    ]
  }
];

cg.setGMapStyle = function(gmap, name) {
    var options = {
            name: name
        },
        map_type = new google.maps.StyledMapType(cg.GMAP_STYLES[name], options);

    gmap.mapTypes.set(name, map_type);
    gmap.setMapTypeId(name);

};
