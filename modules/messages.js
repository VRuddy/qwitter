axios.post("../controllers/checkconnect.php").then(function (response) {
    if (response.data == "Error") {
        window.location.href = "./index.html";
        return;
    }
});
$(".searchbar-control-main").on("input", function () {
    const data = new FormData();
    data.append("at", $(".searchbar-control-main").val());
    axios.post("../controllers/mention.php", data).then(function (response) {
        if (response.data === "Error") return;
        if ($(".containat").length > 0) $(".containat").remove();
        let containat = $("<div class='containat'></div>")
        containat.addClass("containat");
        $(".colmsg-r *").html = "";
        $(".searchbar-control-main").parent().parent().append(containat);
        for (let o = 0; o < response.data.length; o++) {
            let row = $("<div class='row rowat'></div>");
            let col = $("<div class=''col-2''></div>");
            let img = $("<img src='' alt=''>");
            row.attr("iduser", response.data[o].id_account_follow);
            if (response.data[o].profile_picture !== null) img.attr("src", "../model/upload/" + response.data[o].profile_picture);
            else img.attr("src", "/img/pp-chicken.png");
            img.addClass("img-fluid");
            img.addClass("imgat")
            col.append(img);
            row.append(col);
            let col2 = $("<div class='col-10'></div>");
            let p = $("<p></p>");
            p.html("@" + response.data[o].username);
            col2.append(p);
            row.append(col2);
            containat.append(row);
            row.on("click", function () {
                const data = new FormData();
                data.append("iduser", $(this).attr("iduser"));
                axios.post("../controllers/getprofilpm.php", data).then(function (response) {
                    $(".colmsg-r").removeClass("d-none")
                    $(".msgcontain").remove();
                    console.log(response.data);
                    if (response.data.profile_picture !== null) $(".img-msg").attr("src", "../model/upload/" + response.data.profile_picture);
                    else $(".img-msg").attr("src", "/img/pp-chicken.png");
                    $(".img-msg").css({
                        "border-radius": "50%",
                        "min-width": "50px",
                        "max-width": "65px",
                        "min-height": "60px",
                        "max-height": "65px",
                    });
                    $(".p-msg").html(response.data.full_name + "@" + response.data.username);
                    $(".inputmsg").attr("iduser", response.data.id);
                    containat.remove();
                    $(".searchbar-control-main").val("");
                    resfreshMp();
                })
            })
        }
    })
})
$(".send").on("click", function () {
    if ($(".inputmsg").val() == "") {
        return;
    }
    const data = new FormData();
    data.append("iduser", $(".inputmsg").attr("iduser"));
    data.append("content", $(".inputmsg").val());
    axios.post("../controllers/sendmsg.php", data).then(function (response) {
        console.log(response.data);
        $(".inputmsg").val("");
        resfreshMp(1);
    })
})

