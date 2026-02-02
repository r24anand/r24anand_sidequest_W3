const TitleScene = {
  draw() {
    drawHeader(
      "THE SILENT STATION",
      "A branching story with a tracked stat (karma).",
    );
    drawStatBar();

    const panel = { x: 36, y: 130, w: 828, h: 310 };
    drawPanel(panel.x, panel.y, panel.w, panel.h);

    const lines = [
      "You arrive at a closed transit station after curfew.",
      "A guard watches the gate. A stranger sits nearby, shivering.",
      "Every decision shifts karma. Endings unlock based on karma and choices.",
      "",
      "Goal:",
      "Reach the platform and decide what kind of person you are under pressure.",
    ];
    drawBodyText(lines, panel.x + 24, panel.y + 22, panel.w - 48);

    this.btnStart = drawButton("START", width / 2, 460, 240, 44, true);
    this.btnReset = drawButton("RESET", 770, 46, 120, 34, false);
  },

  mousePressed() {
    if (this.btnStart?.hovering) {
      setState(STATES.S1);
    }
    if (this.btnReset?.hovering) {
      resetGame();
    }
  },
};
