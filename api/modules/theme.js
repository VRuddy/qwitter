const toggle = document.getElementById("toggleDark");
const body = document.querySelector("body");
const search = document.querySelector(".searchbar-control-main");
const sliderOne = document.querySelector(".slider-right-main");
const sliderTwo = document.querySelector(".slider-right-main-two");
const profilSlider = document.querySelector(".slider-right-profil");
const profilSliderTwo = document.querySelector(".slider-right-profil-two");
const tendances = (document.querySelectorAll(
    "body > div > div > div:nth-child(3) > div.slider-right-profil-two > button"
));
const number = document.querySelector(".numbers-follow");
const numbertwo = document.querySelector(".numbers-followers");
const happening = document.querySelector(".happening");
const cat = document.querySelector(".t-category");
const follow = document.querySelector(".happening2");
const msg = document.querySelector(".message");
const txtmsg = document.querySelector(".txt-msg");
const nav = document.querySelector(".text-black");
const send = document.querySelector(".send");
const inputmsg = document.querySelector(".inputmsg");
const forminscription = document.querySelector(".form-inscription");
const divmsg = document.querySelector(".message-page")

if (localStorage.getItem("theme") === "light") {
    localStorage.setItem("theme", "light");
    if ($(".search-containdark")) {
        $(".search-containdark").addClass("search-contain");
        $(".search-contain").removeClass("search-containdark");
    }
    if (forminscription) {
        $(".form-inscription * ").css("color", "#333");
        $(".form-inscription * ").css("background-color", "white");
        $(".form-inscription").css("background-color", "white");
        $(".form-inscription textarea").css("border", "#ccc 1px solid");
        $(".form-inscription textarea").css("border-radius", "3px");
    }
    $(".p-1").addClass("text-black");
    toggle.classList.add("ri-moon-fill");
    body.style.background = "#242423";
    body.style.background = "white";
    body.style.color = "#333";
    if(happening)
    happening.style.color = "#333";
    if(search){

        search.style.background = "#e9ecef";
        search.style.borderColor = "#EBEEF0";
    }
    if ($("fa-x")) {
        $("fa-x").css("fill", "#333");
    }
    if (sliderOne) {
        follow.style.color = "#333";
        sliderOne.style.background = "#e9ecef";
        sliderOne.style.borderColor = "#EBEEF0";
        sliderTwo.style.background = "#e9ecef";
        sliderTwo.style.borderColor = "#EBEEF0";
        sliderOne.style.transition = "2s";
        sliderTwo.style.transition = "2s";
    }
    if (msg) {
        msg.style.background = "#e9ecef";
        msg.style.borderColor = "#EBEEF0";
        msg.transition = "2s";
        txtmsg.style.color = "#333";
    }
    nav.style.color = "#333";
    if (happening)
    happening.style.transition = "2s";
    if(search)
    search.style.transition = "2s";
    body.style.transition = "2s";
} else {
    localStorage.setItem("theme", "dark");
    $(".t-log").css("fill", "white");
    if (search.classList.contains("search-contain")) {
        search.classList.add("search-containdark");
        search.classList.remove("search-contain");
    }
    if (forminscription) {
        $(".form-inscription * ").css("color", "white");
        $(".form-inscription * ").css("background-color", "#333");
        $(".form-inscription").css("background-color", "#333");
        $(".form-inscription textarea").css("border", "#ccc 1px solid");
        $(".form-inscription textarea").css("border-radius", "3px");
    }
    if ($(".followedzindex")) {
        $(".followedrindex *").css("background-color", "black !important");
        $(".followedzindex *").css("background-color", "black !important");
    }
    $(".colorsvg").css("fill", "white");
    $(".p-1").removeClass("text-black");
    $(".p-1").addClass("text-white");
    toggle.classList.remove("ri-moon-fill");
    toggle.classList.add("ri-sun-line");
    document.cookie = "theme=dark; path=/;";
    body.style.background = "#242423";
    body.style.color = "white";
    search.style.background = "#333";
    search.style.borderColor = "#333";
    if(inputmsg){
        inputmsg.style.background = "#333";
        inputmsg.style.borderColor = "#333";
    }
    if (divmsg)
    divmsg.style.background = "#333";
    if (number) {
      number.style.color = "#dee2e6";
      numbertwo.style.color = "#dee2e6";
    }
    if (sliderOne) {
        happening.style.color = "#dee2e6";
        happening.style.transition = "2s";
        follow.style.transition = "2s";
        follow.style.color = "#dee2e6";
        sliderOne.style.background = "#333";
        sliderOne.style.borderColor = "#333";
        sliderTwo.style.background = "#333";
        sliderTwo.style.borderColor = "#333";
        sliderOne.style.transition = "2s";
        sliderTwo.style.transition = "2s";
        follow.style.transition = "2s";
    }
    if (msg) {
        msg.style.background = "#333";
        msg.style.borderColor = "#343a40";
        msg.transition = "2s";
        txtmsg.style.color = "white";
    }
    nav.style.color = "#dee2e6";
    body.style.transition = "2s";
}
toggle.addEventListener("click", function () {
    this.classList.toggle("ri-sun-line");
    if (this.classList.toggle("ri-moon-fill")) {
        localStorage.setItem("theme", "light");
        if ($(".search-containdark")) {
            $(".search-containdark").addClass("search-contain");
            $(".search-contain").removeClass("search-containdark");
        }
        $(".colorsvg").css("fill", "black");
        document.cookie = "theme=light; path=/;";
        if ($("fa-x")) {
            $("fa-x").css("fill", "#333");
        }
        $(".p-1").removeClass("text-white");
        $(".p-1").addClass("text-black");
        body.style.background = "white";
        body.style.color = "#333";
        if (happening){
            happening.style.color = "#333";
        }
        if (follow) {
            follow.style.color = "#333";
        }
        if (txtmsg) {
            txtmsg.style.color = "#333";
        }
        if (search) {
            search.style.background = "#e9ecef";
            search.style.borderColor = "#EBEEF0";
        }
        if (sliderOne) {
            sliderOne.style.background = "#e9ecef";
            sliderOne.style.borderColor = "#EBEEF0";
            sliderTwo.style.background = "#e9ecef";
            sliderTwo.style.borderColor = "#EBEEF0";
        }
        if (msg) {
            msg.style.background = "#e9ecef";
            msg.style.borderColor = "#EBEEF0";
        }
        nav.style.color = "#333";
        if(happening){
            happening.style.transition = "2s";
        }
        if (follow) {
            follow.style.transition = "2s";
        }
        if (search) {
            search.style.transition = "2s";
        }
        if (sliderOne) {
            sliderOne.style.transition = "2s";
            sliderTwo.style.transition = "2s";
        }
        if (msg) {
            msg.transition = "2s";
            body.style.transition = "2s";
        } else {
            localStorage.setItem("theme", "dark");
            $(".colorsvg").css("fill", "white");
            $(".p-1").removeClass("text-black");
            $(".p-1").addClass("text-white");
            if ($(".search-contain")) {
                $(".search-contain").addClass("search-containdark");
                $(".search-containdark").removeClass("search-contain");
            }
            document.cookie = "theme=dark; path=/;";
            body.style.background = "#242423";
            body.style.color = "white";
            search.style.background = "#333";
            search.style.borderColor = "#333";
            if (inputmsg) {
                inputmsg.style.background = "#333";
                inputmsg.style.borderColor = "#333";
            }
            if ($("fa-x")) {
                $("fa-x").css("color", "#333");
            }
            if ($(".followedzindex")) {
                $(".followedzindex *").css("background-color", "black !important");
                $(".followedrindex *").css("background-color", "black !important");
            }
            if (number) {
                number.style.color = "#dee2e6";
                numbertwo.style.color = "#dee2e6";
            }
            if (sliderOne) {
                happening.style.color = "#dee2e6";
                happening.style.transition = "2s";
                sliderOne.style.background = "#333";
                sliderOne.style.borderColor = "#333";
                sliderTwo.style.background = "#333";
                sliderTwo.style.borderColor = "#333";
                sliderOne.style.transition = "2s";
                sliderTwo.style.transition = "2s";
                follow.style.color = "#dee2e6";
                follow.style.transition = "2s";
            }
            if (msg) {
                msg.style.background = "#333";
                msg.style.borderColor = "#343a40";
                msg.transition = "2s";
                txtmsg.style.color = "white";
            }
            if (profilSlider) {
                profilSlider.style.background = "#333";
                profilSliderTwo.style.background = "#333";
                profilSlider.style.borderColor = "#343a40";
                profilSliderTwo.style.borderColor = "#343a40";
                profilSlider.transition = "2s";
                profilSliderTwo.transition = "2s";
                if (tendances[0]) {
                    tendances[0].style.background = "#333";
                    tendances[1].style.background = "#333";
                    tendances[2].style.background = "#333";
                    tendances[3].style.background = "#333";
                }
                cat.style.color = "white";
            }
            nav.style.color = "#dee2e6";
            search.style.transition = "2s";
            body.style.transition = "2s";
            if (send) {
                send.style.background = "#333";
            }
        }
    }
});