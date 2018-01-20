function grabFBFeed() {
    axios
        .get("/api/facebook")
        .then(function(response) {
            $("#fbFeedBox").empty();
            var newUl = $("<ul class='list-group text-center'>");
            for (var i = 0; i < response.data.data.length; i++) {
                var newPost = response.data.data[i].message || response.data.data[i].story
                newUl.append("<li class='list-group-item'>" + newPost + "</li>")
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
            var newUl = $("<ul class='list-group text-center'>");
            for (var i = 0; i < response.data.length; i++) {
                newUl.append("<li class='list-group-item'>" + response.data[i].text + "</li>")
            }
            $("#twitFeedBox").append(newUl);
        })
        .catch(function(error) {
            console.error(error);
        });
}

function grabInstaFeed() {
    $("#instaFeedBox").empty();
    $("#instaFeedBox").append("<p>Instagram feed under construction</p>")
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