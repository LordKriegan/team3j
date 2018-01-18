var currDept;
window.onload = function () {
    axios
        .get("/api/getbuylist")
        .then(function (response) {
            buylist = response.data
            console.log(buylist);
            for (var i = 0; i < buylist.deptList.length; i++) {
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
                var newTableRow = $("<tr data-itemid='" + buylist.itemList[i].id + "'>");
                $(newTableRow).append("<td><a href='#' class='delItem'>" + buylist.itemList[i].itemName + "</a></td>");
                $(newTableRow).append("<td><a href='#' class='updPrice'>" + buylist.itemList[i].itemPrice + "</a></td>");
                $("#deptId" + buylist.itemList[i].DeptId).append(newTableRow);
            }

            //setting up default views and vars
            totalDepts = buylist.deptList.length;
            currDept = buylist.deptList[0].id;
            $($("#deptTabs").children()[0]).addClass("active");
            $($("#itemLists").children()[0]).css("display", "table");

            //need to put listeners here due to asynchronicity
            $("#deptTabs > li").on("click", function () {
                $("#deptTabs > li").removeClass("active");
                $(this).addClass("active");
                currDept = $(this).attr("data-deptId");
                $("#itemLists > table").css("display", "none");
                $("#deptTable" + $(this).attr("data-deptId")).css("display", "table");
            });
            $(".delItem").on("click", function () {
                if (confirm("Do you want to delete this item?")) {
                    var itemId = $($($(this).parent()[0]).parent()[0]).attr("data-itemId");
                    axios.delete("/api/buylist/Item/" + itemId)
                        .then(function (response) {
                            console.log(response);
                            window.location.reload();
                        })
                        .catch(function (error) {
                            console.error(error);
                        });
                }
            });
            $(".updPrice").on("click", function () {
                if (confirm("Do you want to update the price of this item?")) {
                    do {
                        var newPrice = prompt("Enter a new price: ");
                    } while (!parseFloat(newPrice));
                    var itemId = $($($(this).parent()[0]).parent()[0]).attr("data-itemId");
                    axios.put("/api/buylist/Item", {
                        itemPrice: newPrice,
                        id: itemId
                    }).then(function (response) {
                        console.log(response);
                        window.location.reload();
                    }).catch(function (error) {
                        console.error(error);
                    })
                }
            });
        })
        .catch(function (error) {
            console.error(error);
        });

    $("#addDept").on("click", function (e) {
        e.preventDefault();
        axios.post("/api/buylist/Dept", {
            name: $("#newDept").val().trim()
        }).then(function (response) {
            console.log(response);
            window.location.reload();
        }).catch(function (error) {
            console.error(error);
        });
    });

    $("#remDept").on("click", function (e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete the current department? It can not be recovered once deleted.")) {
            axios.delete("/api/buylist/Dept/" + currDept)
                .then(function (response) {
                    console.log(response);
                    window.location.reload();
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    });

    $("#addItem").on("click", function (e) {
        e.preventDefault();
        axios.post("/api/buylist/Item", {
            itemName: $("#newItem").val().trim(),
            itemPrice: $("#newItemPrice").val().trim(),
            DeptId: currDept
        }).then(function (response) {
            console.log(response);
            window.location.reload();
        }).catch(function (error) {
            console.error(error);
        });
    });
}
