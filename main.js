'use strict';

// console.log($('.main').length);

var cardImages = [];

function createCard(selector){
  $(selector).append('<div class="container"><div class="card"><div\
   class="face front">Front</div><div class="face back"></div></div></div>');
}

function insertCards(count){
  var i=0;
  for (i=0; i<count; i=i+1){
    createCard($('.main'));
  }
  return ($('.main'));
}

function addImageToCard(data){
  $('.back:last').append($('<img>').attr('src', data));
}


function retrieveImage(){
  return new Promise(function(succeed, fail){
    var req = new XMLHttpRequest();
    req.responseType = 'arraybuffer';
    req.open('GET', 'http://lorempixel.com/70/70/sports/', true);
    req.onload = function(){
      if (req.status < 400)
        succeed(req.response);
      else
        fail(new Error('Request failed: ' + req.statusText));
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
  console.log(dataURL);
  cardImages.push(dataURL);
}

function handleError(error){
  console.log('Failed to fetch image: ' + error);
}

for (var i=0; i<6; i++){
  retrieveImage().then(handleImage, handleError);
}



$('.card').click(function(){
  $(this).toggleClass('flip');
});

// insertCards(2);
console.log(cardImages);
// addImageToCards();
