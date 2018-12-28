// add the disable class to buttons when game is over

// UI Controller
// Go Button
// Behind the DOM
// Access the input value
// Guess is stored to the guesses
// The guess is compared with the random num
// DOM
// Message
// Guessed Num
// Content
// Styling
// Reset Button
// Message - Guess a number between 1 and 100!
// Guessed Num
// Content
// Styling 
// Hint Button 
// Behind the DOM
// Create a hint message
// DOM
// Message

// data variables
let randNum, currentGuess, allGuesses, gamePlaying, guessCount, msg, hints, hintsInd;
// DOM variables
let currentGuessDOM, resetDOM, hintDOM, prevGuessDOM, msgDOM;

init();

function init() {
    // data variables initialization
    randNum = Math.ceil((Math.random() * 100));
    allGuesses = [];
    gamePlaying = true;
    guessCount = 0;
    hints = [randNum % 2 === 0, randNum % 3 === 0, randNum % 7 === 0, randNum > 50];

    msg = ['Too Bad.', 'Getting Closer.', 'Almost!', 'Come on.']
    // DOM variables initialization
    currentGuessDOM = document.querySelector('#currentGuess');
    resetDOM = document.querySelector('#reset');
    hintDOM = document.querySelector('#hint');
    prevGuessDOM = document.querySelectorAll('.guesses__item');
    msgDOM = document.querySelector('.message__content');

    for (let guess of prevGuessDOM) {
        guess.innerHTML = '<i class="fas fa-question"></i>';
    }

    sendMsg('Guess a number between 1 - 100!');
    currentGuessDOM.placeholder = 'Enter your guess!'
    currentGuessDOM.value = null;

}

function sendMsg(text) {
    msgDOM.textContent = text;
}

// Event Handlers below
// enter your guess
currentGuessDOM.addEventListener('keypress', function (event) {
    // if user presses enter
    if (event.keycode === 13 || event.which === 13) {
        currentGuess = Number(currentGuessDOM.value);
        console.log(currentGuess, randNum);
        // valid entry
        if (typeof currentGuess === 'number' && currentGuess >= 1 && currentGuess <= 100) {
            // keep count and store the guess
            guessCount++;
            allGuesses.push(currentGuess);
            // display the entry
            prevGuessDOM[guessCount - 1].innerHTML = currentGuess;

            // check logic
            if (currentGuess === randNum) {
                sendMsg(`Congratulations! The Number is ${randNum}`);
            } else {
                if (guessCount < 5) {
                    // next guess should be smaller
                    let randomMsg = msg[Math.floor(Math.random() * msg.length)];
                    if (currentGuess > randNum) {
                        sendMsg(`${randomMsg} Try lower.`)
                        // next guess should be higher
                    } else {
                        sendMsg(`${randomMsg} Try higher.`)
                    }
                } else {
                    sendMsg(`Sorry. The number is ${randNum}`)
                }
            }
            // invalid entry    
        } else {
            sendMsg('Invalid Entry. Please Enter Again.')
        }
    }
})

// Event handler - Reset
resetDOM.addEventListener('click', init);

// Event handler - hint
hintDOM.addEventListener('click', function () {
    let randomHintInd = Math.floor((Math.random() * hints.length));


    switch (randomHintInd) {
        case 0:
            sendMsg(`Is the number divisible by 2? ${hints[randomHintInd]}`);
            break;
        case 1:
            sendMsg(`Is the number divisible by 3? ${hints[randomHintInd]}`);
            break;
        case 2:
            sendMsg(`Is the number divisible by 7? ${hints[randomHintInd]}`);
            break;
        case 3:
            sendMsg(`Is the number greater than 50? ${hints[randomHintInd]}`);
            break;
    }
})


hints = [randNum % 2 === 0, randNum % 3 === 0, randNum % 7 === 0, randNum > 50];