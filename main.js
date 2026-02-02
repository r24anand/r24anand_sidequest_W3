let cnv;

function setup() {
  cnv = createCanvas(900, 520);
  textFont("system-ui");

  // Bind input directly to canvas: cannot be overridden by other files
  cnv.mousePressed(() => handleClick(mouseX, mouseY));
  cnv.touchStarted(() => {
    handleClick(mouseX, mouseY);
    return false;
  });
}

function draw() {
  background(11, 13, 18);

  // subtle grid
  push();
  stroke(255, 255, 255, 10);
  for (let x = 0; x < width; x += 24) line(x, 0, x, height);
  for (let y = 0; y < height; y += 24) line(0, y, width, y);
  pop();

  drawNode();
}
