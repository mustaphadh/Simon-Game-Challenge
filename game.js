var gamePattern = [];
var userPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
$(document).on("keypress", function(){
    if(!started){
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    userPattern = [];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var buttonColor = buttonColors[randomNumber];
    gamePattern.push(buttonColor);
    $("#"+buttonColor).fadeOut(50);
    $("#"+buttonColor).fadeIn();
    playSound(buttonColor);
}
function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}
/*
function isPatternCorrect(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false
    } 
    for(let i=0; i<level; i++){
        if(arr1[i] !== arr2[i]){
            return false
        }
    }
    return true;
} */
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length){
        setTimeout(function () {
        nextSequence();
        }, 1000);
    }
    } else {
        gameOver();
    }
}
function gameOver(){
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 100)
    gamePattern = [];
    started = false;
    level=0;
}

$(".btn").on("click", function(){
    var buttonColor = $(this).attr("id")
    $(this).addClass("pressed");
    playSound(buttonColor);
    setTimeout(function(){
        $("#"+buttonColor).removeClass("pressed");
    }, 200)
    userPattern.push(buttonColor);
    checkAnswer(userPattern.length-1);
})