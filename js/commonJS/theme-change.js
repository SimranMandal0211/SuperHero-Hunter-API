// --------------------Theme Changing-----------------------
    // Retrieve the necessary elements
    const body = $("body");
    const toggleButton = $(".dl-toggler");
    const toggleIcon = $("#toggleIcon");
    const toggleImage = $("#toggleImage");

    let isImage = true;

    // Add event listener to the toggle button
    toggleButton.on("click", function(){

        toggleIcon.toggleClass("fa-moon fa-sun");

        body.toggleClass("dark light");
        $("header").toggleClass("dark light");
        $("header h1").toggleClass("dark light");

        $(".nav-buttons a").toggleClass("dark light");
        $("#button2").toggleClass("dark light");

        $(".main").toggleClass("dark light");
        $(".search-bar").toggleClass("dark light");
        $(".search-bar .search-icon").toggleClass("dark light");
        $(".search-bar .search-bar-text").toggleClass("dark light");
        
        $(".add-to-fav-btn").toggleClass("dark light");
        $(".fav-btns-bg").toggleClass("dark light");

        

        // toggle Image
        if(isImage){
            toggleImage.attr("src", "./images/darkBg.jpg");
            toggleImage.attr("alt", "darkHeros");
            isImage = false;
        }else{
            toggleImage.attr("src", "./images/lightBg.jpg");
            toggleImage.attr("alt", "lightHeros");
            isImage = true;
        }
    });