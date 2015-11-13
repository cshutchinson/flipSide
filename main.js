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
}

function addImageToCards(){
  $('.back').each(function(index){
    $('<img>').attr('src', cardImages[index]).appendTo(this);
  });
}


function retrieveImage(){
  return new Promise(function(succeed, fail){
    var req = new XMLHttpRequest();
    req.open('GET', 'http://lorempixel.com/70/70/sports/', true);
    req.addEventListener('load', function(){
      if (req.status < 400)
        succeed(req.responseText);
      else
        fail(new Error('Request failed: ' + req.statusText));
    });
    req.addEventListener('error', function(){
      fail(new Error('Network error'));
    });
    req.send(null);
  });
}

retrieveImage().then(function(text){
  var arr = new Uint8Array(text);
  var raw = String.fromCharCode.apply(null, arr);
  var b64 = btoa(raw);
  var dataURL='data:image/jpeg;base64,'+b64;
  // $('<img>').attr('src', dataURL).appendTo(document.body)
  console.log(arr);
}, function(error){
  console.log('Failed to fetch image: ' + error);
});






  //
  // insertCards(2);
  // addImageToCards();
  // $('.card').click(function(){
  //   $(this).toggleClass('flip');
  // });
