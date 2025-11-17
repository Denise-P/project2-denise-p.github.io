$(document).ready(function () {
  // Called function to update the name, happiness, weight, and energy of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // Attach click events to the buttons
  document
    .querySelector(".treat-button")
    .addEventListener("click", clickedTreatButton);
  document
    .querySelector(".play-button")
    .addEventListener("click", clickedPlayButton);
  document
    .querySelector(".exercise-button")
    .addEventListener("click", clickedExerciseButton);
  document
    .querySelector(".sleep-button")
    .addEventListener("click", clickedSleepButton);

  document
    .querySelector(".restart-button")
    .addEventListener("click", clickedRestartButton);
});

// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = { name: "Cinnamoroll", weight: 22, happiness: 40, energy: 100 };
//Excited dog: 100 wags per min
//happy dog: 60 wags per min
//upset dog: 20 wag per min or lower

//animations/gifs/images are not diabled
var isActionAnimationPlaying = false;
//Stop the functions sounds
function stopAllSounds() {
  //select all audios
  const audio = document.querySelectorAll("audio");
  //timer function
  audio.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
}
//play sound 
function playSound(id, volume, durationMs) {
  //stop other sounds
  stopAllSounds();
  //get sounds
  const sound = document.getElementById(id);
  if (!sound) return;
  sound.volume = volume;
  sound.currentTime = 0;
  sound.play();
//time sound
  setTimeout(function () {
    sound.pause();
    sound.currentTime = 0;
  }, durationMs);
}

function clickedTreatButton() {
  // Increase pet happiness
  pet_info.happiness += 10;
  // Increase pet weight
  pet_info.weight += 3;
  //Increase energy
  if (pet_info.energy > 100) {
    pet_info.energy = 100;
  } else {
    pet_info.energy += 5;
  }
  //change image
  $(".pet-image").fadeOut(400, function () {
    $(this)
      .attr(
        "src",
        "https://i.pinimg.com/originals/3a/54/2c/3a542cc91cd389ce19503ebe489942be.gif"
      )
      .fadeIn(600);
  });
//play sound
  playSound("sound-treat", 1.0, 5000);
  //play message
  popUp("Snack Time!");
  //check stats
  checkAndUpdatePetInfoInHtml();
  //timer for animations
  setTimeout(function () {
    isActionAnimationPlaying = false;
    emotions();
  }, 5000);
}

function clickedPlayButton() {
  // Increase pet happiness
  pet_info.happiness += 10;
  // Decrease pet weight
  pet_info.weight -= 1;
  //Decrease pet energy
  pet_info.energy -= 10;
  //change image
  $(".pet-image").fadeOut(400, function () {
    $(this).attr("src", "images/plays.gif").fadeIn(600);
  });
  //play sound
  playSound("sound-play", 0.5, 5000);
  //play message
  popUp("Play Time!");
  //check stats
  checkAndUpdatePetInfoInHtml();
  //animation timer
  setTimeout(function () {
    isActionAnimationPlaying = true;
    emotions();
  }, 5000);
}

function clickedExerciseButton() {
  // Decrease pet happiness
  pet_info.happiness -= 15;
  // Decrease pet weight
  pet_info.weight -= 2;
  //Decrease pet energy
  pet_info.energy -= 20;
  //change image
  $(".pet-image").fadeOut(400, function () {
    $(this)
      .attr(
        "src",
        "https://usagif.com/wp-content/uploads/gify/cinnamoroll-spins-hoop-usagif.gif"
      )
      .fadeIn(600);
  });
  //play sound
  playSound("sound-exercise", 0.4, 5000);
  //play message
  popUp("Workout Time!");
  //check stats
  checkAndUpdatePetInfoInHtml();
  //animation timer
  setTimeout(function () {
    isActionAnimationPlaying = false;
    emotions();
  }, 5000);
}

