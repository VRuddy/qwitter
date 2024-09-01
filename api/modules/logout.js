$(".tweets").on("click", function() {
    axios.post("../controllers/logout.php").then(function(response) {
        if (response.data === "Success") {
            window.location.href = "../View/index.html";
        }
    });
});