//Create variables targetting the relevant DOM elements 
/** cover variables  */ 
var image = document.querySelector('.cover-image');
var title = document.querySelector('.cover-title');
var tagline1 = document.querySelector('.tagline-1');
var tagline2 = document.querySelector('.tagline-2');
var miniCovers = document.querySelectorAll('.mini-cover');

/** button variabels */
var randomCoverButton = document.querySelector('.random-cover-button');
var homeButton = document.querySelector('.home-button');
var saveCoverButton = document.querySelector('.save-cover-button');
var viewSavedButton = document.querySelector('.view-saved-button');
var makeNewButton = document.querySelector('.make-new-button');
var makeMyBookButton = document.querySelector('.create-new-book-button');

/** view buttons */
var homeView = document.querySelector('.home-view');
var savedView = document.querySelector('.saved-view');
var formView = document.querySelector('.form-view');

/** form input variables */
var userCover = document.querySelector('.user-cover');
var userTitle = document.querySelector('.user-title');
var userDesc1 = document.querySelector('.user-desc1');
var userDesc2 = document.querySelector('.user-desc2');

/** save-cover variables */
var savedSection = document.querySelector('.saved-covers-section');

var savedCovers = [
  createCover('http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg', 'Sunsets and Sorrows', 'sunsets', 'sorrows')
];
var currentCover;

// event listeners
randomCoverButton.addEventListener('click', showNewCover);
window.addEventListener('load', showNewCover);
homeButton.addEventListener('click', showHomeView);
makeNewButton.addEventListener('click', showFormView);
makeMyBookButton.addEventListener('click',makeMyBook);
saveCoverButton.addEventListener('click', saveCover);
viewSavedButton.addEventListener('click', renderSavedCovers);


// event handlers and other functions 
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function showNewCover() {
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
  homeView.classList.remove('hidden');
  randomCoverButton.classList.remove('hidden');
  saveCoverButton.classList.remove('hidden');
  viewSavedButton.classList.remove('hidden');
  makeNewButton.classList.remove('hidden');

  homeButton.classList.add('hidden');
  formView.classList.add('hidden');
  savedView.classList.add('hidden');
}

function showFormView() {
  homeButton.classList.remove('hidden');
  formView.classList.remove('hidden');

  randomCoverButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  savedView.classList.add('hidden');
  homeView.classList.add('hidden');
}

function showSavedCoversView() {
  homeButton.classList.remove('hidden');
  saveCoverButton.classList.remove('hidden');
  randomCoverButton.classList.remove('hidden');
  savedView.classList.remove('hidden');

  homeView.classList.add('hidden');
  formView.classList.add('hidden');
  randomCoverButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
}

function createCover(imgSrc, title, descriptor1, descriptor2) {
  var cover = {
    id: Date.now(),
    coverImg: imgSrc,
    title: title,
    tagline1: descriptor1,
    tagline2: descriptor2
  }
  return cover;
}

function makeMyBook(event) {
  event.preventDefault();
  currentCover = createCover(userCover.value, userTitle.value, userDesc1.value, userDesc2.value);
  if (!covers.includes(userCover.value)) {
    covers.push(userCover.value);
  }
  if (!titles.includes(userTitle.value)) {
    titles.push(userTitle.value);
  }
  if (!descriptors.includes(userDesc1.value)) {
    descriptors.push(userDesc1.value);
  }
  if (!descriptors.includes(userDesc2.value)) {
    descriptors.push(userDesc2.value);
  }
    
  image.src = currentCover.coverImg;
  title.innerText = currentCover.title;
  tagline1.innerText = currentCover.tagline1;
  tagline2.innerText = currentCover.tagline2;

  showHomeView();
}

function saveCover() {
  var ifOverlap; 
  for (var i = 0; i < savedCovers.length; i++) {
    if (savedCovers[i].title === currentCover.title && savedCovers[i].coverImg === currentCover.coverImg && savedCovers[i].tagline1 === currentCover.tagline1 && savedCovers[i].tagline2 === currentCover.tagline2) {
      ifOverlap = true;
      break;
    } 
  }

  if (!ifOverlap) {
    savedCovers.push(currentCover);
  }
}

function createCoverElement(coverInfo) {
  var coverEl = document.createElement('section');
  coverEl.classList.add('mini-cover');
  coverEl.id = coverInfo.id; 

  var img = document.createElement('img');
  img.src = coverInfo.coverImg;
  img.classList.add('cover-image');

  var title = document.createElement('h2');
  title.classList.add('cover-title');
  var titleText = document.createTextNode(coverInfo.title);
  title.appendChild(titleText);

  var tagline = document.createElement('h3');
  tagline.classList.add('tagline');
  var sentence = document.createTextNode(`A tale of ${coverInfo.tagline1} and ${coverInfo.tagline2}`);
  tagline.appendChild(sentence);

  var priceTag = document.createElement('img');
  priceTag.src = './assets/price.png';
  priceTag.classList.add('price-tag');

  var overlay = document.createElement('img');
  overlay.src = './assets/overlay.png';
  overlay.classList.add('overlay');

  coverEl.append(img, title, tagline, priceTag, overlay);
  coverEl.addEventListener('dblclick', deleteCover);
  return coverEl;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function renderSavedCovers() {
  removeAllChildNodes(savedSection);

  for (var i = 0; i < savedCovers.length; i++) {
    var element = createCoverElement(savedCovers[i]);
    savedSection.appendChild(element);
  }

  showSavedCoversView();
}

function deleteCover(event) {
  event.currentTarget.remove();
 
  for (var i = 0; i < savedCovers.length; i++) {
    if (savedCovers[i].id === parseInt(event.currentTarget.id)) {
      savedCovers.splice(i, 1);
    }
  }
}

 


