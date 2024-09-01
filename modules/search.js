const select = $(".searchbar-controls");
select.on("focus", function () {
    if (localStorage.getItem("theme") === "dark") {
        $(".search-containdark").css("display", "block");
    } else {
        $(".search-contain").css("display", "block");
    }
});
select.on("focusout", function (e) {
    if ($(e.relatedTarget).hasClass("linksearch") || $(e.relatedTarget).hasClass("linksearch")) {
        return;
    }
    if (localStorage.getItem("theme") === "dark") {
        $(".search-containdark").css("display", "none");
    } else {
        $(".search-contain").css("display", "none");
    }
});
select.on("input", function () {
    if (select.val().length >= 3) {
        if (select.val().split("#").length > 1) {
            const data = new FormData();
            data.append("search", select.val().split("#")[1].split(" ")[0]);
            axios.post("../controllers/hashtag.php", data).then(
                function (response) {
                    if (response.data === "Error") {
                        return;
                    }
                    if (localStorage.getItem("theme") === "dark") {
                        $(".search-elementdark").remove();
                        $(".search-containdark").remove();
                    } else {
                        $(".search-contain").remove();
                        $(".search-element").remove();
                    }
                    if (response.data === "Error") {
                        return;
                    }
                    if (localStorage.getItem("theme") === "dark") {
                        $(".searchbar-main").append("<div class='search-containdark'></div>");
                    } else {
                        $(".searchbar-main").append("<div class='search-contain'></div>");
                    }
                    let i = 0;
                    for (i = i; i < response.data.length; i += 1) {
                        if (i >= 1) {
                            if (select.val() + response.data[i].content.split("#" + select.val().split("#")[1])[1].split(" ")[0] === select.val() + response.data[i - 1].content.split("#" + select.val().split("#")[1])[1].split(" ")[0]) {
                                console.log("continue");
                            } else {
                                if (localStorage.getItem("theme") === "dark") {
                                    $(".search-containdark").append("<div class='search-elementdark'><a class='linksearch' href='../View/mainhsh.html?hashtag=" + select.val().split("#")[1] + response.data[i].content.split("#" + select.val().split("#")[1])[1].split(" ")[0] + "'/>" + select.val() + response.data[i].content.split("#" + select.val().split("#")[1])[1].split(" ")[0] + "</a></div>");
                                } else {
                                    $(".search-contain").append("<div class='search-elementdark'><a class='linksearch' href='../View/mainhsh.html?hashtag=" + select.val().split("#")[1] + response.data[i].content.split("#" + select.val().split("#")[1])[1].split(" ")[0] + "'/>" + select.val() + response.data[i].content.split("#" + select.val().split("#")[1])[1].split(" ")[0] + "</a></div>");
                                }
                            }
                        } else {
                            if (localStorage.getItem("theme") === "dark") {
                                $(".search-containdark").append("<div class='search-elementdark'><a class='linksearch' href='../View/mainhsh.html?hashtag=" + select.val().split("#")[1] + response.data[i].content.split("#" + select.val().split("#")[1])[1].split(" ")[0] + "'/>" + select.val() + response.data[i].content.split("#" + select.val().split("#")[1])[1].split(" ")[0] + "</a></div>");
                            } else {
                                $(".search-contain").append("<div class='search-elementdark'><a class='linksearch' href='../View/mainhsh.html?hashtag=" + select.val().split("#")[1] + response.data[i].content.split("#" + select.val().split("#")[1])[1].split(" ")[0] + "'/>" + select.val() + response.data[i].content.split("#" + select.val().split("#")[1])[1].split(" ")[0] + "</a></div>");
                            }
                        }
                    }
                }
            );
        } else {
            const data1 = new FormData();
            data1.append("search", select.val());
            axios.post("../controllers/search.php", data1).then(
                function (response) {
                    if (localStorage.getItem("theme") === "dark") {
                        $(".search-elementdark").remove();
                        $(".search-containdark").remove();
                    } else {
                        $(".search-contain").remove();
                        $(".search-element").remove();
                    }
                    if (response.data === "Error") {
                        return;
                    }
                    if (localStorage.getItem("theme") === "dark") {
                        $(".searchbar-main").append("<div class='search-containdark'></div>");
                    } else {
                        $(".searchbar-main").append("<div class='search-contain'></div>");
                    }
                    let i = 0;
                    for (i = i; i < response.data.length; i += 1) {
                        response.data[i].profile_picture = (
                            response.data[i].profile_picture === null
                            ? "/img/pp-chicken.png"
                                : "../model/upload/" + response.data[i].profile_picture
                        );
                        if (localStorage.getItem("theme") === "dark") {
                            $(".search-containdark").append(
                                "<div class='search-elementdark'><a class='linksearch' href='../View/profil.html?id=" +
                                response.data[i].id +
                                "'/><div><img class='img-fluid img-search'src='" +
                                response.data[i].profile_picture +
                                "'></div><div>" + response.data[i].full_name + "<br>" + response.data[i].username + "</div></a></div>"
                            );
                        } else {
                            $(".search-contain").append(
                                "<div class='search-element'><a class='linksearch' href='../View/profil.html?id=" +
                                response.data[i].id +
                                "'/><div><img class='img-fluid img-search'src='" +
                                response.data[i].profile_picture +
                                "'></div><div>" + response.data[i].full_name + "<br>" + response.data[i].username + "</div></a></div>"
                            );
                        }
                    }
                }
            );
        }
    }
});