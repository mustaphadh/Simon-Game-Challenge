var gamePattern = [];
var userPattern = [];
var buttonColors = ["red", "green", "yellow", "blue"];
var level = 0;
var started = false;

$(document).on("keypress", function(){
   if(!started){
      started = true;
      nextSequence();
   }
})

function nextSequence(){
   userPattern = [];
   level++;
   $("h1").text("Level "+level);
   var randomNumber = Math.floor(Math.random()*4);
   var buttonColor = buttonColors[randomNumber];
   $("#"+buttonColor).fadeIn(50).fadeOut(50).fadeIn();
   playSound(buttonColor);
   gamePattern.push(buttonColor);
}

function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userPattern[currentLevel]) {
     if (userPattern.length === gamePattern.length){
       setTimeout(function () {
         nextSequence();
       }, 1000);
     }
   } else{
      gameOver();
     }
}

function gameOver(){
   $("h1").text("Game Over, Press Any Key to Restart");
   $("body").addClass("game-over");
   playSound("wrong");
   setTimeout(function(){
      $("body").removeClass("game-over");
   }, 200)
   level = 0;
   gamePattern = [];
   started = false;
}

$(".btn").on("click", function(){
   var clickedButton = $(this).attr("id");
   buttonClickAnimation(clickedButton);
   userPattern.push(clickedButton);
   checkAnswer(userPattern.length-1)
})

function playSound(color){
   var audio = new Audio(`sounds/${color}.mp3`);
   audio.play();
}

function buttonClickAnimation(color){
   $("#"+color).addClass("pressed");
   playSound(color);
   setTimeout(function(){
      $("#"+color).removeClass("pressed");
   }, 100);
}
