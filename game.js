buttonColours = ["green", "red", "yellow", "blue"];
gamePattern = [];
userClickedPattern = [];

var level = 0;
var started = false;

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
} // Plays the song according with the file name.

function animationPress(currentColour) {
  $("#" + currentColour).toggleClass("pressed");
  $("#" + currentColour).fadeOut(100).fadeIn(100);
  playSound(currentColour);
  setTimeout(function() {
    $("#" + currentColour).toggleClass("pressed");
  }, 100)
} // Create a animation when the tiles are pressed.

function nextSequence() {
  // Randomize and add to the list
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animationPress(randomChosenColour);

  $("h1").text("Level " + level);
  level++;
} //  Call the next tile of sequence.

function startOver() {
  playSound("wrong");
  $("body").toggleClass("game-over");
  setTimeout(function() {
    $("body").toggleClass("game-over");
  }, 200);
  level = 0;
  started = false;
  $("h1").text("Game Over, Press Any Key to Restart");
  gamePattern = [];
} //Called when the user loss.

$("[type='button']").click(function(event) {
  // Gets the tile id, add to history of clickeds and runs the animation.
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animationPress(userChosenColour);

  // Verfiry if the pattern is right
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
      startOver();
    }
  }

  // If the pattern is right, go to the next sequence
  if (started = true && gamePattern.length == userClickedPattern.length) {
    userClickedPattern = [];
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
});

// Starts the game
$(document).keypress(function() {
  if (started == false) {
    started = true;
    nextSequence();
  }
});
