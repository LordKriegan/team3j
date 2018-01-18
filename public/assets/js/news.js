window.onload = function() {
    axios
        .get("/api/news")
        .then(function(response) {
            var newsFeed = response.data;
            console.log(newsFeed);
            for (var i = 0; i < newsFeed.length; i ++) {
                var newDiv = $("<div>");
                var newP = $("<p>");
                var newDate = new Date(response.data[i].createdAt);
                $(newP).text(newDate.toDateString() + ", " + newDate.toLocaleTimeString());
                $(newP).addClass("newsDate");
                $(newDiv).append(newP);
                newP = $("<p>");
                $(newP).text(response.data[i].news);
                $(newP).addClass("newsText");
                $(newDiv).append(newP);
                $(newDiv).addClass("newsContainer");
                $("#newsFeed").prepend(newDiv);
            }
        })
        .catch(function(error) {
            console.error(error);
        });
}