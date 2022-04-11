$(document).ready(async() => {
    console.log("Authorized user login window loaded successfully");

    $('#back').on('click', async() => {
        /**
         * Back button callback for redirecting to index page 
         */

        console.log("Leaving authorized user sign-in page ..");
        $(window).attr('location', 'index');
    });

    $("#login").on('click', async() => {
        /**
         * Login button callback for authenticating the password
         */

        var user = $("#username").val();
        var pass = $("#password").val();
        await fetch("/login", {
                method: "POST",
                body: JSON.stringify({ 'username': user, 'password': pass })
            })
            .then(response => console.log(response));
    })
})