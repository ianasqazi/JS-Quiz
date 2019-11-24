// Initializing global Variables 

var questionIndex = 0;
var seconds = (questions.length * 15); // Seconds will be calculated based on number of questions in the object questions
var time; 

var GameVar = document.getElementById("startQuizGame");

var descVar = document.getElementById("description");
var timerVar = document.getElementById("timerBox");
var quizHolderVar = document.getElementById("quizHolder");
var choicesVar = document.getElementById("choices");
var checkAnswerVar = document.getElementById("rightWrong");

var submitBtnVar = document.getElementById("submit");
var initialsBox = document.getElementById("intials");


// Function to start the Quiz Game .. onclick Start Quiz button 

function startQuizGame(){
    
    // Hide the Description div
    descVar.setAttribute("class","invisible");
    
    // Start the countDown of timer 
    time = setInterval(countDown, 1000);

    // Un-Hide the div Quiz Holder to print the questions 
    quizHolderVar.removeAttribute("class");

    // Call function to print the questions dynamically
    printQuestions();
}


// Function to print the questions from questions.js script

function printQuestions(){

    // Printing question into the Quiz Holder Title element
    descVar.innerHTML="";
    var curQuestion = questions[questionIndex];
    var quesTitle = document.getElementById("title");
    quesTitle.textContent = curQuestion.title;
    
    // Printing choices into the Quiz Holder div element
    choicesVar.innerHTML="";
    curQuestion.choices.forEach(function(choice, i){
    var printChoice = document.createElement("p");
    printChoice.setAttribute("class","choice");
    printChoice.setAttribute("value",choice);
    printChoice.textContent = i + 1 + ". " + choice;
    choicesVar.appendChild(printChoice);

    // onClick the answer execute function checkAnswer
    printChoice.onclick = checkAnswer;   
    });
}


// Function to check the answer is right or wrong 

function checkAnswer() {

    // If the answer is  - NOT - correct 
    if(this.textContent !== questions[questionIndex].answer){
        seconds -= 10; // remove 10 from total score 
        if (seconds <= 0){
            clearInterval(time);
            seconds=0;
        }
            timerVar.textContent = seconds;
            rightWrong.textContent = "You were Wrong !!!";
            checkAnswerVar.setAttribute("class", "rightWrong text-center alert alert-danger"); // alert in red if wrong
    } 
    // If the answer is correct 
    else { 
        rightWrong.textContent = "You were Right !!!";
        checkAnswerVar.setAttribute("class", "rightWrong text-center alert alert-primary"); // alert in blue if correct

    }

    questionIndex ++;

    // checking if all questions are printed or not & End Game if all printed 
    if(questionIndex === questions.length) {
        endQuizGame();
    }else {
        printQuestions();
    }
}


// Function to End the game and show Results 

function endQuizGame() {

    // Clear all divs to display results
    descVar.innerHTML="";
    quizHolderVar.innerHTML = "";
    checkAnswerVar.innerHTML = "";
    checkAnswerVar.removeAttribute("class");
    var endGame = document.getElementById("finishQuizGame");
    endGame.removeAttribute("class");

    clearInterval(time); // stop countdown timer to save score 
    var finalScore= document.getElementById("totalScore");
    finalScore.innerHTML= seconds; // Print final score in highlight
}


// Function to stop countdown timer 

function countDown(){
    timerVar.innerHTML = seconds;
    seconds--;
    // If timer reaches zero End the game 
    if(seconds == 0) {
        endQuizGame();
    }
}

// Function to save your highscore into browsers localStorage
function saveHighscore() {
    var initials = initialsBox.value.trim(); // input value from user
    if (initials !== "") {

      // creating an array of highscores
      var highscores = JSON.parse(window.localStorage.getItem("highscore")) || [];
      
      // storing user input and score as an object into the array 
      var newScore = {
        initials: initials,
        score: seconds
      };
      highscores.push(newScore);

      // saving object to localStorage
      window.localStorage.setItem("highscore", JSON.stringify(highscores));
      loadHighScores();

    }
  }


// Function to load the Highscores 

function loadHighScores(){

    // clear all divs to display results 
    descVar.innerHTML="";
    quizHolderVar.innerHTML = "";
    checkAnswerVar.innerHTML = "";
    checkAnswerVar.removeAttribute("class");

    var results = document.getElementById("finishQuizGame")
    results.removeAttribute("class");
    results.innerHTML="";

    // Display results by creating elements dynamically -- Heading for Highscores 
    var highScoresHeading = document.createElement("h1");
    highScoresHeading.setAttribute("class","text-center jumbotron");
    highScoresHeading.textContent = "HIGH SCORES";
    results.appendChild(highScoresHeading);

    // Retrieve objects array from localStorage and append to div
    var highscore = JSON.parse(window.localStorage.getItem('highscore')) || [];
    highscore.forEach(function(score) {
        var results = document.createElement("p");
        results.setAttribute("class","text-center list-group-item");
        results.textContent = score.initials + " : " + score.score;
        var printHighScore = document.getElementById("finishQuizGame");
        printHighScore.appendChild(results);
    });

    }
