// Initializing global Variables 

var questionIndex = 0;
var seconds = (questions.length * 15);
var time;

var GameVar = document.getElementById("startQuizGame");

var descVar = document.getElementById("description");
var timerVar = document.getElementById("timerBox");
var quizHolderVar = document.getElementById("quizHolder");
var choicesVar = document.getElementById("choices");
var checkAnswerVar = document.getElementById("rightWrong");

var submitBtnVar = document.getElementById("submit");
var initialsBox = document.getElementById("intials");

function startQuizGame(){
    descVar.setAttribute("class","invisible");
    time = setInterval(countDown, 1000);
    quizHolderVar.removeAttribute("class");
    printQuestions();
}
function printQuestions(){

    var curQuestion = questions[questionIndex];
    var quesTitle = document.getElementById("title");
    quesTitle.textContent = curQuestion.title;
    choicesVar.innerHTML="";
        curQuestion.choices.forEach(function(choice, i){
        var printChoice = document.createElement("p");
        printChoice.setAttribute("class","choice");
        printChoice.setAttribute("value",choice);
        printChoice.textContent = i + 1 + ". " + choice;
        choicesVar.appendChild(printChoice);
    printChoice.onclick = checkAnswer;   
    });
}

function checkAnswer() {
    if(this.textContent !== questions[questionIndex].answer){
        seconds -= 10;
        if (seconds <= 0){
            clearInterval(time);
            seconds=0;
        }
            timerVar.textContent = seconds;
            rightWrong.textContent = "You are Wrong !!!";
    } 
    else { 
        rightWrong.textContent = "You are Right !!!";
    }
    checkAnswerVar.setAttribute("class", "rightWrong text-center");
    questionIndex ++;
    if(questionIndex === questions.length) {
        endQuizGame();
    }else {
        printQuestions();
    }
}

function endQuizGame() {
    quizHolderVar.setAttribute("class","invisible");
    checkAnswerVar.setAttribute("class","invisible");
    var endGame = document.getElementById("finishQuizGame");
    endGame.removeAttribute("class");
    clearInterval(time);
    var finalScore= document.getElementById("totalScore");
    finalScore.innerHTML= seconds;
}

function countDown(){
    timerVar.innerHTML = seconds;
    seconds--;
    if(seconds == 0) {
        endQuizGame();
    }
}

function saveHighscore() {
    var initials = initialsBox.value.trim();
    if (initials !== "") {
      var highscores = JSON.parse(window.localStorage.getItem("highscore")) || [];
      var newScore = {
        initials: initials,
        score: seconds
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscore", JSON.stringify(highscores));

    }
  }

function loadHighScores(){
    descVar.setAttribute("class","invisible");
    quizHolderVar.setAttribute("class","invisible");
    checkAnswerVar.setAttribute("class","invisible");
    var results = document.getElementById("finishQuizGame")
    results.removeAttribute("class");
    results.innerHTML="";
    var highScoresHeading = document.createElement('h1');
    highScoresHeading.setAttribute("class","text-center jumbotron");
    highScoresHeading.textContent = "--- HIGH SCORES ---";
    results.appendChild(highScoresHeading);
    var highscore = JSON.parse(window.localStorage.getItem('highscore')) || [];
    highscore.forEach(function(score) {
        var results = document.createElement("p");
        results.setAttribute("class","text-center list-group-item");
        results.textContent = score.initials + " : " + score.score;
        var printHighScore = document.getElementById("finishQuizGame");
        printHighScore.appendChild(results);
        
    });
    }

