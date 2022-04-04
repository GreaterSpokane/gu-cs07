$(window).on('load', () => {
    console.log("Authorized user login window loaded successfully");

    $('#back').on('click', function() {
        /**
         * Back button callback for redirecting to index page 
         */

        console.log("Leaving authorized user sign-in page ..");
        $(window).attr('location', 'index');
    });

    $("#login").on('click', function() {
        /**
         * Login button callback for authenticating the password
         */

        let user = $("#username").val();
        let pass = $("#password").val();
        let hashPass = saltHashPassword(pass);
        console.log("Attempting to log user " + user + " in the application with password " + pass);
        console.log(hashPass);
        const response = fetch("/login/", {
                method: "POST",
                body: JSON.stringify({
                    hashpass: hashPass
                })
            })
            .then(response => response.json())
            .then(json => {
                //  Display error message if one exists
            })

    })
});