$(document).ready(async() => {
    console.log("Authorized user login window loaded successfully");

    $('#back').on('click', async() => {
        /**
         * Back button callback for redirecting to index page 
         */

        console.log("Leaving authorized user sign-in page ..");
        $(window).attr('location', 'index');
    });
})