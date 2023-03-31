// Create variables targetting the relevant DOM elements here 👇
var image = document.querySelector('.cover-image');
var title = document.querySelector('.cover-title');
var tagline1 = document.querySelector('.tagline-1');
var tagline2 = document.querySelector('.tagline-2');

var randomCoverButton = document.querySelector('.random-cover-button');
var homeButton = document.querySelector('.home-button');
var saveCoverButton = document.querySelector('.save-cover-button');
var viewSavedButton = document.querySelector('.view-saved-button');
var makeNewButton = document.querySelector('.make-new-button');

var makeMyBookButton = document.querySelector('.create-new-book-button')

var homeView = document.querySelector('.home-view');
var savedView = document.querySelector('.saved-view');
var formView = document.querySelector('.form-view');

var userCover = document.querySelector('.user-cover')
var userTitle = document.querySelector('.user-title')
var userDesc1 = document.querySelector('.user-desc1')
var userDesc2 = document.querySelector('.user-desc2')

// We've provided a few variables below
var savedCovers = [
  createCover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;

// Add your event listeners here 👇
randomCoverButton.addEventListener('click', showNewCover)
window.addEventListener('load', showNewCover)

homeButton.addEventListener('click', showHomeView)
viewSavedButton.addEventListener('click', showSavedCoversView)
makeNewButton.addEventListener('click', showFormView)
makeMyBookButton.addEventListener('click',makeMyBook)
saveCoverButton.addEventListener('click', saveCover)

// Create your event handlers and other functions here 👇
function getRandomIndex(array) {

  return Math.floor(Math.random() * array.length);
}

function showNewCover(){
  var randomTitle = titles[getRandomIndex(titles)];
  var randomDesc1 = descriptors[getRandomIndex(descriptors)];
  var randomDesc2 = descriptors[getRandomIndex(descriptors)];
  var randomCover = covers[getRandomIndex(covers)];

  currentCover = createCover(randomCover, randomTitle, randomDesc1, randomDesc2);

  title.innerText = randomTitle;
  tagline1.innerText = randomDesc1;
  tagline2.innerText = randomDesc2;
  image.src = randomCover;
}


function showHomeView() {
// show: show-new-random-cover Button; save-cover Button; make-your-own-cover Button; home view
homeView.classList.remove('hidden');
randomCoverButton.classList.remove('hidden');
saveCoverButton.classList.remove('hidden');
viewSavedButton.classList.remove('hidden');
makeNewButton.classList.remove('hidden');

// hide: home button; form-view; saved-cover-view
homeButton.classList.add('hidden');
formView.classList.add('hidden');
savedView.classList.add('hidden');
}


function showFormView() {
// show: 
//home Button; 
homeButton.classList.remove('hidden');
//form-view
formView.classList.remove('hidden');

// hide: 
//show-new-random-cover Button;  
randomCoverButton.classList.add('hidden');
//save-cover Button;
saveCoverButton.classList.add('hidden');
//saved-cover-view
savedView.classList.add('hidden');
//home-view; 
homeView.classList.add('hidden');



}

function showSavedCoversView() {
// show: home Button; view-saved-covers Button; make-your-own Button; saved-cover view
homeButton.classList.remove('hidden');
saveCoverButton.classList.remove('hidden');
randomCoverButton.classList.remove('hidden');
savedView.classList.remove('hidden');

// hide: home view; form view; show-new-random-cover Button; save-cover Button
homeView.classList.add('hidden');
formView.classList.add('hidden');
randomCoverButton.classList.add('hidden');
saveCoverButton.classList.add('hidden');
}


//image will need diff method coverImage.source
// assign new values to image,title,tag line 1, tag line 2 use innertext
function createCover(imgSrc, title, descriptor1, descriptor2) {
  var cover = {
    id: Date.now(),
    coverImg: imgSrc,
    title: title,
    tagline1: descriptor1,
    tagline2: descriptor2
  }
  return cover
}

function makeMyBook(event){
event.preventDefault()

currentCover = createCover(userCover.value, userTitle.value, userDesc1.value, userDesc2.value);

  if(!covers.includes(userCover.value)){
     covers.push(userCover.value)
  }
  if(!titles.includes(userTitle.value)){
    titles.push(userTitle.value)
  }
  if(!descriptors.includes(userDesc1.value)){
    descriptors.push(userDesc1.value)
  }
  if(!descriptors.includes(userDesc2.value)){
    descriptors.push(userDesc2.value)
  }
  
  
  image.src = userCover.value
  title.innerText = userTitle.Value
  tagline1.innerText = userDesc1.Value
  tagline2.innerText = userDesc2.Value

  showHomeView();

  return newBookCover;
}

function saveCover(){
  
    var ifOverlap = savedCovers.some(Element => Element.title === currentCover.title && Element.imgSrc === currentCover.imgSrc && Element.tagline1 === currentCover.tagline1 && Element.tagline2 === currentCover.tagline2);
    if (!ifOverlap) {
      savedCovers.push(currentCover);
    }
    console.log(savedCovers);
    
  }


 


