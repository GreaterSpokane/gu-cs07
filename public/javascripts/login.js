$(window).on('load', () => {
    console.log("Authorized user login window loaded successfully");

    $('#clear').on('click', function() {
        //  Clear button callback for erasing all user input
        console.log("Cleared login window input");
        $("#username").val("");
        $("#password").val("");
    });

    $('#back').on('click', function() {
        //  Back button callback for redirecting to index page
        console.log("Leaving authorized user sign-in page ..");
        $(window).attr('location', 'index');
    })
});