showHighscore("snake-hs", "snake-highscore");
showHighscore("game-2048-hs", "2048-highscore");
showHighscore("flappy-bird-hs", "flappy-bird-highscore");

function showHighscore(id, gameVarName) {
  if (playedGame(gameVarName)) {
    document.getElementById(id).innerHTML = localStorage.getItem(gameVarName);
  }
}

function playedGame(gameVarName) {
  return localStorage.getItem(gameVarName) != null;
}
