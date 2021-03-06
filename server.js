//dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var sslRedirect = require('heroku-ssl-redirect');
var bodyParser = require('body-parser');

//setup dev environment
var dbSyncOptions = { force: false }
if (process.env.NODE_ENV.trim() === "development"){
    require('dotenv').config(); //grab local copy of env vars
    dbSyncOptions.force = true;
}

//setup server
var port = process.env.PORT || 3000;
var app = express();

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//force https
app.use(sslRedirect());

//setup handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setup routes
app.use(express.static("public"));
require('./routes/page_routes.js')(app);
require('./routes/api_routes.js')(app);
require('./routes/admin_routes.js')(app);


app.get("/404", function(req, res) {
    res.status(404).render("err404");
});

//catch all route
app.get("*", function(req, res) {
    res.redirect("/404");
});

//start server
db.sequelize.sync(dbSyncOptions).then(function() {
    app.listen(port, function() {
        console.log("App listening on PORT " + port);
    });
});