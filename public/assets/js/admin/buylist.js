var currDept;
window.onload = function() {
    axios
        .get("/api/getbuylist")
        .then(function(response) {
            buylist = response.data
            console.log(buylist);
            for(var i = 0; i < buylist.deptList.length; i++) {
                //create tabs
                var newTab = $("<li role='presentation'></li>");
                $(newTab).attr("data-deptId", buylist.deptList[i].id);
                $(newTab).append("<a href='#'>" + buylist.deptList[i].name + "</a>")
                $("#deptTabs").append(newTab);

                //create tables
                var newTable = $("<table class='deptTable table' id='deptTable" + buylist.deptList[i].id + "'>")
                $(newTable).append("<tbody id='deptId" + buylist.deptList[i].id + "'> <tr> <th>Card Name</th> <th>Buy Price</th> </tr> </tbody>")
                $("#itemLists").append(newTable);
            }
            for (var i = 0; i < buylist.itemList.length; i++) {
                //create items and sort into respective tables
                var newTableRow = $("<tr>");
                $(newTableRow).append("<td>" + buylist.itemList[i].itemName + "</td>");
                $(newTableRow).append("<td>" + buylist.itemList[i].itemPrice + "</td>");
                $("#deptId" + buylist.itemList[i].DeptId).append(newTableRow);
            }

            //setting up default views and vars
            totalDepts = buylist.deptList.length;
            currDept = buylist.deptList[0].id;
            $($("#deptTabs").children()[0]).addClass("active");
            $($("#itemLists").children()[0]).css("display", "table");

            //need to put listener here due to asynchronicity
            $("#deptTabs > li").on("click", function() {
                $("#deptTabs > li").removeClass("active");
                $(this).addClass("active");
                currDept = $(this).attr("data-deptId");
                $("#itemLists > table").css("display", "none");
                $("#deptTable" + $(this).attr("data-deptId")).css("display", "table");
            });
        })
        .catch(function(error) {
            console.error(error);
        });

    $("#addDept").on("click", function(e) {
        e.preventDefault();
        axios.post("/api/buylist/Dept", {
            name: $("#newDept").val().trim()
        }).then(function(response) {
            console.log(response);
            window.location.reload();
        }).catch(function(error) {
            console.error(error);
        });
    });

    $("#remDept").on("click", function(e) {
        e.preventDefault();
        axios.delete("/api/buylist/Dept/" + currDept)
             .then(function(response) {
                 console.log(response);
                 window.location.reload();
             })
             .catch(function(error) {
                 console.error(error);
             });
    });

    $("#addItem").on("click", function(e) {
        e.preventDefault();
        axios.post("/api/buylist/Item", {
            itemName: $("#newItem").val().trim(),
            itemPrice: $("#newItemPrice").val().trim(),
            DeptId: currDept
        }).then(function(response) {
            console.log(response);
            // window.location.reload();
        }).catch(function(error) {
            console.error(error);
        });
    });
}
