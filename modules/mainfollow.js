function timeline(x = 0){
axios.post("../controllers/followmain.php")
.then(function (response) {
    for(let i = x; i < response.data.length; i++){
        let imgpath1 = response.data[i].media_1 !== null ? "../model/upload/"+response.data[i].media_1 : null;
        let imgpath2 = response.data[i].media_2 !== null ? "../model/upload/"+response.data[i].media_2 : null;
        let imgpath3 = response.data[i].media_3 !== null ? "../model/upload/"+response.data[i].media_3 : null;
        let imgpath4 = response.data[i].media_4 !== null ? "../model/upload/"+response.data[i].media_4 : null;
        const middle = $("<div>").attr("class", "box-middle, col-11");
        const image = $("<img>").attr("src", "../model/upload/" + response.data[i].profile_picture);
        image.attr("class", "avatar-middle-two");
        image.attr("onclick", "window.location.href = 'profil.html?id=" + response.data[i].id_account_follow+ "'");
        const nameh = $("<span>").attr("class", "name-middle");
        nameh.attr("onclick", "window.location.href = 'profil.html?id=" + response.data[i].id_account_follow+ "'");
        const usernameh = $("<span>").attr("class", "at");
        usernameh.attr("onclick", "window.location.href = 'profil.html?id=" + response.data[i].id_account_follow+ "'");
        usernameh.css("cursor", "pointer");
        const pauthor = $('<span>').attr("class", "author-tweet ms-5");
        const ms2 = $("<div>").attr("class", "ms-2 row");
        const tweetunder = $("<div>").attr("class", "col t-log mx-4");
        tweetunder.css("fill", "white");
        const logo1 = $("<img>").attr("src", "img/com.png");
        logo1.attr("class", "tweet-logo");
        /*$(logo1).attr("onclick", "showComments(this.id, this)");
            const display = $("<div class='row commentfunc'></div>")
            const comment = $("<div class='col-12'></div>")
            const input = $("<input type='text' class='form-control' placeholder='Commenter'>")
            const button = $("<button class='btn btn-primary btncomment'>Commenter</button>")
            comment.append(input, button)
            display.append(comment)*/
        let retweeted = response.data[i].idretweet == "null" ? false : response.data[i].idretweet;
        const logo2 = $("<img>").attr("src", "img/rt.png");
        logo2.attr("class", "tweet-logo");
        logo2.attr("class", "tweet-logo").after("<span class=test>test</span>");
        if (retweeted) {
            logo2.attr("src", "/img/retweet.png");
            logo2.attr("idrt", retweeted)
            logo2.on("click", function(){
                    const data = new FormData();
                    data.append("idrt", retweeted)
                    axios.post("../controllers/unrt.php", data)
                    .then(function(response2){
                    logo2.attr("src", "img/rt.png");
                    logo2.attr("idrt", "");
                    })
            })
        }else{
            logo2.on("click", function() {
                if(logo2.attr("idrt") && logo2.attr("idrt") !== ""){
                        const data = new FormData();
                        data.append("idrt", logo2.attr("idrt"))
                        axios.post("../controllers/unrt.php", data)
                        .then(function(response2){
                        logo2.attr("src", "img/rt.png");
                        logo2.removeAttr("idrt");
                        return;
                })
                return;
                }
                const data = new FormData();
                data.append("id", response.data[i].idtweet);
                axios.post("../controllers/setrt.php", data)
                    .then(function(response) {
                        if (response.data) {
                            logo2.attr("src", "/img/retweet.png");
                            logo2.attr("idrt", response.data)
                        }
                    })
            })
        };
        let liked = response.data[i].idlike == "null" ? false : response.data[i].idlike;
        const logo3 = $("<img>").attr("src", "img/heart.png");
        logo3.attr("class", "tweet-logo").after("<span class=test>test</span>");
        if (liked) {
            logo3.attr("src", "img/heart-fill.png");
            logo3.attr("idlike", liked)
            logo3.on("click", function(){
                    const data = new FormData();
                    data.append("idlike", liked)
                    axios.post("../controllers/unlike.php", data)
                    .then(function(response2){
                    logo3.attr("src", "img/heart.png");
                    logo3.attr("idlike", "");
                    })
            })
        }else{
            logo3.on("click", function() {
                if(logo3.attr("idlike") && logo3.attr("idlike") !== ""){
                        const data = new FormData();
                        data.append("idlike", logo3.attr("idlike"))
                        axios.post("../controllers/unlike.php", data)
                        .then(function(response2){
                        logo3.attr("src", "img/heart.png");
                        logo3.removeAttr("idlike");
                        return;
                })
                return;
                }
                const data = new FormData();
                data.append("id", response.data[i].idtweet);
                axios.post("../controllers/likes.php", data)
                    .then(function(response) {
                        if (response.data) {
                            logo3.attr("src", "img/heart-fill.png");
                            logo3.attr("idlike", response.data)
                        }
                    })
            })
        };
        const logo4 = $("<img>").attr("src", "img/share.png");
        logo4.attr("class", "tweet-logo");
        // const afil = $("<a>").attr("href", "#");
        const spanlast = $("<span>").attr("class", "thread");
        const img1 = imgpath1 !== null ? $("<img>").attr("src", imgpath1) : null;
        const img2 = imgpath2 !== null ? $("<img>").attr("src", imgpath2) : null;
        const img3 = imgpath3 !== null ? $("<img>").attr("src", imgpath3) : null;
        const img4 = imgpath4 !== null ? $("<img>").attr("src", imgpath4) : null;
        img1 !== null ? img1.attr("class", "img-fluid") : null;
        img2 !== null ? img2.attr("class", "img-fluid") : null;
        img3 !== null ? img3.attr("class", "img-fluid") : null;
        img4 !== null ? img4.attr("class", "img-fluid") : null;
        if(img4 !== null){
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
        }else if(img3 !== null){
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
        }else if(img2 !== null){
            let contain21 = $("<div>").attr("class", "col-6");
            let contain22 = $("<div>").attr("class", "col-6");
            contain21.css("overflow", "hidden");
            contain22.css("overflow", "hidden");
            contain21.css("height", "auto");
            contain22.css("height", "auto");
            contain21.append(img1);
            contain22.append(img2);
            ms2.append(contain21, contain22);
        }else if(img1 !== null){
            let contain11 = $("<div>").attr("class", "row");
            contain11.css("overflow", "hidden");
            contain11.css("height", "auto");
            contain11.append(img1);
            ms2.append(contain11);
        }
        spanlast.attr("id", response.data[i].idtweet);
        spanlast.attr("onclick", "showComments(this.id, this)");
        spanlast.text("Montrer ce fil");
        middle.append(image, nameh, usernameh, pauthor, ms2);
        nameh.text(response.data[i].full_name);
        usernameh.text("@" + response.data[i].username);
        if(response.data[i].content.split("@").length > 1){
            const data = new FormData();
            data.append("username", response.data[i].content.split("@")[1].split(" ")[0]);
            axios.post("../controllers/getProfilAt.php", data)
            .then(function(ponceres){
                const content = "<br>" + response.data[i].content.split("@")[0] + "<a href='../View/profil.html?id=" + ponceres.data.id  + "'>@" + response.data[i].content.split("@")[1].split(" ")[0] + "</a>" + response.data[i].content.split(response.data[i].content.split("@")[1].split(" ")[0])[1]
            pauthor.html(content);
            })
        }else{
            const content = "<br>" + response.data[i].content;
        pauthor.html(content);
        }
        ms2.append(tweetunder);
        tweetunder.append(logo1, logo2, logo3, logo4);
        ms2.append(spanlast);
        $(".rtwt").prepend(middle);
    }
    setTimeout(function(){
        timeline(response.data.length);
    } , 3000);
})
}
timeline(0);


