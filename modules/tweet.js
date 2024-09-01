$(".btn-tweet").on("click", function () {
    if ($(".happening-middle").val() !== "") {
        if ($("input[type=file]")[0].files[4] && $("input[type=file]")[0].files[4].length !== 0) {
            return;
        }
        let date = new Date();
        let imgfile1 = (
            $("input[type=file]")[0].files[0]
            ? $("input[type=file]")[0].files[0]
            : null
        );
        let imgfile2 = (
            $("input[type=file]")[0].files[1]
            ? $("input[type=file]")[0].files[1]
            : null
        );
        let imgfile3 = (
            $("input[type=file]")[0].files[2]
            ? $("input[type=file]")[0].files[2]
            : null
        );
        let imgfile4 = (
            $("input[type=file]")[0].files[3]
            ? $("input[type=file]")[0].files[3]
            : null
        );
        const data = new FormData();
        data.append("tweet", $(".happening-middle").val());
        data.append("date", date);
        data.append("img1", imgfile1);
        data.append("img2", imgfile2);
        data.append("img3", imgfile3);
        data.append("img4", imgfile4);
        axios.post("../controllers/tweet.php", data);
        $(".happening-middle").val("");
    }
});
$(".happening-middle").on("input", function () {
    if ($(".happening-middle").val().split("#")[1]) {
        const who = $(".happening-middle").val().split("#").length;
        const hash = $(".happening-middle").val().split("#")[who - 1].split(" ")[0];
        const data = new FormData();
        data.append("hashtag", hash);
        axios.post("../controllers/hashtag.php", data);
    }
    if (!$(".happening-middle").val().split("@")[1]) {
        if ($(".containat").length > 0) {
            $(".containat").remove();
            return;
        }
    } else if ($(".happening-middle").val().split("@")[1] && $(".happening-middle").val().split("@")[1].length > 2 && $(".happening-middle").val().split("@")[1].split(" ").length === 1) {
        const at = $(".happening-middle").val().split("@")[1];
        const data1 = new FormData();
        data1.append("at", at);
        axios.post("../controllers/mention.php", data1).then(function (response) {
            if (response.data === "Error") {
                return;
            }
            if ($(".containat").length > 0) {
                $(".containat").remove();
            }
            let containat = $("<div class='containat'></div>");
            containat.addClass("containat");
            ($(".happening-middle").parent().parent().parent().append(containat));
            let o = 0;
            for (o = o;o < response.data.length; o += 1) {
                let row = $("<div class='row rowat'></div>");
                let col = $("<div class='col-2'></div>");
                let img = $("<img src='' alt=''>");
                img.attr("src", "http://145.239.142.113:34567/" + response.data[0].profile_picture);
                img.addClass("img-fluid");
                img.addClass("imgat");
                col.append(img);
                row.append(col);
                let col2 = $("<div class='col-10'></div>");
                let p = $("<p></p>");
                p.html("@" + response.data[o].username);
                let username = response.data[o].username;
                col2.append(p);
                row.append(col2);
                containat.append(row);
                row.on("click", function () {
                    $(".happening-middle").val($(".happening-middle").val().split("@")[0] + "@" + username + " ");
                    $(".containat").remove();
                });
            }
        });
    }
});