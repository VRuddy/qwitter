$("button[name=btn-inscription-valid]").on("click", function() {
    const data = new FormData();
    let date = $("select[name=annees]").val() + ":" + $(
            "select[name=mois]").val() + ":" + $("select[name=jours]")
        .val();
    data.append("fullname", $("input[name=fullname]").val());
    data.append("email", $("input[name=email]").val());
    data.append("password", $("input[name=password]").val());
    data.append("username", $("input[name=username]").val());
    data.append("birthdate", date);
    axios.post("../controllers/inscription_to_db.php", data).then(
        function(response) {
            if (response.data === "Success") {
                $(".zindex2 .input, .zindex2 select").val("");
                $(".zindex2").addClass("visually-hidden");
                $(".zindex3 .input").val("");
                $(".zindex3 button[name=btn-inscription-valid]")
                    .attr("disabled", "disabled");
                $(".zindex3").addClass("visually-hidden");
            } else {
                console.log(response.data);
            }
        });
});