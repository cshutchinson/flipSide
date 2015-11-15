var main = require('./main.js');

var cardImages = [];
var promises = [];
var numCards = 16;

for (var i=0; i<numCards/2; i++){
  promises.push(main.retrieveImage());
}

Promise.all(promises).then(function(imageArrays){
  imageArrays.map(function(elem){
    cardImages.push(main.handleImage(elem));
  });
  main.elmiminateDuplicateArrayElements(cardImages);
  cardImages = cardImages.concat(cardImages);
  cardImages = shuffleArrayElements(cardImages);
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
