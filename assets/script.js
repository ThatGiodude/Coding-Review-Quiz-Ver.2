let mainsection = document.querySelector("main");
let timerEl = document.getElementById("timer");
let buttonStart = document.getElementById("start-button");
let highscores = document.getElementById("check-high-scores");
let timeleft = 60;

buttonStart.addEventListener("click", startQuiz);
highscores.addEventListener("click", viewHighScores);

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