axios.post("../controllers/checkconnect.php")
.then(function (response) {
    if(response.data == "Error"){
        window.location.href = "./index.html";
        return;
    }
});
const data = new FormData();
axios.post("../controllers/profil.php", data)
.then(function (response) {
    let val = response.data.length === 2 ? 1 : 0;
    let mois = [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    let datecreation = new Date(response.data[val].creation_date);
    datecreation = mois[datecreation.getMonth()] + " " + datecreation.getFullYear();
    $(".avatar-text").children().remove();
    $(".header-bio-name").text(response.data[val].full_name);
    $(".profil-name").text(response.data[val].full_name);
    $("#username-bio").text("@"+response.data[val].username);
    $(".avatar-text").append("<p>"+response.data[0].full_name+ "<br>" + "@" +response.data[0].username +"</p>");
    $("#datecrea").text("A rejoint Twitter en " + datecreation);
    $(".numbers-tweets")
    if(response.data[val].header !== null)
    $('.header-pics').css('background-image', 'url(../model/upload/' + response.data[val].header + ')');
    if(response.data[val].profile_picture !== null){
    $('#pp-chicken').attr('src', "../model/upload/" + response.data[val].profile_picture);
}
if(response.data[0].profile_picture !== null){
    $(".avatar-middle").addClass("img-fluid");
    $('.avatar-middle').attr('src', "../model/upload/" + response.data[0].profile_picture);
    $('.avatar-min').attr('src', "../model/upload/" + response.data[0].profile_picture); 
    $("#locationaffi").text(response.data[val].location);
    
}else{
    $(".avatar-middle").addClass("img-fluid");
    $('.avatar-middle').attr('src', "/img/pp-chicken.png");
    $('.avatar-min').attr('src', "/img/pp-chicken.png"); 
}
    if($("#locationaffi").text() == "0"){
        $("#locationaffi, .header-date").attr("class", "visually-hidden");
    }
});
$(".text-bannier").on("click", function(){
    if($(".decod").hasClass("d-none")){
        $(".decod").removeClass("d-none");
    }else{
        $(".decod").addClass("d-none");
    }
});

function deletea() {
    var data = new FormData();
    data.append("delete", "delete");
    axios.post("../controllers/delete.php", data)
    .then(function (response){
        if(response.data === "Success"){
            window.location.href = "../View/index.html";
        }
    });
}

function logout () {
    axios.post("../controllers/logout.php")
    .then(function (response){
        if(response.data === "Success"){
            window.location.href = "../View/index.html";
        }
    });
}
