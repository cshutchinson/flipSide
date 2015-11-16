var main = require('./main.js');

var score = {
  score: 0,
  multiplier: 100,
  consecutiveCorrect: 0,
  consecutiveWrong: 0,
  startTime: 0,
  endTime: 0
}

function gameLoop(){
  setInterval(onTimerTick, 500); // 33 milliseconds = ~ 30 frames per sec
  function onTimerTick() {
    checkForMatch();
  }
}

function checkForMatch(){

  var $flippedCards = $('div.card.flip>div.face.back>img')
    .not($('div.card.matched>div.face.back>img'));
  if ($flippedCards.length === 1){
    if (score.startTime===0) {
      score.startTime = Date.now();
    }
  }
  if ($flippedCards.length === 2){
    if (score.endTime===0) {
      score.endTime = Date.now();
    }
    main.removeClickEventListener($flippedCards);
    //check to see that the src of the images are equal
    if ($flippedCards[0].src === $flippedCards[1].src){
      $flippedCards.parent().parent().addClass('matched');
      $flippedCards.parent().parent().removeClass('flip');
      // TODO: display message of successful match
      correctMatchScore();
    } else {
      $flippedCards.parent().parent().removeClass('flip');
      incorrectMatchScore();
      // TODO: display message that cards were not match obviously
    }
    // TODO: if all cards match end game
    // TODO: end game
    // TODO: save email and high score to local storage
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
  console.log(score.score);
  $('.scoreNumeric>h2').replaceWith('<h2>' + score.score.toFixed(0) + '</h2>');
  // $( "div.second" ).replaceWith( "<h2>New heading</h2>" );
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

module.exports = {
  gameLoop: gameLoop,
  checkForMatch: checkForMatch
}
