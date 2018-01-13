
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
            displayDirections(response.routes[0].legs[0]);
        } else {
            window.alert('Directions request failed due to ' + status);
            backupDirs()
        }
    });
}

function backupDirs() {
    window.open('https://www.google.com/maps/dir/?api=1&destination=team3j&destination_place_id=EiYyNDI0IEUgQmFsbCBSZCwgQW5haGVpbSwgQ0EgOTI4MDYsIFVTQQ')
}

function displayDirections(steps) {
    $("#dirpanel").empty();
    var newUl = $("<ul class='list-group'>");
    newUl.append("<li class='list-group-item'>Starting from: " + steps.start_address + "</li>");
    newUl.append("<li class='list-group-item'>Distance: " + steps.distance.text + ", Duration: " + steps.duration.text + "</li>");
    for (var i = 0; i < steps.steps.length; i++) {
        newUl.append("<li class='list-group-item'>" + (i + 1) + ". " + steps.steps[i].instructions + "</li>");
    }
    newUl.append("<li class='list-group-item'>Ending at: " + steps.end_address + "</li>")
    $("#dirpanel").append(newUl);
}
window.onload = function () {
    $("#getDirs").on("click", function () {
        if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var directionsService = new google.maps.DirectionsService;
            directionsDisplay.setMap(map);
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            calculateAndDisplayRoute(directionsService, directionsDisplay, pos);
        }, function () {
            backupDirs();
            console.error("Uh-oh! Something went wrong when we tried to get your location.");
        });
        } else {
            backupDirs();
            console.error("Your browser does not support geolocations.");
        }
    });
}

