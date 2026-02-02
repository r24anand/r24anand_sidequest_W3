function drawPanel(x, y, w, h) {
  push();
  noStroke();
  fill(18, 22, 33, 235);
  rect(x, y, w, h, 16);
  pop();
}

function drawHeader(title, subtitle) {
  push();
  fill(233, 238, 252);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(28);
  text(title, 36, 28);
  textStyle(NORMAL);
  textSize(14);
  fill(185, 196, 220);
  text(subtitle, 36, 62);
  pop();
}

function drawStatBar() {
  // Karma range visualization: -5..+5 (clamped)
  const k = clamp(game.karma, -5, 5);
  const x = 36,
    y = 92,
    w = 360,
    h = 14;

  push();
  noStroke();
  fill(255, 255, 255, 18);
  rect(x, y, w, h, 8);

  const mid = x + w / 2;
  const px = map(k, -5, 5, x, x + w);

  // negative fill
  fill(255, 120, 120, 140);
  rect(Math.min(px, mid), y, Math.abs(px - mid), h, 8);

  // positive fill
  fill(120, 255, 190, 140);
  rect(Math.min(px, mid), y, Math.abs(px - mid), h, 8);

  // center line
  stroke(255, 255, 255, 40);
  line(mid, y - 2, mid, y + h + 2);

  noStroke();
  fill(233, 238, 252);
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text(`KARMA: ${game.karma}`, x, y - 6);
  pop();
}

function buttonRect(cx, cy, w, h) {
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}

function drawButton(label, cx, cy, w, h, hot) {
  const r = buttonRect(cx, cy, w, h);
  const hovering = isHover(r);

  push();
  noStroke();
  if (hot || hovering) fill(90, 120, 255, 210);
  else fill(255, 255, 255, 18);
  rect(r.x, r.y, r.w, r.h, 14);

  fill(233, 238, 252);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(label, cx, cy);
  pop();

  return { ...r, hovering };
}

function drawBodyText(lines, x, y, w, lineH = 22) {
  push();
  fill(233, 238, 252);
  textAlign(LEFT, TOP);
  textSize(16);

  let yy = y;
  for (const line of lines) {
    text(line, x, yy, w);
    yy += lineH;
  }
  pop();
}
