function grabFBFeed() {
    $("#smFeedBox").empty();
    $("#smFeedBox").append("<p>Facebook feed under construction</p>")
}

function grabTweets() {
    $.get("/api/twitter", function(data) {
        $("#smFeedBox").empty();
        var newUl = $("<ul class='list-group text-center'>");
        for (var i = 0; i < data.length; i++) {
            newUl.append("<li class='list-group-item'>" + data[i].text + "</li>")
        }
        $("#smFeedBox").append(newUl);
    })
}

function grabInstaFeed() {
    $("#smFeedBox").empty();
    $("#smFeedBox").append("<p>Instagram feed under construction</p>")
}

window.onload = function() {
    grabFBFeed();
    $("#fbFeed").on("click", function() {
        $("#fbFeed").addClass("active");
        $("#twitFeed").removeClass("active");
        $("#instaFeed").removeClass("active");
        grabFBFeed();
    });
    $("#twitFeed").on("click", function() {
        $("#fbFeed").removeClass("active");
        $("#twitFeed").addClass("active");
        $("#instaFeed").removeClass("active");
        grabTweets();
    });
    $("#instaFeed").on("click", function() {
        $("#fbFeed").removeClass("active");
        $("#twitFeed").removeClass("active");
        $("#instaFeed").addClass("active");
        grabInstaFeed();
    });
}