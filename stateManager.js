function setState(next) {
  game.state = next;
}

function currentScene() {
  switch (game.state) {
    case STATES.TITLE:
      return TitleScene;
    case STATES.S1:
      return Scene1;
    case STATES.S2A:
      return Scene2A;
    case STATES.S2B:
      return Scene2B;
    case STATES.S3A:
      return Scene3A;
    case STATES.S3B:
      return Scene3B;
    case STATES.END:
      return EndingsScene;
    default:
      return TitleScene;
  }
}

function sceneDraw() {
  currentScene().draw();
}

function sceneMousePressed() {
  const s = currentScene();
  if (s && typeof s.mousePressed === "function") s.mousePressed();
}
