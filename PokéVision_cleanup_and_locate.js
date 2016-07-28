// Remove annoying stuffs
$('.ad-unit').remove();
$('.home-sidebar').remove();
$('.leaflet-control-attribution').remove();
$('.ocrext-element.ocrext-wrapper').remove();
$('footer').remove();

// Change styling
$('.header').css('padding',"10px 0");
$('.header-mobile').css('position',"absolute");
$('.header-mobile').css('width',"100%");
$('.home').addClass('embed-map');
$('.home').attr('style', 'height: 100% !important; padding: 0');
$('.home-map').css('padding',"0");
$('.home-map').css('height',"100vh");
$('.home-map-scan').css('bottom','16px');
$('.home-map-scan').css('left','168px');
$('.bootstrap-select.show-tick').css('top','auto');
$('.bootstrap-select.show-tick').css('bottom','16px');
$('.bootstrap-select.show-tick').css('right','70px');

// Init the map again???
App.init();
App.header.init();

// Get current location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(e) {
        var t = e.coords.latitude
          , o = e.coords.longitude;
        App.home.latitude = t;
        App.home.longitude = o;
        App.home.map.panTo({
            lat: t,
            lng: o
        });
        App.home.markers.center.setLatLng({
            lat: t,
            lng: o
        });
        App.home.updateMarkers();
        App.home.findNearbyPokemon(t, o);
        window.location.hash = '#/@' + t + ',' + o
    }, function(e) {
        App.error(e.message)
    })
} else {
    App.error('Your browser doesn\'t support location tracking, sorry!')
}

// Resize map
App.home.map.invalidateSize(new Object({debounceMoveend: true}));