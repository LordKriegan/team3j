module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("home");
    });

    app.get("/events", function(req, res) {
        res.render("events");
    });
    
    app.get("/maps", function(req, res) {
        apiLink = {
            apiLink: "https://maps.googleapis.com/maps/api/js?key=" + process.env.GOOGLEMAPSAPIKEY + "&callback=initMap"
        }
        res.render("maps", apiLink);
    });

    app.get("/smfeeds", function(req, res) {
        res.render("smfeeds");
    })
}