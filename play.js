module.exports = {
  checkForMatch(){
    var flippedCards = $('div.card.flip>div.face.back>img');
    if (flippedCards.length === 2 ){
      // TODO: remove click event from all cards

      //check to see that the src of the images are equal
      if (flippedCards[0].src === flippedCards[1].src){
        flippedCards.parent().parent().addClass('matched');
        flippedCards.parent().parent().removeClass('flip');
        // TODO: adjust score
        console.log('increased score');
      } else {
        flippedCards.parent.parent.removeClass('flip');
        // TODO: adjust score down
        console.log('descreased score, no match');
      }

      // TODO: if all cards match end game
      // TODO: else add click event to cards without .matched

      // TODO: end game
      // TODO: save email and high score to local storage
    }
  }
}
