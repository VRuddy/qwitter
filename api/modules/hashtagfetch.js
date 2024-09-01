function timeline(x = 0) {
    const getparam = window.location.search.split("=")[1];
    const data = new FormData();
    data.append("hashtag", getparam);
    console.log(getparam);
    console.log("test");
    axios.post("../controllers/getweethastag.php", data).then(function(
    response) {
        for (let i = x; i < response.data.length; i++) {
            let imgpath1 = response.data[i].media_1 !== null ?
                "http://145.239.142.113:34567/" + response.data[i]
                .media_1 : null;
            let imgpath2 = response.data[i].media_2 !== null ?
                "http://145.239.142.113:34567/" + response.data[i]
                .media_2 : null;
            let imgpath3 = response.data[i].media_3 !== null ?
                "http://145.239.142.113:34567/" + response.data[i]
                .media_3 : null;
            let imgpath4 = response.data[i].media_4 !== null ?
                "http://145.239.142.113:34567/" + response.data[i]
                .media_4 : null;
            $(".deco").on("click", function() {
                if ($(".decod").hasClass("d-none")) {
                    $(".decod").removeClass("d-none");
                } else {
                    $(".decod").addClass("d-none");
                }
            });
            const middle = $("<div>").attr("class",
                "box-middle, col-11");
            const image = $("<img>").attr("src",
                "http://145.239.142.113:34567/" + response.data[i]
                .profile_picture);
            image.attr("class", "avatar-middle-two");
            const nameh = $("<span>").attr("class", "name-middle");
            const usernameh = $("<span>").attr("class", "at");
            const pauthor = $("<span>").attr("class",
                "author-tweet ms-5");
            const ms2 = $("<div>").attr("class", "ms-2 row");
            const tweetunder = $("<div>").attr("class",
                "col t-log mx-4");
            tweetunder.css("fill", "white");
            const logo1 = $("<img>").attr("src", "img/com.png");
            logo1.attr("class", "tweet-logo");
            const logo2 = $("<img>").attr("src", "img/rt.png");
            logo2.attr("class", "tweet-logo");
            const logo3 = $("<img>").attr("src", "img/heart.png");
            logo3.attr("class", "tweet-logo");
            const logo4 = $("<img>").attr("src", "img/share.png");
            logo4.attr("class", "tweet-logo");
            const logo5 = $("<img>").attr("src", "img/plus.png");
            logo5.attr("class", "tweet-logo");
            // const afil = $("<a>").attr("href", "#");
            const spanlast = $("<span>").attr("class", "thread");
            const img1 = imgpath1 !== null ? $("<img>").attr("src",
                imgpath1) : null;
            const img2 = imgpath2 !== null ? $("<img>").attr("src",
                imgpath2) : null;
            const img3 = imgpath3 !== null ? $("<img>").attr("src",
                imgpath3) : null;
            const img4 = imgpath4 !== null ? $("<img>").attr("src",
                imgpath4) : null;
            img1 !== null ? img1.attr("class", "img-fluid") : null;
            img2 !== null ? img2.attr("class", "img-fluid") : null;
            img3 !== null ? img3.attr("class", "img-fluid") : null;
            img4 !== null ? img4.attr("class", "img-fluid") : null;
            if (img4 !== null) {
                let contain41 = $("<div>").attr("class", "row");
                let contain42 = $("<div>").attr("class", "row");
                let col61 = $("<div>").attr("class", "col-6");
                let col62 = $("<div>").attr("class", "col-6");
                let col63 = $("<div>").attr("class", "col-6");
                let col64 = $("<div>").attr("class", "col-6");
                col61.css("overflow", "hidden");
                col62.css("overflow", "hidden");
                col63.css("overflow", "hidden");
                col64.css("overflow", "hidden");
                col61.css("height", "auto");
                col62.css("height", "auto");
                col63.css("height", "auto");
                col64.css("height", "auto");
                col61.append(img1);
                col62.append(img2);
                col63.append(img3);
                col64.append(img4);
                contain41.append(col61, col62);
                contain42.append(col63, col64);
                ms2.append(contain41, contain42);
            } else if (img3 !== null) {
                let contain31 = $("<div>").attr("class", "row");
                let contain32 = $("<div>").attr("class", "row");
                let col31 = $("<div>").attr("class", "col-12");
                let col32 = $("<div>").attr("class", "col-6");
                let col33 = $("<div>").attr("class", "col-6");
                col31.css("overflow", "hidden");
                col32.css("overflow", "hidden");
                col33.css("overflow", "hidden");
                col31.css("height", "auto");
                col32.css("height", "auto");
                col33.css("height", "auto");
                col31.append(img1);
                col32.append(img2);
                col33.append(img3);
                contain31.append(col31);
                contain32.append(col32, col33);
                ms2.append(contain31, contain32);
            } else if (img2 !== null) {
                let contain21 = $("<div>").attr("class", "col-6");
                let contain22 = $("<div>").attr("class", "col-6");
                contain21.css("overflow", "hidden");
                contain22.css("overflow", "hidden");
                contain21.css("height", "auto");
                contain22.css("height", "auto");
                contain21.append(img1);
                contain22.append(img2);
                ms2.append(contain21, contain22);
            } else if (img1 !== null) {
                let contain11 = $("<div>").attr("class", "row");
                contain11.css("overflow", "hidden");
                contain11.css("height", "auto");
                contain11.append(img1);
                ms2.append(contain11);
            }
            spanlast.attr("id", response.data[i].idtweet);
            // spanlast.attr("onclick", "showComments(this.id, this)");
            spanlast.text("Montrer ce fil");
            middle.append(image, nameh, usernameh, pauthor, ms2);
            nameh.text(response.data[i].full_name);
            usernameh.text("@" + response.data[i].username);
            if (response.data[i].content.split("@").length > 1) {
                const data = new FormData();
                data.append("username", response.data[i].content.split(
                    "@")[1].split(" ")[0]);
                axios.post("../controllers/getProfilAt.php", data).then(
                    function(ponceres) {
                        const content = "<br>" + response.data[i]
                            .content.split("@")[0] +
                            "<a href='../View/profil.html?id=" +
                            ponceres.data.id + "'>@" + response
                            .data[i].content.split("@")[1].split(
                                " ")[0] + "</a>" + response.data[i]
                            .content.split(response.data[i].content
                                .split("@")[1].split(" ")[0])[1]
                        pauthor.html(content);
                    })
            } else {
                const content = "<br>" + response.data[i].content;
                pauthor.html(content);
            }
            ms2.append(tweetunder);
            tweetunder.append(logo1, logo2, logo3, logo4);
            ms2.append(spanlast);
            $(".rtwt").prepend(middle);
        }
        setTimeout(function() {
            timeline(response.data.length);
        }, 3000);
    })
}
timeline(0);