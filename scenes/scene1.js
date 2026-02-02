const Scene1 = {
  draw() {
    drawHeader(
      "SCENE 1: OUTSIDE THE GATE",
      "First fork. Your first move sets the tone.",
    );
    drawStatBar();

    const panel = { x: 36, y: 130, w: 828, h: 310 };
    drawPanel(panel.x, panel.y, panel.w, panel.h);

    const lines = [
      "The guard doesn’t acknowledge you.",
      "A stranger whispers: “My phone’s dead. I just need to call someone.”",
      "",
      "What do you do?",
    ];
    drawBodyText(lines, panel.x + 24, panel.y + 22, panel.w - 48);

    this.b1 = drawButton(
      "Help the stranger (lend phone / call)",
      width / 2,
      320,
      520,
      46,
      false,
    );
    this.b2 = drawButton(
      "Ignore and approach the guard",
      width / 2,
      380,
      520,
      46,
      false,
    );
    this.back = drawButton("TITLE", 820, 46, 120, 34, false);
  },

  mousePressed() {
    if (this.b1?.hovering) {
      if (!game.flags.helpedStranger) {
        game.flags.helpedStranger = true;
        addKarma(+2, "Helped the stranger");
      }
      setState(STATES.S2A);
    }
    if (this.b2?.hovering) {
      addKarma(-1, "Ignored someone in need");
      setState(STATES.S2B);
    }
    if (this.back?.hovering) setState(STATES.TITLE);
  },
};