function resfreshMp(time = 0) {
    if ($(".inputmsg").attr("iduser") == undefined) {
        setTimeout(resfreshMp, 5000);
        return;
    }
    const data = new FormData();
    data.append("iduser", $(".inputmsg").attr("iduser"));
    axios.post("../controllers/privatemessage.php", data).then(function (response) {
        if (response.data === "Error") {
            setTimeout(resfreshMp, 5000);
            return;
        }
        const much = $(".contain-msg").children().length;
        for (let o = much; o < response.data.length; o++) {
            console.log(response.data[o].id_account_1)
            console.log($(".inputmsg").attr("iduser"))
            if (response.data[o].id_account_1 == $(".inputmsg").attr("iduser")) {
                const contain = $("<div class='msgcontain sender row'></div>");
                const msg = $("<div class='msg row'></div>");
                const msg12 = $("<div class='col-12'></div>");
                const info = $("<div class='info'></div>");
                const img = $("<img src='' alt=''>");
                const colimg = $("<div class='col-2'></div>");
                const colmsg = $("<div class='col-12'></div>");
                if (response.data[o].profile_picture !== null) img.attr("src", "../model/upload/" + response.data[o].profile_picture);
                else img.attr("src", "/img/pp-chicken.png");
                img.addClass("img-fluid");
                img.addClass("img-msg");
                colimg.append(img);
                // info.append($("<p class="p-msg"></p>").html(response.data[o].full_name + "@" + response.data[o].username));
                msg.append($("<p class='p-content'></p>").html(response.data[o].content));
                const date = $("<p class='date'></p>");
                date.html(response.data[o].date_sended);
                msg12.html(response.data[o].content);
                info.append(info, date);
                colmsg.append(info);
                contain.append(colimg, colmsg, msg);
                $(".contain-msg").append(contain);
            } else {
                const contain = $("<div class='msgcontain sended row'></div>");
                const msg = $("<div class='msg row'></div>");
                const msg12 = $("<div class='col-12'></div>");
                const info = $("<div class='info'></div>");
                const img = $("<img src='' alt=''>");
                const colimg = $("<div class='col-2'></div>");
                const colmsg = $("<div class='col-12'></div>");
                if (response.data[o].profile_picture !== null) img.attr("src", "../model/upload/" + response.data[o].profile_picture);
                else img.attr("src", "/img/pp-chicken.png");
                img.addClass("img-fluid");
                img.addClass("img-msg");
                colimg.append(img);
                // info.append($("<p class="p-msg"></p>").html(response.data[o].full_name + "@" + response.data[o].username));
                msg.append($("<p class='p-content'></p>").html(response.data[o].content));
                const date = $("<p class='date'></p>");
                date.html(response.data[o].date_sended);
                msg12.html(response.data[o].content);
                info.append(date, info);
                colmsg.append(info);
                contain.append(colmsg, colimg, msg);
                $(".contain-msg").append(contain);
            }
        }
        const count = $(".contain-msg").length > 0 ? $(".contain-msg").length : 0;
    })
    if (time === 0) {
        setTimeout(resfreshMp, 5000);
    }
}
axios.post("../controllers/checkconnect.php").then(function (response) {
    if (response.data == "Error") {
        window.location.href = "./index.html";
        return;
    }
});
const data = new FormData();
axios.post("../controllers/profil.php", data).then(function (response) {
    let val = response.data.length === 2 ? 1 : 0;
    let mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    let datecreation = new Date(response.data[val].creation_date);
    datecreation = mois[datecreation.getMonth()] + " " + datecreation.getFullYear();
    $(".avatar-text").children().remove();
    $(".header-bio-name").text(response.data[val].full_name);
    $(".profil-name").text(response.data[val].full_name);
    $("#username-bio").text("@" + response.data[val].username);
    $(".avatar-text").append("<p>" + response.data[0].full_name + "<br>" + "@" + response.data[0].username + "</p>");
    $("#datecrea").text("A rejoint Twitter en " + datecreation);
    $(".numbers-tweets")
    if (response.data[val].header !== null) $(".header-pics").css("background-image", "url(../model/upload/" + response.data[val].header + ")");
    if (response.data[val].profile_picture !== null) {
        $("#pp-chicken").attr("src", "../model/upload/" + response.data[val].profile_picture);
    } else {
        $("#pp-chicken").attr("src", "/img/pp-chicken.png");
    }
    if (response.data[0].profile_picture !== null) {
        $(".avatar-middle").addClass("img-fluid");
        $(".avatar-middle").attr("src", "../model/upload/" + response.data[0].profile_picture);
        $(".avatar-min").attr("src", "../model/upload/" + response.data[0].profile_picture);
    } else {
        $(".avatar-middle").addClass("img-fluid");
        $(".avatar-middle").attr("src", "/img/pp-chicken.png");
        $(".avatar-min").attr("src", "/img/pp-chicken.png");
    }
    $("#locationaffi").text(response.data[val].location);
    if ($("#locationaffi").text() == "0") {
        $("#locationaffi, .header-date").attr("class", "visually-hidden");
    }
});
