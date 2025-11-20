$(document).ready(function () {
  // Called function to update the name, happiness, weight, and energy of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // ------------------------------------------------------------
  //PSEUDOCODE:  Attach click to buttons
  // ------------------------------------------------------------
  //1. look for the elements inside querySelector and loctaes in the HTML file
  // 2.. When button is clicked by the user detected by addEventListener,
  // to run the button function inside it.
  // ------------------------------------------------------------
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

// ------------------------------------------------------------
// PSEUDOCODE: Initialization pet and Booleans
// ------------------------------------------------------------
// 1. Add a variable "pet_info" equal to a object with the name (string) = Cinnamoroll, weight (number) =40,  happiness (number) = 40, and energy (number) = 100 of your pet
// 2. Set a boolean for actions to run when false, true for disable function
// ------------------------------------------------------------
var pet_info = { name: "Cinnamoroll", weight: 22, happiness: 40, energy: 100 };
//Excited dog: 100 wags per min
//happy dog: 60 wags per min
//upset dog: 20 wag per min or lower

//animations/gifs/images are not diabled
var isActionAnimationPlaying = false;

// ------------------------------------------------------------
// PSEUDOCODE: Stop All Sounds Function
// ------------------------------------------------------------
// 1. queryAllSelectorAll searches the whole HTML file for the audio tag

//2.  A for loop that checks the audio list:
//        - pause the  sounds so its stop playing
//        - reset the sounds to start from the beginning (0 seconds)
// ------------------------------------------------------------
function stopAllSounds() {
  //select all audios
  const audio = document.querySelectorAll("audio");
  //timer function
  audio.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
}

// ------------------------------------------------------------
// PSEUDOCODE: Play a single sound effect
// ------------------------------------------------------------
// FUNCTION playSound(id, volume, durationMs):
//
// 1. Stop any other sounds that might already be playing.
//
// 2. Find the specific <audio> element whose ID matches 'id'.
//      - If the sound cannot be found, stop the function.
//
// 3. Set the sound's volume to the given amount.
//
// 4. Reset the sound to the beginning (0 seconds).
//
// 5. Play the sound.
//
// 6. Start a timer for 'durationMs' milliseconds:
//        When the timer ends:
//            - Pause the sound
//            - Reset it back to the start (0 seconds)
//
//  This makes sure the sound does not play longer than intended.
// ------------------------------------------------------------
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

// ------------------------------------------------------------
// PSEUDOCODE: Treat button is clicked
// ------------------------------------------------------------
//
// 1. Increase the pet's happiness by 10.
//
// 2. Increase the pet's weight by 3.
//
// 3. Increase the pet's energy:
//        - If energy is already 100 or more, keep it at 100.
//        - Otherwise, add 5 energy.
//
// 4. Change the pet image to the eating animation:
//        - Fade the current image out.
//        - Swap the image source to the treat GIF.
//        - Fade the new image in.
//
// 5. Play the "treat" sound for 5 seconds at 80% volume.
//
// 6. Show a popup message: "Snack Time!".
//
// 7. Check the pet's stats and update the HTML
//    (this may trigger game over if stats are too low).
//
// 8. After 5 seconds (when animation finishes):
//        - Mark that no action animation is playing.
//        - Run the emotions() function to decide the new mood.
// ------------------------------------------------------------
function clickedTreatButton() {
  // Increase pet happiness
  pet_info.happiness += 10;
  // Increase pet weight
  pet_info.weight += 3;
  //Increase energy
  if (pet_info.energy >= 100) {
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
  playSound("sound-treat", 0.8, 5000);
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

// ------------------------------------------------------------
// PSEUDOCODE: Play button is clicked
// ------------------------------------------------------------
//
// 1. Increase the pet's happiness by 10.
//
// 2. Decrease the pet's weight by 1.
//
// 3. Decrease the pet's energy by 10.
//
// 4. Change the pet's image to the playing animation:
//        - Fade the current image out.
//        - Replace the image with "plays.gif".
//        - Fade the new image in.
//
// 5. Play the "play" sound for 5 seconds at 20% volume.
//
// 6. Show a popup message: "Play Time!".
//
// 7. Validate the pet’s stats and update the HTML display
//    (may trigger sleep or game over if values are too low).
//
// 8. After 5 seconds (when the animation finishes):
//        - Mark that no action animation is playing.
//        - Run the emotions() function to decide the pet's mood.
// ------------------------------------------------------------
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
  playSound("sound-play", 0.2, 5000);
  //play message
  popUp("Play Time!");
  //check stats
  checkAndUpdatePetInfoInHtml();
  //animation timer
  setTimeout(function () {
    isActionAnimationPlaying = false;
    emotions();
  }, 5000);
}

// ------------------------------------------------------------
// PSEUDOCODE: Exercise button is clicked
// ------------------------------------------------------------
//
// 1. Decrease the pet's happiness by 15.
//
// 2. Decrease the pet's weight by 2.
//
// 3. Decrease the pet's energy by 20.
//
// 4. Change the pet’s image to the exercise animation:
//        - Fade the current image out.
//        - Replace the image with the spinning-hoop GIF.
//        - Fade the new image in.
//
// 5. Play the "exercise" sound for 5 seconds at 20% volume.
//
// 6. Show a popup message: "Workout Time!".
//
// 7. Check the pet’s stats and update the HTML display
//    (this may trigger sleep or game over if values are too low).
//
// 8. After 5 seconds (once the animation finishes):
//        - Mark that the action animation is no longer playing.
//        - Call the emotions() function to update the pet's mood.
// ------------------------------------------------------------
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
  playSound("sound-exercise", 0.2, 5000);
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

// ------------------------------------------------------------
// PSEUDOCODE: Sleep button is clicked
// ------------------------------------------------------------
//
// 1. Change the pet's image to a sleeping animation:
//        - Fade the current image out.
//        - Replace the image with the sleep GIF.
//        - Fade the new image in.
//
// 2. Play the "sleep" sound for 5 seconds at 30% volume.
//
// 3. Show a popup message: "cinnamoroll is sleeping now."
//
// 4. Set the pet's energy to 100 (full recovery).
//
// 5. Check the pet’s stats and update the HTML
//    (this may trigger game over if something is out of range).
//
// 6. After 8 seconds (to match the longer sleep animation):
//        - Mark that no action animation is playing.
//        - Run emotions() to choose the pet’s new mood.
// ------------------------------------------------------------
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
  playSound("sound-sleep", 0.3, 5000);
  //play message
  popUp("cinnamoroll is sleeping now.");
  // Reset energy to 100
  pet_info.energy = 100;
  //check stats
  checkAndUpdatePetInfoInHtml();
  //animation timer
  setTimeout(function () {
    isActionAnimationPlaying = false;
    emotions();
  }, 8000);
}
//disable all buttons but restart
function setButtonsDisaabled(isDisabled) {
  $(".treat-button, .play-button, .exercise-button, .sleep-button").prop(
    "disabled",
    isDisabled
  );
} 

// ------------------------------------------------------------
// PSEUDOCODE: What happens when the Restart button is clicked
// ------------------------------------------------------------
//
// 1. Reset the pet's stats to their original values:
//        - weight = 22
//        - happiness = 60
//        - energy = 100
//
// 2. Update the HTML so the displayed stats match the reset values.
//
// 3. Re-enable all action buttons (Treat, Play, Exercise, Sleep).
//
// 4. Hide the Game Over box so the player can play again.
//
// 5. Reset the pet image back to the default happy animation:
//        - Fade the current image out.
//        - Swap the image source to the default GIF.
//        - Fade the new image in.
// ------------------------------------------------------------
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

// ------------------------------------------------------------
// PSEUDOCODE: Play  pet's emotion gift and sounds
// ------------------------------------------------------------
//
// 1. If the game is already over, stop immediately.
//
// 2. (Placeholder timeout — does nothing but kept for timing structure.)
//
// 3. If an action animation is currently playing, stop emotion animation from running.
//    (This prevents emotion changes while Treat/Play/Exercise/Sleep animations run.)
//
// 4. Check the pet's happiness to determine the mood:
//
//    A. If happiness is 60 or higher:
//         - Set the pet's image to the "excited" animation.
//         - Ensure happiness stays within 0–100 range.
//         - Play the excited sound.
//         - Show a popup message that the pet is very happy.
//
//    B. Else if happiness is between 21 and 59:
//         - Set the pet's image to the normal "happy" animation.
//         - Play the happy sound with playSound().
//
//    C. Else if happiness is between 1 and 20:
//         - Set the pet's image to the sad/upset animation.
//         - Play the sad sound with playSound().
//         - Show a popup saying the pet is upset  with popup().
//
//    D. Else (happiness is 0 or lower):
//         - Trigger the gameOver() sequence.
//
// ------------------------------------------------------------

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
    playSound("sound-excited", 0.5, 5000);
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
    playSound("sound-happy", 0.2, 5000);
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
    playSound("sound-sad", 0.5, 5000);
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
  //play message
  popUp("Your Cinnamoroll ran away!");
}

//check stats & update stats
function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

// ------------------------------------------------------------
// PSEUDOCODE: Validate the pet's stats before updating the HTML
// ------------------------------------------------------------
//
// 1. Check if any critical conditions are true:
//        - The pet's weight is below 10
//        - OR the pet's weight is above 50
//        - OR the pet's happiness is 0 or lower
//
//    If any of these conditions happen:
//        - Set happiness to 0
//        - Trigger the gameOver() function
//        - Stop the rest of the checks
//
// 2. Otherwise, check if energy is 0 or below:
//        - If so, automatically put the pet to sleep
//          by calling clickedSleepButton().
//
// 3. Otherwise (normal case):
//        - If happiness is above 100, cap it at 100.
//        - Otherwise, keep happiness the same.
//
// 4. (No return value — this function simply adjusts stats
//    and decides whether the game continues or ends.)
//
// ------------------------------------------------------------
//check stats
function checkWeightAndHappinessBeforeUpdating() {
  // Add conditional so if weight is lower than zero.
  if (pet_info.weight < 10 || pet_info.weight > 50 || pet_info.happiness <= 0) {
    pet_info.happiness = 0;
    pet_info.happiness = 0;
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

// ------------------------------------------------------------
// PSEUDOCODE: Update the HTML to show the pet's current stats
// ------------------------------------------------------------
//
// 1. Find the element that displays the pet's name,
//    and set its text to pet_info.name in span.
//
// 2. Find the element that displays the pet's weight,
//    and set its text to pet_info.weight in span.
//
// 3. Find the element that displays the pet's happiness,
//    and set its text to pet_info.happiness in span.
//
// 4. Find the element that displays the pet's energy,
//    and set its text to pet_info.energy in span.
//
// 5. This function refreshes the dashboard so the stats
//    always match the current pet_info values in span.
// ------------------------------------------------------------
// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  document.querySelector(".name").textContent = pet_info.name;
  document.querySelector(".weight").textContent = pet_info.weight;
  document.querySelector(".happiness").textContent = pet_info.happiness;
  document.querySelector(".energy").textContent = pet_info.energy;
}


// ------------------------------------------------------------
// PSEUDOCODE: Show popup message
// ------------------------------------------------------------
//
// FUNCTION popUp(message):
//
// 1. Set the popup box width to 950 pixels wit the width(), normallly
// it would retrieve the width of of the element.
//
// 2. Add the CSS class "mod" to the popup box.
//
// 3. Find gets the element that matches (.show-message) inside the popup
//    and set its text to the message provided.
//
// 4. Fade the popup box into view over 500 milliseconds.
//
// 5. Start a 5-second timer:
//        When time is up,
//            - Fade the popup box out over 500 milliseconds.
//
// 6. The popup automatically disappears after 5 seconds.
// ------------------------------------------------------------

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
