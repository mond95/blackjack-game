let player = {
    name: "Monica",
    chips: 200,
    }


let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let newCardButton = document.getElementById("new-card")
let errorMessage = document.getElementById("error-message")
let startButton = document.getElementById("start-game")
let isDarkMode = false


playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    resetButtonStyles()
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
    errorMessage.style.display = "none"
    applyButtonHoverStyles()
   
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
        // newCardButton.style.backgroundColor = "goldenrod"        
    }
    else {
        newCardButton.style.backgroundColor = "grey"
        errorMessage.style.display = "block"
        turnOffHoverStyles()
    }
}

errorMessage.style.display = "none"

// ISSUE 1 = making the new card button go back to default styling when click 'Start game' again
//  Add two variables to store the original button background color and text color:
let defaultButtonBgColor = "goldenrod";
let defaultButtonTextColor = "#016f32";

// Create two variables to store the hover background color and text color of the button:

let hoverButtonBgColor = "rgb(255, 240, 34)";
let hoverButtonTextColor = "#1fc96b";

// Create a function called `resetButtonStyles()` that resets the background color 
// and text color of the "New Card" button to their default values:
function resetButtonStyles() {
    newCardButton.style.backgroundColor = defaultButtonBgColor;
    newCardButton.style.color = defaultButtonTextColor;
  }

  //  Create a function called `applyButtonHoverStyles()` that applies the hover background color and text color to the "New Card" button:
  function applyButtonHoverStyles() {

    newCardButton.addEventListener('mouseenter', function() {
        newCardButton.style.backgroundColor = 'yellow';
        newCardButton.style.color = 'green';
      });
    
      newCardButton.addEventListener('mouseleave', function() {
        newCardButton.style.backgroundColor = defaultButtonBgColor;
        newCardButton.style.color = defaultButtonTextColor;
      });
  }


  // ISSUE 2: The new card button wasn't staying grey after you lost and once you hover off it, it changed to the default
  // styling for some reason as set in the previous 2 functions even before clicking the 'start button' so not sure why
  // to fix this I made the below function and put this inside of the newCard() function at the end of it
  function turnOffHoverStyles() {
    newCardButton.addEventListener('mouseenter', function() {
        newCardButton.style.backgroundColor = 'grey';
        newCardButton.style.color = 'green';
      });
    
      newCardButton.addEventListener('mouseleave', function() {
        newCardButton.style.backgroundColor = 'grey'
        newCardButton.style.color = 'green'
      });
  }

  