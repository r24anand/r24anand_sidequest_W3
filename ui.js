function panel(x, y, w, h) {
  push();
  noStroke();
  fill(18, 22, 33, 235);
  rect(x, y, w, h, 18);
  pop();
}

function header(title, subtitle) {
  push();
  fill(233, 238, 252);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(28);
  text(title, 34, 26);

  textStyle(NORMAL);
  textSize(14);
  fill(185, 196, 220);
  text(subtitle, 34, 60);
  pop();
}

function statBar(trust) {
  const x = 34,
    y = 92,
    w = 320,
    h = 12;
  const t = constrain(trust, -10, 10);

  push();
  noStroke();
  fill(255, 255, 255, 18);
  rect(x, y, w, h, 8);

  const mid = x + w / 2;
  const px = map(t, -10, 10, x, x + w);

  fill(255, 120, 120, 140);
  rect(min(px, mid), y, abs(px - mid), h, 8);

  fill(120, 255, 190, 140);
  rect(min(px, mid), y, abs(px - mid), h, 8);

  stroke(255, 255, 255, 40);
  line(mid, y - 2, mid, y + h + 2);

  noStroke();
  fill(233, 238, 252);
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text(`TRUST: ${trust}`, x, y - 6);
  pop();
}

function wrapTextLines(lines, x, y, w) {
  push();
  fill(233, 238, 252);
  textAlign(LEFT, TOP);
  textSize(16);

  let yy = y;
  for (const line of lines) {
    text(line, x, yy, w);
    yy += 24;
  }
  pop();
}

function makeButtonRect(cx, cy, w, h) {
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}

function pointInRect(px, py, r) {
  return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
}

function drawButton(r, label) {
  const hover = pointInRect(mouseX, mouseY, r);
  push();
  noStroke();
  fill(hover ? color(90, 120, 255, 210) : color(255, 255, 255, 18));
  rect(r.x, r.y, r.w, r.h, 14);

  fill(233, 238, 252);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(label, r.x + r.w / 2, r.y + r.h / 2);
  pop();
  return hover;
}
