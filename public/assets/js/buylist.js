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
            $($("#deptTabs").children()[0]).addClass("active");
            $($("#itemLists").children()[0]).css("display", "table");

            $("#deptTabs > li").on("click", function() {
                $("#deptTabs > li").removeClass("active");
                $(this).addClass("active");
                $("#itemLists > table").css("display", "none");
                $("#deptTable" + $(this).attr("data-deptId")).css("display", "table");
            });
        })
        .catch(function(error) {
            console.error(error);
        });
}
