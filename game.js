
let buttonColours = [ "red" , "blue" , "green" , "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = 0;
let level = 1;

function nextSequence()
{
    let randomNumber = Math.floor(Math.random() * 4);     //0-3
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    started = 1;
    $("h1").text("level " + level);
    level++;

    userClickedPattern = [];
}

$(".btn").click(function(e){

    let userChosenColour = this.id;
    
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
});

function playSound(name)
{
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
   $("#" + currentColour).toggleClass("pressed");
   setTimeout(() => {
    $("#" + currentColour).toggleClass("pressed");
   }, 100);
}


$(document).keypress(function(){

   if(started===0) 
    nextSequence();
   
})

$(document).click(function () {
   if(started===0)
    nextSequence();
}

function checkAnswer(currentLevel)
{   console.log(currentLevel)
    console.log("G - " + gamePattern);
    console.log("U - " + userClickedPattern);

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length)
        setTimeout(function () {
            nextSequence();
        }, 1000)
            
    }
    else
    {
        console.log("wrong")
        $("body").toggleClass("game-over");
        setTimeout(() => {
            
            $("body").toggleClass("game-over");
        }, 200);
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();

    }


}

function startOver()
{
    level = 1;
    gamePattern = [];
    started = 0;
}


