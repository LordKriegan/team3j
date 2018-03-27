function grabFBFeed() {
    axios
        .get("/api/facebook")
        .then(function(response) {
            $("#fbFeedBox").empty();
            var newUl = $("<ul class='list-group text-center'>");
            for (var i = 0; i < response.data.data.length; i++) {
                var newPost = response.data.data[i].message || response.data.data[i].story
                newUl.append("<li class='list-group-item'><div>" + newPost + "</div><div><a target='_blank' href='https://www.facebook.com/" + response.data.data[i].id + "'>Read the full story here!</a></div></li>")
            }
            $("#fbFeedBox").append(newUl);
        })
        .catch(function(error) {
            console.error(error);
        });
}

function grabTweets() {
    axios
        .get("/api/twitter")
        .then(function(response) {
            $("#twitFeedBox").empty();
            console.log(response.data);
            var newUl = $("<ul class='list-group text-center'>");
            for (var i = 0; i < response.data.length; i++) {
                var tweetBody = response.data[i].text.slice(0, response.data[i].entities.urls[0].indices[0])
                newUl.append("<li class='list-group-item'><div>" + tweetBody + "</div><div><a href='https://www.twitter.com/statuses/" + response.data[0].id_str + "' target='_blank'>Read the full story here!</a></div></li>")
            }
            $("#twitFeedBox").append(newUl);
        })
        .catch(function(error) {
            console.error(error);
        });
}

function grabInstaFeed() {
    axios
        .get("https://www.instagram.com/team3j/?__a=1")
        .then(function(response) {
            $("#instaFeedBox").empty();
            var data = response.data.graphql.user.edge_owner_to_timeline_media.edges
            for (var i =0; i < data.length; i++) {
                $("#instaFeedBox").append("<a target='_blank' href='https://www.instagram.com/p/" + data[i].node.shortcode + "'><img class='img-responsive img-thumbnail instagramPic' src='" + data[i].node.display_url + "' /></a>");
            }
        })
        .catch(function(error) {
            console.error(error)
        })
}

window.onload = function() {
    grabFBFeed();
    grabTweets();
    grabInstaFeed();
    $("#fbFeedBox").css("display", "block");
    $("#fbFeed").css("display", "block");
    $("#feedTabs > li").on("click", function () {
        $("#feedTabs > li").removeClass("active");
        $(this).addClass("active");
    });
    $("#fbFeed").on("click", function() {
        $(".feedBox").css("display", "none");
        $("#fbFeedBox").css("display", "block");
    });
    $("#twitFeed").on("click", function() {
        $(".feedBox").css("display", "none");
        $("#twitFeedBox").css("display", "block");
    });
    $("#instaFeed").on("click", function() {
        $(".feedBox").css("display", "none");
        $("#instaFeedBox").css("display", "block");
    });
}