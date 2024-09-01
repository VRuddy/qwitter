const idanother = window.location.search.split("=")[1];

function follows() {
    if (idanother) {
        if ($(".button-follow").length > 0) {
            $(".button-follow").remove();
        }
            $(".button-profil").remove();
            const btn = document.createElement("button");
            btn.classList.add("button-follow");
            const data = new FormData();
            data.append("id", idanother);
            axios.post("../controllers/checkfollow.php", data).then(function (response) {
                if (response.data === "") {
                    btn.innerHTML = "Suivre";
                    $(btn).attr("onclick", "follo()");
                } else {
                    btn.innerHTML = "Ne plus suivre";
                    $(btn).attr("onclick", "unfollow(" + response.data[0].id + ")");
                }
                $(".bio-profil").prepend(btn);
            });
        
    }
}
    follows();

    function follo() {
        const data1 = new FormData();
        data1.append("id", idanother);
        axios.post("../controllers/follow.php", data1).then(function (response) {
            follows();
        });
    }
    function unfollow(idfollow) {
        const data2 = new FormData();
        data2.append("id", idfollow);
        axios.post("../controllers/unfollow.php", data2).then(function (response) {
            follows();
        });
        console.log("test");
    }

    function follower() {
        const data3 = new FormData();
        data3.append("id", idanother);
        axios.post("../controllers/follower.php", data3).then(function (response) {
            console.log(response.data);
            $(".numbers-follow").html(response.data.length);
            if (response.data.length > 0) {
                $(".numbers-follow").attr("onclick", "listfollower()");
            } else {
                $(".numbers-follow").attr("onclick", "");
            }
        });
    }
    follower();

    function followed() {
        const data4 = new FormData();
        data4.append("id", idanother);
        axios.post("../controllers/followed.php", data4).then(function (response) {
            console.log(response.data);
            $(".numbers-followers").html(response.data.length);
            if (response.data.length > 0) {
                $(".numbers-followers").attr("onclick", "listfollowed()");
            } else {
                $(".numbers-followers").attr("onclick", "");
            }
        });
    }
    followed();

    function listfollower() {
        const data5 = new FormData();
        data5.append("id", idanother);
        axios.post("../controllers/follower.php", data5).then(function (response) {
            $(".followedzindex").removeClass("visually-hidden");
            $(".followedzindex .followed-list").html("");
            let i = 0;
            for (i = i; i < response.data.length; i += 1) {
                const div2 = document.createElement("div");
                const pp2 = document.createElement("p");
                const img2 = document.createElement("img");
                const btn2 = document.createElement("button");
                div2.appendChild(img2);
                div2.appendChild(pp2);
                $(div2).css("border-bottom", "1px solid black");
                $(div2).css("padding", "5px");
                $(div2).css("margin-bottom", "30px");
                $(img2).attr("alt", response.data[i].full_name);
                $(img2).attr("width", "60px");
                $(img2).attr("height", "60px");
                $(img2).css("border-radius", "50%");
                $(img2).css("margin-bottom", "3%");
                $(img2).css("border", "1px solid black");
                $(img2).attr("onclick", "window.location.href = 'profil.html?id=" + response.data[i].id + "'");
                if (response.data[i].profile_picture === null) {
                    $(img2).attr("src", "/img/pp-chicken.png");
                } else {
                    $(img2).attr("src", "../model/upload/" + response.data[i].profile_picture);
                    $(pp2).attr("onclick", "window.location.href = 'profil.html?id=" + response.data[i].id + "'");
                }
                if (response.data[i].profile_picture === null) {
                    $(pp2).attr("src", "/img/pp-chicken.png");
                } else {
                    $(pp2).attr("src", "../model/upload/" + response.data[i].profile_picture);
                    pp2.classList.add("list-item");
                    $(pp2).css("color", "black");
                    $(pp2).css("font-size", "15px");
                    $(pp2).css("font-weight", "bold");
                    $(pp2).css("margin-bottom", "10px");
                    $(pp2).css("display", "inline-block");
                    $(pp2).css("margin-left", "33%");
                    $(pp2).css("font-family", "sans-serif");
                    $(pp2).css("cursor", "pointer");
                    pp2.innerHTML = response.data[i].full_name;
                    $(".followedzindex .followed-list").append(div2);
                }
                if (i === response.data.length - 1) {
                    $(document).mouseup(function (e) {
                        let container = $(".followedzindex");
                        if (!container.is(e.target) && container.has(e.target).length === 0) {
                            container.addClass("visually-hidden");
                        }
                    });
                }
            }
        });
    }
        function listfollowed() {
            const data6 = new FormData();
            data6.append("id", idanother);
            axios.post("../controllers/followed.php", data6).then(function (response) {
                $(".followedzindex").removeClass("visually-hidden");
                $(".followedzindex followed-list").html("");
                let o = 0;
                for (o = o; o < response.data.length; o += 1) {
                    const div1 = document.createElement("div");
                    const pp1 = document.createElement("p");
                    const img1 = document.createElement("img");
                    const btn2 = document.createElement("button");
                    div1.appendChild(img1);
                    div1.appendChild(pp1);
                    $(div1).css("margin-bottom", "30px");
                    $(div1).css("border-bottom", "1px solid black");
                    $(div1).css("padding", "5px");
                    $(img1).attr("src", response.data[o].avatar);
                    $(img1).attr("alt", response.data[o].full_name);
                    $(img1).attr("width", "60px");
                    $(img1).attr("height", "60px");
                    $(img1).css("border-radius", "50%");
                    $(img1).css("margin-bottom", "3%");
                    $(img1).css("border", "1px solid black");
                    $(img1).attr("onclick", "window.location.href = 'profil.html?id=" + response.data[o].id + "'");
                    if (response.data[o].profile_picture === null) {
                        $(img1).attr("src", "/img/pp-chicken.png");
                    } else {
                        $(img1).attr("src", "../model/upload/" + response.data[o].profile_picture);
                        $(pp1).attr("onclick", "window.location.href = 'profil.html?id=" + response.data[o].id + "'");
                    }
                    if (response.data[o].profile_picture === null) {
                        $(pp1).attr("src", "/img/pp-chicken.png");
                    } else {
                        $(pp1).attr("src", "../model/upload/" + response.data[o].profile_picture);
                        pp1.classList.add("list-item");
                        $(pp1).css("color", "black");
                        $(pp1).css("font-size", "15px");
                        $(pp1).css("font-weight", "bold");
                        $(pp1).css("margin-bottom", "10px");
                        $(pp1).css("display", "inline-block");
                        $(pp1).css("margin-left", "33%");
                        $(pp1).css("font-family", "sans-serif");
                        $(pp1).css("cursor", "pointer");
                        pp1.innerHTML = response.data[o].full_name;
                        $(".followedzindex .followed-list").append(div1);
                    }
                }
            });
        }
    

$(".fa-x").on("click", function () {
    if($(".followedzindex").hasClass("visually-hidden") == false) {
        $(".followedzindex").addClass("visually-hidden");
        $(".followedzindex .followed-list > div").remove();
    }
    if($(".followerzindex").hasClass("visually-hidden") == false) {
        $(".followerzindex").addClass("visually-hidden");
        $(".followerzindex .follower-list > div").remove();
    }
})