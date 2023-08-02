function addFav(heroInfo){
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
            
            // Displaying the "Added to Favourites" toast to DOM
            document.querySelector(".fav-toast").removeAttribute("hidden");
            // Deleting the "Added to Favourites" toast from DOM after 1 seconds
            setTimeout(function(){
                document.querySelector(".fav-toast").setAttribute("hidden", "");
            },1000);

}