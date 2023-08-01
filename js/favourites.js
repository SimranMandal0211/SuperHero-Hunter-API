// Selecting the card container from the DOM
let cardContainer = document.getElementById('cards-container');


// Event listener attached to dom which is executed when the page is loaded
window.addEventListener("load", function () {
    // Getting the favourites array fom localStorage
    let favourites = localStorage.getItem("favouriteCharacters");

    // if favourites is null the we display nothing and return from there 
    if (favourites == null) {
        cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>"
        return;
    }
    // if NOT NULL the paring it to convert it to array
    else {
        favourites = JSON.parse(this.localStorage.getItem("favouriteCharacters"));
    }

    // if all the characters are deleted from favourites and not character left for displaying
    if (favourites.length == 0) {
        cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>";
        return;
    }

    cardContainer.innerHTML = "";
    // console.log(favourites)
    favourites.forEach(character => {
        // console.log(character);
        cardContainer.innerHTML += `
            <div class="flex card">
                <img src="${character.squareImage}" alt="">
                <span class="name">${character.name}</span>
                <span class="id">Id : ${character.id}</span>
                <span class="comics">Comics : ${character.comics}</span>
                <span class="series">Series : ${character.series}</span>
                <span class="stories">Stories : ${character.stories}</span>
                <a class="character-info" href="./more-info.html">
                    <i class="fa-solid fa-circle-info"></i> &nbsp; More Info
                </a>
                <div style="display:none;">
                    <span>${character.id}</span>
                    <span>${character.name}</span>
                    <span>${character.comics}</span>
                    <span>${character.series}</span>
                    <span>${character.stories}</span>
                    <span>${character.description}</span>
                    <span>${character.landscapeImage}</span>
                    <span>${character.portraitImage}</span>
                    <span>${character.squareImage}</span>
                </div>
                <button class="remove-btn">
                    <i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites
                </button>
            </div>
        `;
    });

     // Adding the appropritate events to the buttons after they are inserted in dom 
     addingEvent();
});


// Function for attacthing eventListener to buttons
function addingEvent() {
    let removeBtn = document.querySelectorAll(".remove-btn");
    removeBtn.forEach((btn) => btn.addEventListener("click", removeCharacterFromFavourites))

    let characterInfo = document.querySelectorAll(".character-info");
    characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage));
}


function removeCharacterFromFavourites() { 
    // Storing the Id of character in a voriable
    let idOfCharacterToBeDeleted = this.parentElement.children[2].innerHTML.substring(5);

    // getting the favourites array which stores objects of character  
    let favourites = JSON.parse(localStorage.getItem("favouriteCharacters"));
    // favouritesCharacterIDs is taken from localStorage for deleting the ID of the character which is deleted from favourites
    let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
    // deleting the characters id from favouritesCharacterId map
    favouritesCharacterIDs.delete(`${idOfCharacterToBeDeleted}`);


    // deleting the character form array whose id is matched 
    favourites.forEach(function (favourite, index) {
         if (favourite.id == idOfCharacterToBeDeleted) {
              // console.log(favourite)
              favourites.splice(index, 1);
         }
    });

    // if all the characters are deleted from favourites and not character left for displaying
    if (favourites.length == 0) {
         cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>";
    }
    // console.log(favourites);

    // Updating the new arrays in localStorage
    localStorage.setItem("favouriteCharacters", JSON.stringify(favourites));
    localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));

    // Removing the element from DOM
    this.parentElement.remove();

    // displaying the "Removed from favourites" toast in DOM
    document.querySelector(".remove-toast").setAttribute("data-visiblity", "show");
    // Removing the "Removed from favourites" toast form DOM
    setTimeout(function () {
         document.querySelector(".remove-toast").setAttribute("data-visiblity", "hide");
    }, 1000);
}
