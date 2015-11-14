'use strict';

var cardImages = [];
var promises = [];
var numCards = 4;


function createCard(selector){
  $(selector).append('<div class="container"><div class="card"><div\
   class="face front">Front</div><div class="face back"></div></div></div>');
}

function insertCards(count){
  for (var i=0; i<count; i=i+1){
    createCard($('.main'));
  }
  return $('.main');
}

function addImageToCard(data){
  $('.back:last').append($('<img>').attr('src', data));
}


function retrieveImage(){
  return new Promise(function(succeed, fail){
    var req = new XMLHttpRequest();
    req.responseType = 'arraybuffer';
    req.open('GET', 'http://lorempixel.com/70/70/', true);
    req.onload = function(){
      if (req.status < 400) {
        succeed(req.response);
      } else {
        fail(new Error('Request failed: ' + req.statusText));
      }
    };
    req.addEventListener('error', function(){
      fail(new Error('Network error'));
    });
    req.send(null);
  });
}

function handleImage(text){
  var arr = new Uint8Array(text);
  var raw = String.fromCharCode.apply(null, arr);
  var b64 = btoa(raw);
  var dataURL='data:image/jpeg;base64,'+b64;
  return dataURL;
}

// usage addClickEventListener('.card', 'flip')
function addClickEventListener(target, cssClass) {
    $(target).click(function(){
      $(this).toggleClass(cssClass);
    });
}

function elmiminateDuplicateArrayElements(array){
  array.filter(function(elem, pos, self){
    return self.indexOf(elem) === pos;
  });
}

for (var i=0; i(numCards/2); i++){
  promises.push(retrieveImage());
}

Promise.all(promises).then(function(imageArrays){
  imageArrays.map(function(elem){
    cardImages.push(handleImage(elem));
  });
  console.log(cardImages);
});

// TODO: get n/2 unique images
// TODO: concat the array with copy of itself
// TODO: shuffle the array for randomness
// TODO: create cards with image on flip slide
// TODO: add click events to each card
// TODO: show all images to begin the game
// TODO: hide all images to start the game
// TODO: when two images are revealed check to see if they are equal
// TODO: hide pair of images if they don't match
// TODO: increment score as needed
// TODO: end game when all images are revealed
