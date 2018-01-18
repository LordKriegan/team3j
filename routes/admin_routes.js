module.exports = function (app) {
    app.get("/admin/buylist", function (req, res) {
        // Grab the "Authorization" header.
        var auth = req.get("authorization");

        // On the first request, the "Authorization" header won't exist, so we'll set a Response
        // header that prompts the browser to ask for a username and password.
        if (!auth) {
            res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
            // If the user cancels the dialog, or enters the password wrong too many times,
            // show the Access Restricted error message.
            res.status(401).send("Authorization Required");
        } else {
            // If the user enters a username and password, the browser re-requests the route
            // and includes a Base64 string of those credentials.
            var credentials = new Buffer(auth.split(" ").pop(), "base64").toString("ascii").split(":");
            if (credentials[0] === process.env.ADMINUN && credentials[1] === process.env.ADMINPW) {
                // The username and password are correct, so the user is authorized.
                res.render("adm_buylist", { layout: 'admin.handlebars' });
            } else {
                // The user typed in the username or password wrong.
                res.status(403).send("Access Denied (incorrect credentials)");
            }
        }
    });

    app.get("/admin/news", function (req, res) {
        // Grab the "Authorization" header.
        var auth = req.get("authorization");

        // On the first request, the "Authorization" header won't exist, so we'll set a Response
        // header that prompts the browser to ask for a username and password.
        if (!auth) {
            res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
            // If the user cancels the dialog, or enters the password wrong too many times,
            // show the Access Restricted error message.
            res.status(401).send("Authorization Required");
        } else {
            // If the user enters a username and password, the browser re-requests the route
            // and includes a Base64 string of those credentials.
            var credentials = new Buffer(auth.split(" ").pop(), "base64").toString("ascii").split(":");
            if (credentials[0] === process.env.ADMINUN && credentials[1] === process.env.ADMINPW) {
                // The username and password are correct, so the user is authorized.
                res.render("adm_news", { layout: 'admin.handlebars' });
            } else {
                // The user typed in the username or password wrong.
                res.status(403).send("Access Denied (incorrect credentials)");
            }
        }
    });

    app.get("/admin", function(req, res) {
        res.redirect("/admin/news");
    })
    
}