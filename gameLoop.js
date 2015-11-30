var hf = require('./helperFunctions.js');

var score = {
  score: 0,
  multiplier: 1000,
  consecutiveCorrect: 0,
  consecutiveWrong: 0,
  startTime: 0,
  endTime: 0
};

mainTimer = null;

function gameLoop(){
  // animation is complete now - make it possible to reveal a card
  clickTarget = hf.addClickEventListener('.card', 'flip');
  $('.turnMessage>h2').replaceWith('<h2 class="turnMessage">' + 'Go! Time counts!' + '</h2>');
  if (score.startTime === 0) {
    score.startTime = Date.now();
  };
  mainTimer = setInterval(checkForMatch, 30);
}

function checkForMatch(){
  // this function handles game state managment
  var $flippedCards = $('div.card.flip').not($('div.card.matched'));
  // user flipped a card
  if ($flippedCards.length === 1){
    if (score.startTime===0) {
      score.startTime = Date.now();
    }
  }
  // user flipped over second card - match?
  if ($flippedCards.length === 2){
    if (score.endTime===0) {
      score.endTime = Date.now();
    }
    //check to see that the src of the images are equal
    if ($flippedCards.find('img')[0].src === $flippedCards.find('img')[1].src){
      $flippedCards.addClass('matched');
      $flippedCards.removeClass('flip');
      correctMatchScore();
    } else {
      setTimeout(function(){
        $flippedCards.removeClass('flip');
      }, 300); // delay so user can see cards don't match
      incorrectMatchScore();
    }
  }
  // check to see if all cards are matched and end game
  var $matchedCards = $('div.card.matched');
  if ($matchedCards.length === $('div.card').length){
    window.clearInterval(mainTimer);
    gameComplete();
  }
}

function calculateScore(score, correct){
  var turnScore = (score.multiplier / ((score.endTime - score.startTime)/1000));
  if (correct){
    turnScore *= score.consecutiveCorrect;
    score.score += turnScore;
  } else {
    turnScore *= score.consecutiveWrong;
    score.score -= turnScore;
    if (score.score < 0) score.score = 0;
  }
  $('.scoreNumeric').replaceWith('<h2 class="scoreNumeric game-status">' + score.score.toFixed(0) + '</h2>');
  score.endTime = 0;
  score.startTime = 0;
  return score;
}

function incorrectMatchScore() {
  score.consecutiveCorrect = 0;
  score.consecutiveWrong ++;
  calculateScore(score, false);
}

function correctMatchScore() {
  score.consecutiveCorrect ++;
  score.consecutiveWrong = 0;
  calculateScore(score, true);
}


function gameComplete(){
  // display game complete message
  $('.turnMessage>h2').replaceWith('<h2 class="turnMessage">' + 'Fantastic! Game complete.'+
    '</h2>');
  // save email and score if highest to localstorage
  if (+localStorage.getItem('highScore')< score.score){
    localStorage.setItem('highScore', score.score.toFixed(0))
    $('.turnMessage>h2').replaceWith('<h2 class="turnMessage">' + 'Fantastic! Game complete.'+
    ' New high score saved!' + '</h2>');
  }
}

module.exports = {
  gameLoop: gameLoop,
  checkForMatch: checkForMatch
}
