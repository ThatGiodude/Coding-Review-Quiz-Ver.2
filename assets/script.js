let mainsection = document.querySelector("main");
let timerEl = document.getElementById("timer");
let buttonStart = document.querySelector(".start-button"); 
let highscoresLink = document.getElementById("check-high-scores"); 
let timeLeft = 60;
let clearHighScoresButton = document.getElementById("clear-high-scores-button");

// Index to keep track of current question
let currentQuestionIndex = 0;

const testQuestions = [
    {
        title: "Commonly used data types DO NOT include?",
        options: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer:  "Alerts",
    },
    {
        title: "The condition in an if/else statement is enclosed within _____.",
        options: ["Quotes", "Curley Brackets", "Parenthesis", "Square Brackets"],
        answer: "Parenthesis",
    },
    {
        title: "Arrays in JavaScript can be used to store _____?",
        options: ["Numbers and Arrays", "Other Arrays", "Booleans", "All of the above"],
        answer: "All of the above",
    },
    {
        title: "String values must be enclosed within ______ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes",
    },
    {
        title: "A very usefool tool used during development and debugging for printing content to the debugger is: ",
        options: ["JavaScript", "Terminal/Bash", "For Loops", "Console.Log"],
        answer: "Console.Log",
    }
]

// Function to start the quiz, immediately hide the start button.
function startQuiz() { 
    buttonStart.style.display = "none";
    // Display initial time and display the countdown.
    timerEl.textContent = `Time: ${timeLeft}`;
    let timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}`;
        // End quiz when time is up or all questions answered
        if (timeLeft <= 0 || currentQuestionIndex >= testQuestions.length) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
    // Display the first question and start the quiz.
    displayQuestion();
}

// Function to display a question
function displayQuestion() {
    let currentQuestion = testQuestions[currentQuestionIndex];
    // Display question title
    mainsection.innerHTML = `<h2>${currentQuestion.title}</h2>`;
    // Display options as buttons
    currentQuestion.options.forEach(option => {
        let button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option, currentQuestion.answer));
        mainsection.appendChild(button);
    });
}

// Function to check the selected answer
function checkAnswer(selected, correctAnswer) {
    // Penalize time if answer is wrong
    if (selected !== correctAnswer) {
        timeLeft -= 13; // Had to fix this numerous times. Needed to make a decent penalization for a wrong answer.
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < testQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// Function to end the quiz and display the prompt to upload your score to the local storage.
function endQuiz() {
    mainsection.innerHTML = 
    `<h2>Quiz finished!</h2>
    <p>Your score: ${timeLeft}</p>
    <label for="initials">Enter your initials:</label>
    <input type="text" id="initials">
    <button id="submit-score">Submit</button>`;
    document.getElementById("submit-score").addEventListener("click", saveScore);
}

// Function to save the score with initials and adds the score to an array. 
function saveScore() {
    let initials = document.getElementById("initials").value;
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ initials, score: timeLeft });
    localStorage.setItem("scores", JSON.stringify(scores));
    showHighScores(new Event('click')); // Simulate a click event on the high scores link
}

// Function to show high scores and list them out in decending order from highest to lowest. Could make a tier list?
function showHighScores(event) {
    event.preventDefault();
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    mainsection.innerHTML = '<h2>High Scores</h2><ol id="scores-list"></ol>'; // Changed ul to ol for ordered list
    let scoresList = document.getElementById("scores-list");
    scores.sort((a, b) => b.score - a.score);
    scores.forEach((score) => {
        let li = document.createElement("li");
        li.textContent = `${score.initials}: ${score.score}`; // Added index + 1 to display rank
        scoresList.appendChild(li);
    });
}
// Function to clear high scores from the local storage.
function clearHighScores() {
    localStorage.removeItem("scores");
    mainsection.innerHTML = '<h2>High Scores Cleared!</h2>';
}
// Function to restart the quiz without having to refresh the page. It resets the time as well.
function resetQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
    startQuiz();
}

//Buttons
buttonStart.addEventListener("click", startQuiz); 
highscoresLink.addEventListener("click", showHighScores); 
clearHighScoresButton.addEventListener("click", clearHighScores);
document.getElementById("reload-quiz-button").addEventListener("click", resetQuiz);