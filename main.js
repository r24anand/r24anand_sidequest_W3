function setup() {
  createCanvas(900, 520);
  textFont("system-ui");
  noSmooth();
}

function draw() {
  background(11, 13, 18);

  // subtle grid
  push();
  stroke(255, 255, 255, 10);
  for (let x = 0; x < width; x += 24) line(x, 0, x, height);
  for (let y = 0; y < height; y += 24) line(0, y, width, y);
  pop();

  sceneDraw();
}

function mousePressed() {
  sceneMousePressed();
  return false;
}

function mouseClicked() {
  // some browsers fire clicked more reliably than pressed
  sceneMousePressed();
  return false;
}

function touchStarted() {
  sceneMousePressed();
  return false;
}
