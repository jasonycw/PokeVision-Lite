javascript:(function(){
	$('.ad-unit').remove();
	$('.home-sidebar').remove();
	$('footer').remove();

	$('.header').css('padding',"10px 0");
	$('.home').addClass('embed-map');
	$('.home').css('padding',"0");
	$('.home-map').css('padding',"0");
	$('.home-map').css('height',"100vh");

	App.init();
	App.header.init();

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

	App.home.map.invalidateSize(new Object({debounceMoveend: true}));
})();