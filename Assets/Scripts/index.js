// Outline and Psuedo Code provided from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash

// 1. GENERATE random number between 1 and 100
// 2. RECORD player's turn number, start on 1
// 3. Player SUBMITS GUESS of random number
// 4. RECORD and DISPLAY current/previous player GUESSES
// 5. CHECK player GUESS against the random number
// 6.1. IF GUESS TRUE => DISPLAY congratulations message
// 6.2. IF GUESS TRUE => PREVENT player from SUBMITTING more GUESSES
// 6.3. IF GUESS TRUE => DISPLAY 'RESTART' BUTTON
// 7.1. IF GUESS FALSE and TURNS TRUE => DISPLAY 'INCORRECT' message and high/low HINT
// 7.2. IF GUESS FALSE and TURNS TRUE => ALLOW player to make another GUESS
// 7.3. IF GUESS FALSE and TURNS TRUE => INCREMENT TURN number by +1
// 8.1. IF GUESS FALSE and TURNS FALSE => DISPLAY 'GAME OVER' message
// 8.2. IF GUESS FALSE and TURNS FALSE => PREVENT player from SUBMITTING more GUESSES
// 8.3. IF GUESS FALSE and TURNS FALSE => DISPLAY 'RESTART' BUTTON
// 9. IF 'RESTART' CLICKED => GAME LOGIC and UI RESET => RETURN to 'STEP 1'

let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

function checkGuess() {
    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
};

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame);
};