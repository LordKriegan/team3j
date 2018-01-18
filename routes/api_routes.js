var axios = require('axios');
//setup twitter api
var Twitter = require('twitter');
var twitKey = {
    consumer_key: process.env.TWITCONSKEY,
    consumer_secret: process.env.TWITCONSSECRET,
    access_token_key: process.env.TWITACCESSKEY,
    access_token_secret: process.env.TWITACCESSSECRET,
}
var twitClient = new Twitter(twitKey)

var db = require("../models");

module.exports = function(app) {
    app.get("/api/twitter", function(req, res) {
        var params = { screen_name: "team3j", count: 20 };
        twitClient.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (error) {
                res.status(500).json(["Error: Failed to retrieve tweets"]);
            } else {
                res.json(tweets);
            }
        });
    });
    app.get("/api/getbuylist", function(req, res) {
        var response = {};
        db.Depts.findAll({
            where: {}
        }).then(function(deptData) {
            response.deptList = deptData;
            db.Items.findAll({
                include: [db.Depts],
                where: {}
            }).then(function(itemData) {
                response.itemList = itemData;
                res.json(response);
            });
        });
    });
}