function removeFav(idOfCharacterToBeRemoveFromFavourites){
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



    // Displaying the "Remove from Favourites" toast to DOM
    document.querySelector(".remove-toast").removeAttribute("hidden");            
    // Deleting the "Remove from Favourites" toast from DOM after 1 seconds
    setTimeout(function(){
        document.querySelector(".remove-toast").setAttribute("hidden", "");
    },1000);
            
}