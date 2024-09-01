function showComments(idtweet, elem) {
    if ($(".commentfunc").length !== 0) {
        $(".commentfunc").remove();
        return;
    }
    const display = $("<div class='row commentfunc'></div>");
    const comment = $("<div class='col-12'></div>");
    const input = $(
        "<input type='text' class='form-control' placeholder='Commenter'>"
    );
    const button = $(
        "<button class='btn btn-primary btncomment'>Commenter</button>"
    );
    comment.append(input, button);
    display.append(comment);
    $(elem).parent().append(display);
    const data = new FormData();
    data.append("idtweet", idtweet);
    axios.post("../controllers/getcomments.php", data).then(function (response) {
        if (response.data === "No comments") {
            return;
        }
        let i = 0;
        for (i = i; i < response.data.length; i += 1) {
            const comment1 = $("<div class='col-12'></div>");
            const rowcomment = $("<div class='row'></div>");
            const imagecontain = $("<div class='col-2'></div>");
            const image = $(
                "<img class='img-fluid rounded-circle' src='http://145.239.142.113:34567/" +
                response.data[i].profile_picture +
                "' width='40' height='40'>"
            );
            const infoscontain = $("<div class='col-10'></div>");
            const nameh = $("<h6 class='mt-2'></h6>");
            const usernameh = $("<h6 class='mt-2'></h6>");
            const pauthor = $("<p class='mt-2'></p>");
            const ms2 = $("<div class='row'></div>");
            comment1.append(rowcomment);
            rowcomment.append(imagecontain, infoscontain);
            imagecontain.append(image);
            infoscontain.append(nameh, usernameh);
            nameh.text(response.data[i].full_name);
            usernameh.text("@" + response.data[i].username);
            pauthor.text(response.data[i].content);
            comment1.append(ms2);
            ms2.append(pauthor);
            $(".commentfunc").append(comment1);
        }
    });
    $(".btn-primary").on("click", function () {
        if ($(".form-control").val() === "") {
            return;
        }
        const data1 = new FormData();
        data1.append("idtweet", idtweet);
        data1.append("comment", $(".form-control").val());
        axios.post("../controllers/comment.php", data1).then(function (
            response
        ) {
            if (response.data === "Success") {
                $(".form-control").val("");
                $(".commentfunc").remove();
            }
        });
    });
}