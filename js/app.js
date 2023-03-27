//*-------------------------------------- Start for app.js file ----------------------------------------------------

//<-------------------------------------- Selecting the element from DOM ---------------------------------------------------->


const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");

let searchBar = document.getElementById("search-bar");
let searchResults = document.getElementById("search-results");

// ------------------ adding function for search bar to make that togglable means can close that and open that  ------------------
searchBtn.onclick = () => {

     //-----------adding class to make buttons active --------------------
     searchBox.classList.add("active");
     searchBtn.classList.add("active");
     searchBar.classList.add("active");
     cancelBtn.classList.add("active");
     searchBar.focus();


}
cancelBtn.onclick = () => {

     //-----------removing  class to make buttons inactive --------------------
     searchBox.classList.remove("active");
     searchBtn.classList.remove("active");
     searchBar.classList.remove("active");
     cancelBtn.classList.remove("active");
     searchResults.classList.toggle("active");
     searchBar.value = '';


}

// ------------------ ending function for search bar to make that toggle able means can close that and open that  ------------------


// ------------------Adding eventListener to search bar-------------------
searchBar.addEventListener("input", () => searchHeros(searchBar.value));

// -------------creating function to make  API call ---------------------
async function searchHeros(searchText) {


     if (searchText.length == 0) {
          searchResults.innerHTML = ``;
          return;
     }

     // --------API url to get the data ------------
     let url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchText}&apikey=e90080e1f9e6557c9447901f7239ceb7&hash=0efd410273d846276da7c1e6b42f3dbe?ts=1`
     await fetch(url)
          .then(res => res.json())
          .then(data => showSearchHerosResults(data.data.results))
}

// -------------creating function to show search results on ui side  ---------------------
function showSearchHerosResults(searchedHero) {

     //----extracting favlist of characters from local storage ---------
     let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
     if (favouritesCharacterIDs == null) {

          favouritesCharacterIDs = new Map();
     }
     else if (favouritesCharacterIDs != null) {

          favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
     }
     //------------ making search bar empty----------
     searchResults.innerHTML = ``;

     // -------------count for showing the numberes of results on ui side------------
     let count = 1;


     for (const key in searchedHero) {
          // -----------max count to show result on ui-------------------
          if (count <= 4) {

               let hero = searchedHero[key];
               // ---------------- Appending the element into DOM ----------------
               searchResults.innerHTML +=
                    `
               <li class="flex-row single-search-result">
                    <div class="flex-row img-info">
                         <img src="${hero.thumbnail.path + '/portrait_medium.' + hero.thumbnail.extension}" alt="">
                         <div class="hero-info">
                              <a class="character-info" href="./moreInfo.html">
                                   <span class="hero-name">${hero.name}</span>
                              </a>
                         </div>
                    </div>
                    <div class="flex-col buttons">
                        
                         <button class="btn add-to-fav-btn">${favouritesCharacterIDs.has(`${hero.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" : "<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}
                    </div>
                    <div style="display:none;">
                         <span>${hero.name}</span>
                         <span>${hero.description}</span>
                         <span>${hero.comics.available}</span>
                         <span>${hero.series.available}</span>
                         <span>${hero.stories.available}</span>
                         <span>${hero.thumbnail.path + '/portrait_uncanny.' + hero.thumbnail.extension}</span>
                         <span>${hero.id}</span>
                         <span>${hero.thumbnail.path + '/landscape_incredible.' + hero.thumbnail.extension}</span>
                         <span>${hero.thumbnail.path + '/standard_fantastic.' + hero.thumbnail.extension}</span>
                    </div>
               </li>
               `
          }
          count++;
     }

     events();
}

// -----------creating function for eventListener to buttons-------------------
function events() {
     let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
     favouriteButton.forEach((btn) => btn.addEventListener("click", addToFavourites));

     let characterInfo = document.querySelectorAll(".character-info");
     characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage))
}

// creating function for adding to favlist or removing to favlist -----------------
function addToFavourites() {

     // ------------ when add to favourites button is cliked then----------
     if (this.innerHTML == '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites') {

          //  -----------------creating a new object containg revelent info of hero and push it into favouritesArray-------------
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

          // -----------------getting the favourites array which stores objects of character  ------------------
         
          let favouritesArray = localStorage.getItem("favouriteCharacters");

         
          if (favouritesArray == null) {
               // ------------ favourites array is null so we create a new array------------
               favouritesArray = [];
          } else {
               // ------------if it is not null then we parse so that it becomes an array --------
               favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          }

          
          let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");


          if (favouritesCharacterIDs == null) {
               // ------------ when we did't got the favouritesCharacterIDs then we iniitalize it with empty map-------------
               favouritesCharacterIDs = new Map();
          } else {
               
               favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
               
          }

          // ----------setting favid array to localStorage----------------
          favouritesCharacterIDs.set(heroInfo.id, true);
          

          //----------- pushing the  heroInfo object to favouritesArray------------------
          favouritesArray.push(heroInfo);

          

          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));

          // ---------------Setting the new favouritesCharacters array which now has the new character ------------
          localStorage.setItem("favouriteCharacters", JSON.stringify(favouritesArray));

           // -------------displaying the Remove from Favourites button to Add to Favourites -------------------
          this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';

          // --------------Displaying the "Added to Favourites" notification ------------------
          document.querySelector(".fav-toast").setAttribute("data-visiblity", "show");
          
         

          //--------------timeout function forremove  notifications-----------------------
          setTimeout(function () {
               document.querySelector(".fav-toast").setAttribute("data-visiblity", "hide");
          }, 1000);
     }
     // --------------For removing the character form favourites array-------------------
     else {

          // --------------storing the id of character in a variable ------------
          let idOfCharacterToBeRemoveFromFavourites = this.parentElement.parentElement.children[2].children[6].innerHTML;

          
          let favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));

          
          let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));

          // ----------- containing all the characters which should be present after the deletion of the character to be removed -----------
          let newFavouritesArray = [];
         

          // ---------------------adding delete function to remove character from favlis----------------
          favouritesCharacterIDs.delete(`${idOfCharacterToBeRemoveFromFavourites}`);

       
          // ------------------iterating each element of array------------------------
          favouritesArray.forEach((favourite) => {
               if (idOfCharacterToBeRemoveFromFavourites != favourite.id) {
                    newFavouritesArray.push(favourite);
               }
          });



          // --------------------Updating the new array in localStorage-------------------------
          localStorage.setItem("favouriteCharacters", JSON.stringify(newFavouritesArray));
          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));


          // -------------displaying the Remove from Favourites button to Add to Favourites -------------------
          this.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';

           // ----------------Displaying the "Added to Favourites" notification to DOM--------------
          document.querySelector(".remove-toast").setAttribute("data-visiblity", "show");
          // --------------Displaying the "Added to Favourites" notification ------------------

          //--------------timeout function forremove  notifications-----------------------
         
          setTimeout(function () {
               document.querySelector(".remove-toast").setAttribute("data-visiblity", "hide");
          }, 1000);
         
     }
}

// adding function which stores the info object of character for which user want to see moreinfo page------------
function addInfoInLocalStorage() {

     // ------------------- creating function which stores the data of character in localStorage---------------
     // --------------------When user clicks on the info button and when the info page is opened that page fetches the heroInfo and display the data --------------
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

//--------------------------------------- ending of app.js file ------------------------------------>