var main = require('./main.js');

function gameLoop(){
  setInterval(onTimerTick, 500); // 33 milliseconds = ~ 30 frames per sec
  function onTimerTick() {
    checkForMatch();
  }
}

function checkForMatch(){
  var $flippedCards = $('div.card.flip>div.face.back>img');
  if ($flippedCards.length === 2){
    main.removeClickEventListener($flippedCards);
    //check to see that the src of the images are equal
    if ($flippedCards[0].src === $flippedCards[1].src){
      $flippedCards.parent().parent().addClass('matched');
      $flippedCards.parent().parent().removeClass('flip');
      // TODO: display message of successful match
      // TODO: adjust score
      console.log('increased score');
    } else {
      // TODO: display message that cards were not match obviously

      $flippedCards.parent().parent().removeClass('flip');
      // TODO: adjust score down
      console.log('descreased score, no match, try again ?');

    }

    // TODO: if all cards match end game
    // TODO: else add click event to cards without .matched

    // TODO: end game
    // TODO: save email and high score to local storage
  }
}

module.exports = {
  gameLoop: gameLoop,
  checkForMatch: checkForMatch
}
