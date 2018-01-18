window.onload = function () {
    axios
        .get("/api/news")
        .then(function (response) {
            var newsFeed = response.data;
            console.log(newsFeed);
            for (var i = 0; i < newsFeed.length; i++) {
                var newDiv = $("<div>");
                var newP = $("<p>");
                var newDate = new Date(newsFeed[i].createdAt);
                $(newP).text(newDate.toDateString() + ", " + newDate.toLocaleTimeString());
                $(newP).addClass("newsDate");
                $(newDiv).append(newP);
                newP = $("<p>");
                $(newP).html(newsFeed[i].news);
                $(newDiv).append(newP);
                $(newDiv).append("<button class='delPost btn btn-primary' data-postId='" + newsFeed[i].id + "'>Delete Post</button>");
                $(newDiv).addClass("newsContainer");
                $("#newsFeed").prepend(newDiv);
            }

            //need to put listener here due to asynchronicity
            $(".delPost").on("click", function () {
                if (confirm("Do you really want to delete this post?")) {
                    axios.delete("/api/news/" + $(this).attr("data-postId"))
                        .then(function (response) {
                            console.log(response);
                            window.location.reload();
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                }
            });
        })
        .catch(function (error) {
            console.error(error);
        });
    $("#addPost").on("click", function (e) {
        e.preventDefault();
        axios.post("/api/news", {
            news: $("#newPostText").val().trim()
        }).then(function (response) {
            console.log(response);
            window.location.reload();
        }).catch(function (error) {
            console.error(error);
        });
    })
}