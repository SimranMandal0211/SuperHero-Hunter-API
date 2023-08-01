// Selecting the elements from the DOM
let info = document.getElementById('info-container');
let title = document.getElementById('page-title');

// getting the heroInfo object which was stored when the user clicked on more info
let heroInfo = JSON.parse(localStorage.getItem("heroInfo"));

// Changing the title of the page according to the characters name
title.innerHTML = heroInfo.name + " | SH";

window.addEventListener("load", function () {
    // getting the favouritesCharacterIDs for displaying the appropriate button accoring to the existance of character in favourites
    let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
    if (favouritesCharacterIDs == null) {
        favouritesCharacterIDs = new Map();
    } else if (favouritesCharacterIDs != null) {
        favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
    }

    // adding the information into DOM 
    info.innerHTML =`
        <div class="hero-name">${heroInfo.name}</div>
        <div class="flex w90 hero-img-and-more-info">
            <img id="portraitImage" class="hero-img" src="${heroInfo.portraitImage}" alt="">

            <img style="display:none;" id="landscapeImage" src="${heroInfo.landscapeImage}" alt="">

            <div class="more-info">
                <div class="id">
                    <b>ID:</b><span>${heroInfo.id}</span>
                </div>
                <div class="comics">
                    <b>Comics:</b><span>${heroInfo.comics}</span>
                </div>
                <div class="series">
                    <b>Series:</b><span>${heroInfo.series}</span>
                </div>
                <div class="stories">
                    <b>Stories:</b><span>${heroInfo.stories}</span>
                </div>
            </div>
        </div>
        <div class="w90 hero-discription">
            <b>Discription:</b>
            <p>${heroInfo.description != "" ? heroInfo.description : "No Description Available"}</p>
        </div>
        <div style="display:none;">
            <span>${heroInfo.name}</span>
            <span>${heroInfo.portraitImage}</span>
            <span>${heroInfo.landscapeImage}</span>
            <span>${heroInfo.id}</span>
            <span>${heroInfo.comics}</span>
            <span>${heroInfo.series}</span>
            <span>${heroInfo.stories}</span>
            <span>${heroInfo.squareImage}</span>
            <span>${heroInfo.description}</span>
        </div>
        <button class="btn w90 add-to-fav-btn">
            ${favouritesCharacterIDs.has(`${heroInfo.id}`) ? 
                "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" :
                "<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites"
            }
        </button>
    `
    // Calling the function so that event is added
    addEvent();
});


// Changing the character image based on the different screen sizes 
// landscape image for small screen size and potrait image for bigger screen sizes
window.addEventListener('resize', function () {
    let portraitImage = document.getElementById('portraitImage');
    let landscapeImage = document.getElementById('landscapeImage');

    if (document.body.clientWidth < 678) {
         portraitImage.style.display = "none";
         landscapeImage.style.display = "block";
    } else {
         landscapeImage.style.display = "none";
         portraitImage.style.display = "block";
    }
});

// this function would run after content of the page is loaded
function addEvent() {
    let favouriteButton = document.querySelector('.add-to-fav-btn');
    favouriteButton.addEventListener("click", addToFavourites);
}

