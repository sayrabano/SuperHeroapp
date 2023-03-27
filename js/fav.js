
//---------------------------- start for favourites file-------------------



// -------------------- adding  container to dom --------------------
let cardContainer = document.getElementById('container');

// ---------------------adding Eventlistener attached to dom which is executed when the page is loaded-------------------------
window.addEventListener("load", function () {
     // ----------Getting the favourites array fom localStorage-------------
     let favourites = localStorage.getItem("favouriteCharacters");

     // ---------when favourites is null then displaying nothing ------------------
     if (favourites == null) {
          cardContainer.innerHTML = "<h1 class=\"no-characters\">No characters present in Favourites</h1>"
          return;
     }
     // ------------------then array is not null-------------
     else {
          favourites = JSON.parse(this.localStorage.getItem("favouriteCharacters"));
     }

     // ---------------displaying if all the characters are deleted from favourites and not character ------------------
     if (favourites.length == 0) {
          cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>";
          return;
     }
     // ----------------making container empty-----------------
     cardContainer.innerHTML = "";
     favourites.forEach(character => {
          // ---------------adding html to carcontainer---------------------
          cardContainer.innerHTML +=
               `
        <div class="flex-col card">
        <img src="${character.squareImage}" alt="">
        <span class="name">${character.name}</span>
        <span class="id">Id : ${character.id}</span>
        <span class="comics">Comics : ${character.comics}</span>
        <span class="series">Series : ${character.series}</span>
        <span class="stories">Stories : ${character.stories}</span>
             
        <a class="character-info" href="./moreInfo.html">
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
             <button class="btn remove-btn"><i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites</button>
           
        </div>
   `

     })
     // -------------------Adding the appropritate events to the buttons after they are inserted in dom ---------------------
     addEvent();
})

// -------------- creating Function for attacthing eventListener to buttons---------------------
function addEvent() {
     let removeBtn = document.querySelectorAll(".remove-btn");
     removeBtn.forEach((btn) => btn.addEventListener("click", removeCharacterFromFavourites))

     let characterInfo = document.querySelectorAll(".character-info");
     characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage));
}

// -------------- creating Function forremoving hero from favlist---------------------
function removeCharacterFromFavourites() {

     // ---------------Storing the Id of character in a variable---------------
     let idOfCharacterToBeDeleted = this.parentElement.children[2].innerHTML.substring(5);

     // ------------------getting the favourites array which stores objects of character--------------  
     let favourites = JSON.parse(localStorage.getItem("favouriteCharacters"));
     let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));

     // ------------deleting the characters id from favouritesCharacterId map------------
     favouritesCharacterIDs.delete(`${idOfCharacterToBeDeleted}`);


     // --------------deleting the character form array whose id is matched---------------- 
     favourites.forEach(function (favourite, index) {
          if (favourite.id == idOfCharacterToBeDeleted) {

               favourites.splice(index, 1);
          }
     });

     // ----------------when all the characters are deleted from favourites and not character left for displaying----------------
     if (favourites.length == 0) {
          cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>";
     }


     // -------------------Updating the new arrays in localStorage-----------------
     localStorage.setItem("favouriteCharacters", JSON.stringify(favourites));
     localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));

     // --------------Removing the element from DOM-------------
     this.parentElement.remove();

     // ----------------Displaying the "Added to Favourites" notification to DOM--------------
     document.querySelector(".remove-toast").setAttribute("data-visiblity", "show");

     //--------------timeout function forremove  notifications-----------------------
     setTimeout(function () {
          document.querySelector(".remove-toast").setAttribute("data-visiblity", "hide");
     }, 1000);
}


// adding function which stores the info object of character for which user want to see moreinfo page------------
function addInfoInLocalStorage() {
     // ------------------- creating function which stores the data of character in localStorage---------------
     // ---------------addingin functionality When user clicks on the info button and when the info page is opened that page fetches the heroInfo and display the data  
     let heroInfo = {
          name: this.parentElement.children[7].children[1].innerHTML,
          description: this.parentElement.children[7].children[5].innerHTML,
          comics: this.parentElement.children[7].children[2].innerHTML,
          series: this.parentElement.children[7].children[3].innerHTML,
          stories: this.parentElement.children[7].children[4].innerHTML,
          portraitImage: this.parentElement.children[7].children[7].innerHTML,
          id: this.parentElement.children[7].children[0].innerHTML,
          landscapeImage: this.parentElement.children[7].children[6].innerHTML
     }

     localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}


//---------------------------- end for favourites file-------------------