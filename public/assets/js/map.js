
var threejshop = { lat: 33.8169564, lng: -117.96897590000003 };
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: threejshop
    });
    var marker = new google.maps.Marker({
        position: threejshop,
        map: map
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, startCoords) {
    var start = startCoords;
    var end = threejshop;
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
window.onload = function () {
    $("#getDirs").on("click", function () {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var directionsService = new google.maps.DirectionsService;
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('dirpanel'));
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            calculateAndDisplayRoute(directionsService, directionsDisplay, pos);
            //not triggering the .attr() here..?
            $("#getDirs").attr("display", "none");
        }, function () {
            alert("Uh-oh! Something went wrong when we tried to get your location.")
            console.error("Uh-oh! Something went wrong when we tried to get your location.");
        });
        } else {
            alert("Your browser does not support geolocations")
            console.error("Your browser does not support geolocations.");
        }
    });
}

