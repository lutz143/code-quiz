// grab elements from DOM
var startScreenEl = document.querySelector("#start-screen");
var time = document.querySelector("#time");
var startBtn = document.querySelector("#start");
var submitBtn = document.querySelector("#submit");
var choicesEl = document.getElementById('choices');
var feedbackEl = document.querySelector("#feedback");
var endScreenEl = document.querySelector("#end-screen");
var questionsEl = document.querySelector("#questions");

// console.log(time);
console.log(startBtn);
console.log(submitBtn);
console.log(feedbackEl);
console.log(endScreenEl);
console.log(questionsEl);

var timeLeft;
var numbQuestions = Object.keys(questions).length;
var quizTime = numbQuestions * 10;
var randIndex = randIndex();

console.log(randIndex);
console.log(numbQuestions);
console.log(quizTime);

// when user clicks start, a timer is initiated
function startTimer(){
  startScreenEl.setAttribute("class", "hide");
  console.log('is working');
  
  questionsEl.removeAttribute("class");

  timeLeft = setInterval(countdown, 1000);

  retrieveQuestion();
}

function countdown(){  
  quizTime--;
  time.textContent = quizTime;

  if (quizTime <= 0){
    // call the end of the quiz, displaying score and asking for user's initials to log score
    window.location.reload();
  }
}

function randIndex(){
  var randIndex = Math.floor(Math.random() * questions.length);
  return randIndex;
}



function retrieveQuestion(){
  quesTitle = questionsEl.querySelector("question-title");
  
  var question = questions[randIndex];

  console.log(question);

  questionsEl.children[0].textContent = question.title;

  for(var i=0; i < question.choices.length; i++) {
    var choice = question.choices[i];
    var choiceDecision = document.createElement("button");

    choiceDecision.setAttribute('class', 'choice');
    choiceDecision.setAttribute('value', choice);

    choiceDecision.textContent = i + 1 +  ') ' + choice;
    questionsEl.children[1].appendChild(choiceDecision);
  }
}

function selection(event){
  var buttonEl = event.target;
  
  console.log(questions[randIndex].answer);
  console.log(buttonEl.value);
  
  if (buttonEl.value !== questions[randIndex].answer) {
    // penalize time
    quizTime -= 5;

    if (quizTime < 0) {
      quizTime = 0;
    }

    // display new time on page
    time.textContent = quizTime;

    // play "wrong" sound effect
    // sfxWrong.play();

    feedbackEl.textContent = 'Wrong!';
  } else {
    // play "right" sound effect
    // sfxRight.play();

    feedbackEl.textContent = 'Correct!';
  }

    // flash right/wrong feedback on page for half a second
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
      feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);
}

startBtn.onclick = startTimer;

choicesEl.onclick = selection;