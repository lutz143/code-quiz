// grab elements from DOM
var startScreenEl = document.querySelector("#start-screen");
var time = document.querySelector("#time");
var startBtn = document.querySelector("#start");
var submitBtn = document.querySelector("#submit");
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
numbQuestions = Object.keys(questions).length;
var quizTime = numbQuestions * 10;

console.log(numbQuestions);
console.log(quizTime);

// when user clicks start, a timer is initiated
function startTimer(){
  startScreenEl.setAttribute("class", "hide");
  console.log('is working');

  timeLeft = setInterval(countdown, 1000);
}

function countdown(){  
  quizTime--;
  time.textContent = quizTime;

  if (quizTime <= 0){
    window.location.reload();
  }
}

startBtn.onclick = startTimer;