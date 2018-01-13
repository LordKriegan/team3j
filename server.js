//dependencies
if (process.env.NODE_ENV.trim() === "development") require('dotenv').config(); //grab local copy of env vars
var express = require('express');
var exphbs = require('express-handlebars');

//setup server
var port = process.env.PORT || 3000;
var app = express();

//setup handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setup routes
app.use(express.static("public"));
require('./routes/page_routes.js')(app);
require('./routes/api_routes.js')(app);

//catch all route
app.get("*", function(req, res) {
    res.render("home");
});
//start server
app.listen(port);