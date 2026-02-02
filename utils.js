function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function isHover(rect) {
  return (
    mouseX >= rect.x &&
    mouseX <= rect.x + rect.w &&
    mouseY >= rect.y &&
    mouseY <= rect.y + rect.h
  );
}

function addKarma(delta, reason) {
  game.karma += delta;
  game.log.push({ t: Date.now(), delta, reason });
}
