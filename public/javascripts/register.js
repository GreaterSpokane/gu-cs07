$(document).ready(async() => {
    console.log("Register authorized user window loaded successfully");

    $('#back').on('click', async() => {
        /**
         * Back button callback for redirecting to login page 
         */

        console.log("Leaving register user page ..");
        $(window).attr('location', 'login');
    });

    $("#register").on('click', async() => {
        /**
         * Login button callback for authenticating the password
         */
        var user = $("#username").val();
        var pass = $("#password").val();
        await fetch("/register", {
                method: "POST",
                body: JSON.stringify({ username: user, password: pass })
            })
            .then(response => response.json())
            .then(json => {
                //  Display error message if one exists
                console.log(json);
            });
    })
})