// parse the JSON scores in localStorage
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// iterate over the parsed scores, create a list item and display on the page by appending the initials/score
for(var i=0; i < highScores.length; i++) {
  var listEl = document.createElement('li');
  listEl.textContent = highScores[i].initials + ' : ' + highScores[i].score;

  var orderedList = document.querySelector("#highscores");
  orderedList.appendChild(listEl);
}

// should the user select 'clear high scores', then target the local storage variable and remove
function deleteHighScores() {
  window.localStorage.removeItem('highScores');
  window.location.reload();
}

document.querySelector("#clear").onclick = deleteHighScores;