function clickedSleepButton() {
  //Sleep animation
  $(".pet-image").fadeOut(400, function () {
    $(this)
      .attr(
        "src",
        "https://media.tenor.com/uH8LnHGj52cAAAAM/cinnamoroll-cinnamoroll-sleepy.gif"
      )
      .fadeIn(600);
  });
  //play sound
  playSound("sound-sleep", 0.8, 5000);
  //play message
  popUp("cinnamoroll is sleeping now.");
  // Reset energy to 100
  pet_info.energy = 100;
  //check stats
  checkAndUpdatePetInfoInHtml();
  //animation timer
  setTimeout(function () {
    isActionAnimationPlaying = true;
    emotions();
  }, 5000);
}
//disable all buttons but restart
function setButtonsDisaabled(isDisabled) {
  $(".treat-button, .play-button, .exercise-button, .sleep-button").prop(
    "disabled",
    isDisabled
  );
} 
function clickedRestartButton() {
  // Reset All
  pet_info.weight = 22;
  pet_info.happiness = 60;
  pet_info.energy = 100;
  checkAndUpdatePetInfoInHtml();
  //enable buttons
  setButtonsDisaabled(false);
  $(".hide-button").hide();
  //reset happy gif
  $(".pet-image").fadeOut(1000, function () {
    $(this)
      .attr(
        "src",
        "https://usagif.com/wp-content/uploads/gify/cinnamoroll-hi-gesture-usagif.gif"
      )
      .fadeIn(600);
  });
}

function emotions() {
  //check for gameOver
  if (isGameOver) return;
  //time out emotion for emotional images
  setTimeout(function () {});
  //check animation if they are playing
  if (isActionAnimationPlaying) return;
  if (pet_info.happiness >= 60) {
    //Mood: excited
    $(".pet-image").fadeOut(1000, function () {
      $(this)
        .attr(
          "src",
          "https://i.pinimg.com/originals/47/c9/24/47c924fe8fe7c0b5664daa522f85acf6.gif"
        )
        .fadeIn(600);
      if (pet_info.happiness > 100) {
        pet_info.happiness = 100;
      } else if (pet_info < 0) {
        pet_info.happiness = 0;
      }
       else {
        pet_info.happiness = pet_info.happiness;
      }
    });
    //sound
    playSound("sound-excited", 1.0, 5000);
    popUp("Cinnmoroll is very happy now.");
  } else if (pet_info.happiness > 20 && pet_info.happiness < 60) {
    //Mood: happy
    $(".pet-image").fadeOut(1000, function () {
      $(this)
        .attr(
          "src",
          "https://usagif.com/wp-content/uploads/gify/cinnamoroll-hi-gesture-usagif.gif"
        )
        .fadeIn(600);
    });
    playSound("sound-happy", 1.0, 5000);
  } else if (pet_info.happiness > 0 && pet_info.happiness <= 20) {
    //Mood: Upset
    $(".pet-image").fadeOut(1000, function () {
      $(this)
        .attr(
          "src",
          "https://i.pinimg.com/originals/5c/44/b6/5c44b624f35789fc3f6e4ab58394ccb8.gif"
        )
        .fadeIn(600);
    });
    playSound("sound-sad", 1.0, 5000);
    popUp("Cinnmoroll is upset right now.");
  } else {
    gameOver();
  }
}

//game over is diabled
var isGameOver = false;

function gameOver() {
  isGameOver = true;
  //stop all previous sounds
  stopAllSounds();
  //play runaway animation
  $(".pet-image").fadeOut(400, function () {
    $(this).attr("src", "images/wind.gif").fadeIn(600);
  });
  //disabled buttons
  setButtonsDisaabled(true);
  //make div appear
  $(".hide-button").show().fadeIn("slow");
  //play sound
  playSound("sound-gameOver", 0.7, 5000);
  //play image
  popUp("Your Cinnamoroll ran away!");
}

//check stats & update stats
function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

//check stats
function checkWeightAndHappinessBeforeUpdating() {
  // Add conditional so if weight is lower than zero.
  if (pet_info.weight < 10 || pet_info.weight > 50 || pet_info.happiness <= 0) {
    gameOver();
  } else if (pet_info.energy <= 0) {
    clickedSleepButton();
  } else {
    if (pet_info.happiness > 100) {
      pet_info.happiness = 100;
    } else {
      pet_info.happiness = pet_info.happiness;
    }
  }
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  document.querySelector(".name").textContent = pet_info.name;
  document.querySelector(".weight").textContent = pet_info.weight;
  document.querySelector(".happiness").textContent = pet_info.happiness;
  document.querySelector(".energy").textContent = pet_info.energy;
}

//no message
let popupTimer = null;

//Make message appear
function popUp(message) {
  //change message size
  var modWidth = 950;

  $(".message")
    .width(modWidth)
    .addClass("mod")
    .find(".show-message")
    .text(message);
//fade in message
  $(".message").fadeIn(500);

  //message disappear
  setTimeout(() => {
    $(".message").fadeOut(500);
  }, 5000);
}
