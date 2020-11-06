

//var url_api = "https://app-project3xapi.herokuapp.com/api/v1/index/message";

var url_api = "http://localhost:8080/api/v1/index/message";




$(window).on("load", function () {
    $("#textArea").show();
    $("#img").hide();
});


$(document).ready(function () {
    var $j = jQuery.noConflict();
    $j("#customRadio1").on('change', function () {
        $j("#img").hide();
        $j("#textArea").show();
        $j("#form").removeClass("login-form").addClass("login-form-area");
        $j("#cicle").removeClass("cicle").addClass("cicle-area");
    });
});

$(document).ready(function () {
    var $j = jQuery.noConflict();
    $j("#customRadio2").on('change', function () {
        $j("#textArea").hide();
        $j("#img").show();
        $j("#form").removeClass("login-form-area").addClass("login-form");
        $j("#cicle").removeClass("cicle-area").addClass("cicle");
    });
});


$(document).on("input", ".contador", function () {
    var limite = 80;
    var caracteresDigitados = $(this).val().length;
    var caracteresRestantes = limite - caracteresDigitados;

    $(".caracteres").text(caracteresRestantes);
});



// Variable to hold request
var request;
$(document).ready(function () {

    // Bind to the submit event of our form
    $("form").submit(function (event) {

        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        // Abort any pending request
        if (request) {
            request.abort();
        }

        var data = JSON.stringify(createObj());

        console.log(data);

        request = $.ajax({
            url: url_api,
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            data: data
        });


        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR) {
            // Log a message to the console
            console.log("Hooray, it worked!");
        });

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown) {
            // Log the error to the console
            console.error(
                "The following error occurred: " +
                textStatus, errorThrown
            );
        });


        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs

        });


    });

});



function createObj() {

    var obj = {};

    obj.name = $("#name").val();
    obj.type = $("input[name='customRadio']:checked").val();

    if (obj.type == "image") {
        
        var selectImage = $("input[name='customRadioImg']:checked").val();

        obj.content = selectImage;

    } else {
        obj.content = $("#messagem").val();
    }


    return obj;
}
