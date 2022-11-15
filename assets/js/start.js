// grab elements from DOM
var startScreenEl = document.querySelector("#start-screen");
var time = document.querySelector("#time");
var startBtn = document.querySelector("#start");
var submitBtn = document.querySelector("#submit");
var choicesEl = document.getElementById('choices');
var feedbackEl = document.querySelector("#feedback");
var endScreenEl = document.querySelector("#end-screen");
var questionsEl = document.querySelector("#questions");
// sounds
var noiseRight = new Audio('assets/sfx/correct.wav');
var noiseWrong = new Audio('assets/sfx/incorrect.wav');

// create an empty variable to set interval later
var timeLeft;
// create variable to house the number of questions in the quesions.js object
var numbQuestions = Object.keys(questions).length;
// create variable that will add 10 seconds for every question in the questions object
var quizTime = numbQuestions * 10;
// create an empty variable to store the randIndex generator we will use to select the question
var randIndex = randIndex();
// create an empty array to capture running total
var running_total = [];

// when user clicks start, a timer is initiated
function startTimer() {
  // hide the start screen
  startScreenEl.setAttribute("class", "hide");
  // display our questions element container by removing its hidden class styling
  questionsEl.removeAttribute("class");
  //  set out timer countdown
  timeLeft = setInterval(countdown, 1000);
  // display the initial countdown (50 in this example)
  time.textContent = quizTime;
  // retrieve our first random question by calling the retrieveQuestion function
  retrieveQuestion();
}

function countdown() {  
  // remove a second during our countdown as the interval plays
  quizTime--;
  // display the countdown
  time.textContent = quizTime;

  if (quizTime <= 0){
    // call the end of the quiz, displaying score and asking for user's initials to log score
    quizComplete();
  }
}

function randIndex() {
  // randomly select a number to be used as our index to find a random question to retrieve
  var randIndex = Math.floor(Math.random() * questions.length);
  return randIndex;
}

function retrieveQuestion() {
  // if the randIndex is strictly equal to our length of questions, set to 0 as arrays begin with zero
  // and therefore our randIndex function may have one too many indexes to select (probably could have
  // subtracted 1 from randIndex() function but this seemed more fun)
  if (randIndex === questions.length) {
    randIndex = 0
  }
  // select the question title element and store in a variable
  quesTitle = questionsEl.querySelector("question-title");
  // pick our question by indexing it
  var question = questions[randIndex];
  // display the question title
  questionsEl.children[0].textContent = question.title;
  choicesEl.innerHTML = "";

  // iterative over the question choices and render the choice decisions
  for(var i=0; i < question.choices.length; i++) {
    var choice = question.choices[i];
    var choiceDecision = document.createElement("button");

    choiceDecision.setAttribute('class', 'choice');
    choiceDecision.setAttribute('value', choice);

    choiceDecision.textContent = i + 1 +  ') ' + choice;
    questionsEl.children[1].appendChild(choiceDecision);
  }     
}

function selection(event) {
  // capture which choice was selected
  var buttonEl = event.target;  
  // add to our running total so we don't go over the number of questions and start over in the time allowed
  running_total.push(1);
  
  // if the button that is selected is not the answer, penalize time
  if (buttonEl.value !== questions[randIndex].answer) {
    // penalize time
    quizTime -= 5;
    // do not go past zero in our quiz time
    if (quizTime < 0) {
      quizTime = 0;
    }

    // display new time on page
    time.textContent = quizTime;

    // play the sound for a wrong answer and display message
    noiseWrong.play();

    feedbackEl.textContent = 'Wrong!';
  } else {
    // play the sound for a correct answer and display message
    noiseRight.play();

    feedbackEl.textContent = 'Correct!';
  }
    // show the message quickly on whether they got the answer right or wrong
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
      feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);
    
    // add 1 to our randIndex if we're not at the total number of questions
  if (randIndex < questions.length) {
    randIndex++;
  } else {
    randIndex = 0
  }
  // check if we've run out of questions, if so we'll complete the quiz and go to the highscore, otherwise
  // retrieve a new question
  if (time <= 0 || running_total.length + 1 > questions.length) {
    quizComplete();
    
  } else {
    retrieveQuestion();
  }
}

function quizComplete() {
  // quiz has finished so stop the countdown
  clearInterval(timeLeft);

  // clear the style hiding the end screen (show end screen)
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');

  // grab the final score (total amount of time left) and render it on the page
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = quizTime + ' seconds';
  // hide the questions
  questionsEl.setAttribute('class', 'hide');
}

function highScoreInput() {
  // target the initials ID and receive an input value from the user
  var initialsEl = document.querySelector("#initials");
  var initials = initialsEl.value.trim();
  var initials = initials.toUpperCase();
  // check local storage to determine if there are any prior high scores and parse the JSON object
  // if the user did not enter blanks, create and object and stringify it for JSON into local storage
  // once this is complete, push the new high score
  if (initials !== ''){
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
     
    var score = {
      "initials": initials,
      "score": quizTime
    };

    highScores.push(score);

    localStorage.setItem("highScores", JSON.stringify(highScores));
  
  } else {
    alert("Please add initials, otherwise close the browser");
  }

  // display the list of highscores by opening the new page
  window.location.href = 'highscores.html';
  
}

function submitInitials(){

}

startBtn.onclick = startTimer;
choicesEl.onclick = selection;
submitBtn.onclick = highScoreInput;