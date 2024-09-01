
$("input").on("change", function() {
    const elem = $(this);
    if (elem.val()) {
        elem.addClass("full");
    }else if(!elem.val()){
        elem.removeClass("full");
    }
});
$("#inscription").on("click", function(){
    if($(".zindex2").hasClass("visually-hidden")){
        $(".zindex2").removeClass("visually-hidden");
    }else{
        $(".zindex2").addClass("visually-hidden");
    }
});
$(".fa-x").on("click", function(){
    $(".zindex2").addClass("visually-hidden");
});

function verifullname(){
    if($("input[name=fullname]").val().length <= 50){
        return (true);
    }else{
        return ( false);
    }
}
var emailverify = false;
$("input[name=email]").on("change", function() {
    const elem = $(this);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(elem.val())) {
        elem.parent().removeClass("error");
        return (emailverify = true);
    }else{
        if(elem.parent().hasClass("error")){
        }
        else{
        elem.parent().addClass("error");
        }
        $("input[name=fullname]").addClass("full");
        return (emailverify = false);
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
});

const verifage = () => {
    if($(".zindex4").hasClass("visually-hidden")){
    }else{
        return;
    }
    const jour = $("select[name=jours]").val();
    const mois = $("select[name=mois]").val();
    const annee = $("select[name=annees]").val();
    if(jour.length !== 0 && mois.length !== 0 && annee.length !== 0){
    const date = mois+ "-" + jour + "-" + annee;
    if(date.length !== ""){
        const birtdate = new Date(date);
        const today = new Date();
        let age = new Date(today- birtdate);
        age = age.getFullYear() - 1970;
        if(age >= 13){
        return true;
        }else{
        return false;
        }
    }
    }
};
$(".input").on("change", function(){
    if(verifage() && emailverify && verifullname()){
        $(".zindex2 .btnconnexion").removeClass("disabled");
    }else{
        $(".zindex2 .btnconnexion").addClass("disabled");
    }
});

$(".zindex2 .btnconnexion").on("click", function(){
    if(!$(this).hasClass("disabled")){
        $(".zindex2").addClass("visually-hidden");
        $(".zindex3").removeClass("visually-hidden");
    }
});

$(".zindex3 .input").on("input", function(){
    if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test($("input[name=password]").val()) && $("input[name=password]").val() === $("input[name=password2]").val() && $("input[name=username]").val().length >= 3 && $("input[name=username]").val().length <= 50 && $("input[name=username]").val().includes(" ") == false){
        $("input[name=username]").parent().removeClass("error");
        $("input[name=password2], input[name=password]").parent().removeClass("error");
        $(".zindex3 .btnconnexion").removeClass("disabled");
        $(".zindex3 .btnconnexion").removeClass("d-none");
    }else if ($("input[name=password]").val() !== $("input[name=password2]").val()){
        $("input[name=password2], input[name=password]").parent().addClass("error");
        $(".zindex3 .btnconnexion").addClass("disabled");
        $(".zindex3 .btnconnexion").addClass("d-none");
    }else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test($("input[name=password]").val())){
        $("input[name=password2], input[name=password]").parent().addClass("error");
        $(".zindex3 .btnconnexion").addClass("disabled");
        $(".zindex3 .btnconnexion").addClass("d-none");
    }else if($("input[name=username]").val().length < 3 || $("input[name=username]").val().length > 50 || $("input[name=username]").val().includes(" ") === true){
        $("input[name=username]").parent().addClass("error");
        $(".zindex3 .btnconnexion").addClass("disabled");
        $(".zindex3 .btnconnexion").addClass("d-none");
    }
    if($("input[name=username]").val().includes(" ") == true){
        $("input[name=username]").parent().addClass("error");
        $(".zindex3 .btnconnexion").addClass("disabled");
        $(".zindex3 .btnconnexion").addClass("d-none");
    }
});

$(".zindex3 .fa-arrow-left").on("click", function(){
    $(".zindex3").addClass("visually-hidden");
    $(".zindex2").removeClass("visually-hidden");
}
);

$("#connexion").on("click", function(){
    $(".zindex4").removeClass("visually-hidden");
});
$(".zindex4 .fa-x").on("click", function(){
    $(".zindex4").addClass("visually-hidden");
}); 

$(".zindex4 .input").on("change", function(){
    if($("input[name=email2]").val() && $("input[name=password3]").val()){
        $(".zindex4 .btnconnexion").removeClass("disabled");
    }else{
        $(".zindex4 .btnconnexion").addClass("disabled");
    }
});
$(".searchbar-control-main").on("focus", function() {
    $(".loupe").css("fill", "pink");
});
$(".searchbar-control-main").on("focusout", function() {
    $(".loupe").css("fill", "black");
});




function deletea() {
    var data = new FormData();
    data.append("delete");
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
