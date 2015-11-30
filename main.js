var hf = require('./helperFunctions.js');
var gl = require('./gameLoop.js');

var cardImages = [];
var promises = [];
var numCards = 12;
var delay = 250;
var openingAnimationComplete = false;


$('.highscorenumeric').replaceWith('<h2 class="highscorenumeric">' +
  (+localStorage.getItem('highScore')).toFixed(0) + '</h2>');

for (var i=0; i<numCards; i++){
  promises.push(hf.retrieveImage());
}

Promise.all(promises).then(function(imageArrays){
  imageArrays.map(function(elem){
    cardImages.push(hf.handleImage(elem));
  });
  cardImages = hf.elmiminateDuplicateArrayElements(cardImages);
  if (cardImages.length > numCards/2){
    cardImages = cardImages.slice(0, numCards/2);
  }
  cardImages = cardImages.concat(cardImages);
  cardImages = hf.shuffleArrayElements(cardImages);
  hf.insertCards(numCards, cardImages);
  hf.showAllCardsThenHide('.card', 'flip', delay, numCards, gl.gameLoop);
});
