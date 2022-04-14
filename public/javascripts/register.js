$(document).ready(async() => {
    console.log("Register authorized user window loaded successfully");

    $('#back').on('click', async() => {
        /**
         * Back button callback for redirecting to login page 
         */

        console.log("Leaving register user page ..");
        $(window).attr('location', 'login');
    });
})