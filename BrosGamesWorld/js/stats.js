showHighscore("snake-hs", "snake-highscore");
showHighscore("game-2048-hs", "2048-highscore");
showHighscore("flappy-bird-hs", "flappy-bird-highscore");

showHighscore("snake-score-over-ten", "snake-score-over-ten");
showHighscore("snake-all-time-apples-eaten", "snake-all-time-apples-eaten");

showHighscore("tic-tac-toe-wins", "tic-tac-toe-wins");
showHighscore("tic-tac-toe-ties", "tic-tac-toe-ties");
showHighscore("tic-tac-toe-losses", "tic-tac-toe-losses");

function showHighscore(id, gameVarName) {
  if (playedGame(gameVarName)) {
    document.getElementById(id).innerHTML = localStorage.getItem(gameVarName);
  }
}

function playedGame(gameVarName) {
  return localStorage.getItem(gameVarName) != null;
}
