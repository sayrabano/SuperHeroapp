// --------------------------------- start for more info --------------------------------------->

// ------ Adding to dom -------------------->
let info = document.getElementById('info-container');
let title = document.getElementById('page-title');

// -------------------getting the heroInfo object which from storage -----------------------
let heroInfo = JSON.parse(localStorage.getItem("heroInfo"));


// ------- Adding event------------>
window.addEventListener("load", function () {
     // getting the favouritesCharacterIDs for displaying the appropriate button accoring to the existance of character in favourites
     let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
     if (favouritesCharacterIDs == null) {
          favouritesCharacterIDs = new Map();
     } else if (favouritesCharacterIDs != null) {
          favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
     }

     // ---------------------Adding the information into DOM on runtime -------------------------------
     info.innerHTML =
          `
               <div class="flex-row hero-name">${heroInfo.name}</div>
               <div class="flex-row hero-img-and-more-info">
                    <img id="portraitImage" class="hero-img" src="${heroInfo.portraitImage}" alt="">
                    <img style="display:none;" id="landscapeImage" src="${heroInfo.landscapeImage}" alt="">
                    <div class="flex-col more-info">
                         <div class="flex-row id">
                              <b>Hero ID : </b><span>${heroInfo.id}</span>
                         </div>
                         <div class="flex-row comics">
                              <b>Available Comics : </b><span>${heroInfo.comics}</span>
                         </div>
                         <div class="flex-row series">
                              <b>Available Series : </b><span>${heroInfo.series}</span>
                         </div>
                         <div class="flex-row stories">
                              <b>Available Stories : </b><span>${heroInfo.stories}</span>
                         </div>
                    </div>
               </div>
               <div class="flex-col hero-discription">
                    <b>Description:</b>
                    <p>${heroInfo.description != "" ? heroInfo.description : "Opps !! No Description Available for this Character"}</p>
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
               <button class="btn add-to-fav-btn">${favouritesCharacterIDs.has(`${heroInfo.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" :"<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}

          `
     // ----------------- Calling the function so that event is added --------------------
     addEvent();
})

// -----------------------Adding functinality to the character image based on the different screen sizes ------------------

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
})


function addEvent() {
     let favouriteButton = document.querySelector('.add-to-fav-btn');
     favouriteButton.addEventListener("click", addToFavourites);
}

// -----------------Adding function to add heros to favlist-----------------

function addToFavourites() {

    // -----------------Adding text to html -----------------
     if (this.innerHTML == '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites') {

           // ----------------creating object which containn hero information and adding that to favList-------------------
         
          let heroInfo = {
               name: this.parentElement.children[3].children[0].innerHTML,
               description: this.parentElement.children[3].children[8].innerHTML,
               comics: this.parentElement.children[3].children[4].innerHTML,
               series: this.parentElement.children[3].children[5].innerHTML,
               stories: this.parentElement.children[3].children[6].innerHTML,
               portraitImage: this.parentElement.children[3].children[1].innerHTML,
               id: this.parentElement.children[3].children[3].innerHTML,
               landscapeImage: this.parentElement.children[3].children[2].innerHTML,
               squareImage: this.parentElement.children[3].children[7].innerHTML
          }

          // ------------extracting favourites array which stores objects of character ----------------------- 
          // ------------------- We will  get null is no such array is created earlier ,if user is running the website for the first time
          let favouritesArray = localStorage.getItem("favouriteCharacters");

          // ---------checking if array is null or not ----------------
          if (favouritesArray == null) {
               // ------------if favourites array is null so we create a new array---------------
               favouritesArray = [];
          } else {
               // -----------------if it is not null then we parse so that it becomes an array ------------
               favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          }

          // --------- favourites superheroid is taken from localStorage for adding id of the hero which is added in favourites-----------------
          let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

          
          if (favouritesCharacterIDs == null) {
          // -------------------initializing empty map If we did't got the favourites superhero id --------------
               favouritesCharacterIDs = new Map();
          } else {
                
               favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
               
          }

          // --------------again setting the new favourites superheroid array to localStorage---------------------
          favouritesCharacterIDs.set(heroInfo.id, true);
         

          // -------------pushing info to array-------------
          favouritesArray.push(heroInfo);

          
          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
          
          localStorage.setItem("favouriteCharacters", JSON.stringify(favouritesArray));

          // ----------Displaying the Add to Favourites button to Remove from Favourites---------------
          this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';
          
          // ----------------Displaying the Added to Favourites notification to DOM--------------
          document.querySelector(".fav-toast").setAttribute("data-visiblity","show");
          // --------------Displaying the Added to Favourites notification ------------------
          setTimeout(function(){
               document.querySelector(".fav-toast").setAttribute("data-visiblity","hide");
          },1000);
     }
     // ---------------- condition to removing the character form favourites array-------------------
     else{
          
          
          let idOfCharacterToBeRemoveFromFavourites = this.parentElement.children[3].children[3].innerHTML;
          let favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
          let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
          
         
          let newFavouritesArray = [];
         
          favouritesCharacterIDs.delete(`${idOfCharacterToBeRemoveFromFavourites}`);
          
        
          // --------------iterating each element of array------------------
          favouritesArray.forEach((favourite) => {
                
               if(idOfCharacterToBeRemoveFromFavourites != favourite.id){
                    newFavouritesArray.push(favourite);
               }
          });
          
        
          
          // ------------Updating the new array in localStorage--------------------
          localStorage.setItem("favouriteCharacters",JSON.stringify(newFavouritesArray));
          localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
          
          
          // -------------displaying the Remove from Favourites button to Add to Favourites -------------------
          this.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';
          
           // ----------------Displaying the "Added to Favourites" notification to DOM--------------
          document.querySelector(".remove-toast").setAttribute("data-visiblity","show");
          // --------------Displaying the "Added to Favourites" notification ------------------

          //--------------timeout function forremove  notifications-----------------------
          setTimeout(function(){
               document.querySelector(".remove-toast").setAttribute("data-visiblity","hide");
          },1000);
         
     }     
}

// --------------------------------- end for more info --------------------------------------->