/* jshint esversion: 6*/

const MapHandler = function() {
    const [$, google, address, port] = arguments;
    let map = undefined;
    let marker = undefined;
    let bounds = undefined;

    google.maps.Map.prototype.markers = new Array();

    google.maps.Map.prototype.addMarker = function(marker) {
        this.markers[this.markers.length] = marker;
    };

    google.maps.Map.prototype.clearMarkers = function() {
        for(var i=0; i<this.markers.length; i++){
            this.markers[i].setMap(null);
        }
        this.markers = new Array();
    };

    const boundsChanged = function() {
        if (!bounds) {
            bounds = map.getBounds();
            const coords = getRandomCoords(bounds);
            const newMarker = new google.maps.Marker({
                position: coords
            });
            newMarker.setMap(map);
            map.addMarker(newMarker);
            setInterval(updateMap, 10000);
        }
    };

    const updateMap = function() {
        const coords = getRandomCoords(bounds);
        const newMarker = new google.maps.Marker({
            position: coords
        });
        const coords2 = getRandomCoords(bounds);
        const newMarker2 = new google.maps.Marker({
            position: coords2
        });
        map.clearMarkers();
        newMarker.setMap(map);
        map.addMarker(newMarker);
        newMarker2.setMap(map);
        map.addMarker(newMarker2);
    }

    const getRandomCoords = function() {
        const [bounds] = arguments;
        let coords = undefined;
        $.ajax({
            type: 'GET',
            url: `http://${address}:${port}/coord`,
            dataType: 'json',
            async: false,
            data: {
                lngMin: bounds.b.b,
                lngMax: bounds.b.f,
                latMin: bounds.f.b,
                latMax: bounds.f.f
            },
            success: function (data) {
                coords = data;
            }
        });
        return coords;
    }

    const initMap = function() {
        const [lat, lng, zoom, mapId] = arguments;
        map = new google.maps.Map(document.getElementById(mapId), {
            zoom: zoom,
            center: {lat: lat, lng: lng}
        });
        marker = new google.maps.Marker({
            position: {lat: lat, lng: lng}
        });
        marker.setMap(map);
        map.addMarker(marker);
        google.maps.event.addListener(map, 'bounds_changed', boundsChanged);
    };

    return {
        initMap: initMap
    };
}

function initMap() {
    MapHandler(jQuery, google, 'localhost', '5000').initMap(-23.18111111, -50.64666667, 14, 'map-central');
}
