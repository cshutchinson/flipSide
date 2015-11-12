'use strict';

// console.log($('.main').length);

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

function retrieveImage(){
  var xmlHTTP = new XMLHttpRequest();
  xmlHTTP.open('GET', 'http://lorempixel.com/400/200/sports/', true);
  xmlHTTP.responseType = 'arraybuffer';
  xmlHTTP.onload = function() {
    var arr = new Uint8Array(this.response);
    var raw = String.fromCharCode.apply(null, arr);
    var b64 = btoa(raw);
    // var dataURL='data:image/jpeg;base64,'+b64;
    // $('<img>').attr('src', dataURL).appendTo(document.body)
    return 'data:image/jpeg;base64,' + b64;
  };
  xmlHTTP.send();
}

function addImageToCard(){
  $('.back').each(function(){
    // $(this).html($('<img>').attr('src', retrieveImage()));
    $('<img>').attr('src', retrieveImage()).appendTo(this);
  });
}


 insertCards(64);

 $('.card').click(function(){
   $(this).toggleClass('flip');
 });

addImageToCard();



// <img \
// src="http://www.lorempixel.com/70/70">
