$(document).ready(function() {


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




// -----------------------Selecting the element from DOM-----------------------

    let searchBarInput = document.getElementById('search-bar-input');
    let searchResult = document.getElementById('search-result');

    // Adding eventListener to search bar
    searchBarInput.addEventListener("input", (e) => {
        e.preventDefault();
        searchHeros(searchBarInput.value)
    });

    // function for API call
    async function searchHeros(textSearched){
        // public key---> 2d498890403133a04816924bfb353e1a
        // private key --> 16c333043f5456bd74998aa52a945cfe63bfa379

        if(textSearched.length == 0){
            searchResult.innerHTML = ``;
            return;
        }

        // API call to get the data
        await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearched}&ts=1&apikey=2d498890403133a04816924bfb353e1a&hash=b852511c68e2955c6e14cd4e24b4f517`)
            .then(res => res.json())
            .then(data => showSearchResults(data.data.results))       //sending the searched results characters to show in HTML 
    }

    // Function for displaying the searched results in DOM
    // An array is accepted as argument 
    // SearchHero is the array of objects which matches the string entered in the searched bar

    function showSearchResults(searchHero){

        // IDs of the character which are added in the favourites 
        // Used for displaying the appropriate button in search results i.e
        // if the id exist in this array then we display "Remove from favourites" button otherwise we display "Add to favourites button"
        // favouritesCharacterIDs is a map which contains id of character as key and true as value
        
        let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
        if(favouritesCharacterIDs == null){
            favouritesCharacterIDs = new Map();
        }
        else if(favouritesCharacterIDs != null){
            favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
        }

        searchResult.innerHTML = ``;
        // count is used to count the result displayed in DOM
        let count = 1;

        for(const key in searchHero){
            if (count <= 5) {
                // hero is the object that we get from API
                let hero = searchHero[key];
                searchResult.innerHTML += `
                    <li class="single-search-result flex">
                        <div class="img-info flex">
                            <img src="${hero.thumbnail.path+'/portrait_medium.' + hero.thumbnail.extension}" alt="">
                            <div class="hero-info">
                                <a class="character-info" href="./more-info.html">
                                        <span class="hero-name">${hero.name}</span>
                                </a>
                            </div>
                        </div>

                        <div class="search-buttons">
                            <button class="add-to-fav-btn">
                            ${favouritesCharacterIDs.has(`${hero.id}`) ? '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites' :'<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites'}
                            </button>
                        </div>

                        <div style="display:none;">
                            <span>${hero.name}</span>
                            <span>${hero.description}</span>
                            <span>${hero.comics.available}</span>
                            <span>${hero.series.available}</span>
                            <span>${hero.stories.available}</span>
                            <span>${hero.thumbnail.path+'/portrait_uncanny.' + hero.thumbnail.extension}</span>
                            <span>${hero.id}</span>
                            <span>${hero.thumbnail.path+'/landscape_incredible.' + hero.thumbnail.extension}</span>
                            <span>${hero.thumbnail.path+'/standard_fantastic.' + hero.thumbnail.extension}</span>
                        </div>
                    </li>
                `;
        }
        count++;
        }
        // Adding the appropritate events to the buttons after they are inserted in dom
        events();
    }

    // Function for attacthing eventListener to buttons
    function events() {
        let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
        favouriteButton.forEach((btn) => btn.addEventListener("click", addToFavourites));   

        let characterInfo = document.querySelectorAll(".character-info");
        characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage));
    }

    // Function invoked when "Add to Favourites" button or "Remvove from favourites" button is click appropriate action is taken accoring to the button clicked
    function addToFavourites(){
        let self = this;
        console.log('Add to Fav: ',self.textContent.trim());
        if(self.textContent.trim() === 'Add to Favourites'){

            // We cretate a new object containg revelent info of hero and push it into favouritesArray
            let heroInfo = {
                name: this.parentElement.parentElement.children[2].children[0].innerHTML,
                description: this.parentElement.parentElement.children[2].children[1].innerHTML,
                comics: this.parentElement.parentElement.children[2].children[2].innerHTML,
                series: this.parentElement.parentElement.children[2].children[3].innerHTML,
                stories: this.parentElement.parentElement.children[2].children[4].innerHTML,
                portraitImage: this.parentElement.parentElement.children[2].children[5].innerHTML,
                id: this.parentElement.parentElement.children[2].children[6].innerHTML,
                landscapeImage: this.parentElement.parentElement.children[2].children[7].innerHTML,
                squareImage: this.parentElement.parentElement.children[2].children[8].innerHTML
            }

            console.log('hero name:: ',heroInfo.name)
            // getting the favourites array which stores objects of character  
            // We get null is no such array is created earlier i.e user is running the website for the first time
            let favouritesArray = localStorage.getItem("favouriteCharacters");

            if(favouritesArray == null){
                favouritesArray = [];
            }else{
                // if it is not null then we parse so that it becomes an array 
                favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
            }

            // favouritesCharacterIDs is taken from localStorage for adding ID of the character which is added in favourites
            // It is created because when we search for the characters which is already added in favourites we check that if the id of the character exist in this array then we display "Remove form favourites" insted of "Add to favourites"
            
            let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

            if (favouritesCharacterIDs == null) {
                favouritesCharacterIDs = new Map();
            } else {
                favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
            }

            // again setting the new favouritesCharacterIDs array to localStorage
            favouritesCharacterIDs.set(heroInfo.id, true);
            // adding the above created heroInfo object to favouritesArray
            favouritesArray.push(heroInfo);

            // Storing the new favouritesCharactersID map to localStorage after converting to string
            localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
            // Setting the new favouritesCharacters array which now has the new character 
            localStorage.setItem("favouriteCharacters", JSON.stringify(favouritesArray));

            // Convering the "Add to Favourites" button to "Remove from Favourites"
            self.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';
            
            // Displaying the "Added to Favourites" toast to DOM
            document.querySelector(".fav-toast").removeAttribute("hidden");
            // Deleting the "Added to Favourites" toast from DOM after 1 seconds
            setTimeout(function(){
                document.querySelector(".fav-toast").setAttribute("hidden", "");
            },1000);

        }

        // For removing the character form favourites array
        else{
            // storing the id of character in a variable 
            let idOfCharacterToBeRemoveFromFavourites = this.parentElement.parentElement.children[2].children[6].innerHTML;

            // getting the favourites array from localStorage for removing the character object which is to be removed
            let favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
            
            // getting the favaourites character ids array for deleting the character id from favouritesCharacterIDs also
            let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
            
            // will contain the characters which should be present after the deletion of the character to be removed
            let newFavouritesArray = [];

            // deleting the character from map using delete function where id of character acts as key
            favouritesCharacterIDs.delete(`${idOfCharacterToBeRemoveFromFavourites}`); 

            favouritesArray.forEach((favourite) => {
                // if the id of the character doesn't matches the favourite (i.e a favourite character) then we append it in newFavourites array 
                if(idOfCharacterToBeRemoveFromFavourites != favourite.id){
                        newFavouritesArray.push(favourite);
                }
            });

            console.log('remove fav');
            console.log(newFavouritesArray);
        
            // Updating the new array in localStorage
            localStorage.setItem("favouriteCharacters",JSON.stringify(newFavouritesArray));
            localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
            
            // Convering the "Remove from Favourites" button to "Add to Favourites" 
            self.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';
            
            // Displaying the "Remove from Favourites" toast to DOM
            document.querySelector(".remove-toast").removeAttribute("hidden");            
            // Deleting the "Remove from Favourites" toast from DOM after 1 seconds
            setTimeout(function(){
                document.querySelector(".remove-toast").setAttribute("hidden", "");

            },1000);

        }
    }


    function addInfoInLocalStorage(){
        // This function basically stores the data of character in localStorage.
        // When user clicks on the info button and when the info page is opened that page fetches the heroInfo and display the data  
        let heroInfo = {
            name: this.parentElement.parentElement.parentElement.children[2].children[0].innerHTML,
            description: this.parentElement.parentElement.parentElement.children[2].children[1].innerHTML,
            comics: this.parentElement.parentElement.parentElement.children[2].children[2].innerHTML,
            series: this.parentElement.parentElement.parentElement.children[2].children[3].innerHTML,
            stories: this.parentElement.parentElement.parentElement.children[2].children[4].innerHTML,
            portraitImage: this.parentElement.parentElement.parentElement.children[2].children[5].innerHTML,
            id: this.parentElement.parentElement.parentElement.children[2].children[6].innerHTML,
            landscapeImage: this.parentElement.parentElement.parentElement.children[2].children[7].innerHTML,
            squareImage: this.parentElement.parentElement.parentElement.children[2].children[8].innerHTML
        }

        localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
    }
});
