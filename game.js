var main = require('./main.js');
var play = require('./play.js');

var cardImages = [];
var promises = [];
var numCards = 2;
var delay = 500;
var openingAnimationComplete = false;

for (var i=0; i<numCards/2; i++){
  promises.push(main.retrieveImage());
}

Promise.all(promises).then(function(imageArrays){
  imageArrays.map(function(elem){
    cardImages.push(main.handleImage(elem));
  });
  main.elmiminateDuplicateArrayElements(cardImages);
  cardImages = cardImages.concat(cardImages);
  cardImages = main.shuffleArrayElements(cardImages);
  main.insertCards(numCards, cardImages);
  main.showAllCardsThenHide('.card', 'flip', delay, numCards);
});

setInterval(onTimerTick, 200); // 33 milliseconds = ~ 30 frames per sec

function onTimerTick() {
  setInterval(play.checkForMatch(), 500);
}


// TODO: get n/2 unique images - done - fixed
// TODO: concat the array with copy of itself - done
// TODO: shuffle the array for randomness - done
// TODO: create cards with image on flip slide - done
// TODO: add click events to each card - done
// TODO: show all images to begin the game - done
// TODO: hide all images to start the game - done
// TODO: when two images are revealed check to see if they are equal
// TODO: hide pair of images if they don't match
// TODO: increment score as needed
// TODO: end game when all images are revealed
