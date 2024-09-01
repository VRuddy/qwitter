$("button[name=btn-connexion-valid]").on("click", function () {
    const data1 = new FormData();
    data1.append("email", $("input[name=email2]").val());
    data1.append("password", $("input[name=password3]").val());
    axios.post("../controllers/connexion.php", data1).then(function (response) {
        if (response.data === "Success") {
            window.location.href = "../View/main.html";
        } else {
            console.log(response.data);
        }
    });
});