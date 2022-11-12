// parse the JSON scores in localStorage

var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores)

for(var i=0; i < highScores.length; i++) {
  var listEl = document.createElement('li');
  listEl.textContent = highScores[i].initials + ' : ' + highScores[i].score;

  var orderedList = document.querySelector("#highscores");
  orderedList.appendChild(listEl);
}

function deleteHighScores() {
  window.localStorage.removeItem('highScores');
  window.location.reload();
}

document.querySelector("#clear").onclick = deleteHighScores;