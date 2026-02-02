const model = {
  nodeId: STORY.startNode,
  trust: 0,
  flags: {},
};

function resetModel() {
  model.nodeId = STORY.startNode;
  model.trust = 0;
  model.flags = {};
}

function getNode() {
  const n = STORY.nodes[model.nodeId];
  if (!n) {
    // Hard fail-safe node
    return {
      title: "ERROR",
      body: [`Missing node: ${model.nodeId}`],
      choices: [{ label: "Reset", next: STORY.startNode, reset: true }],
    };
  }
  return n;
}

function applyChoice(choice) {
  if (choice.reset) resetModel();

  if (typeof choice.trust === "number") model.trust += choice.trust;

  if (choice.flag) model.flags[choice.flag] = true;

  if (choice.next) model.nodeId = choice.next;

  // Optional gating: if you want trust-based locks, do it here.
}

function drawNode() {
  const node = getNode();

  header(
    node.title,
    "Branching decision-tree story. Stat tracked across scenes.",
  );
  statBar(model.trust);

  const p = { x: 34, y: 126, w: 832, h: 320 };
  panel(p.x, p.y, p.w, p.h);

  wrapTextLines(node.body, p.x + 22, p.y + 20, p.w - 44);

  // Buttons
  const btns = [];
  const startY = 360;
  const gap = 56;
  const bw = 620;
  const bh = 44;

  for (let i = 0; i < node.choices.length; i++) {
    const cy = startY + i * gap;
    const r = makeButtonRect(width / 2, cy, bw, bh);
    btns.push({ r, choice: node.choices[i] });
  }

  // Draw and store for click handling
  engineRuntime.buttons = btns;
  for (const b of btns) drawButton(b.r, b.choice.label);

  // Debug overlay (always visible)
  push();
  noStroke();
  fill(0, 0, 0, 140);
  rect(12, height - 36, 520, 26, 8);
  fill(255);
  textSize(12);
  textAlign(LEFT, CENTER);
  text(
    `node=${model.nodeId}  trust=${model.trust}  flags=${Object.keys(model.flags).length}`,
    20,
    height - 23,
  );
  pop();
}

const engineRuntime = {
  buttons: [],
};

function handleClick(mx, my) {
  for (const b of engineRuntime.buttons) {
    if (pointInRect(mx, my, b.r)) {
      applyChoice(b.choice);
      return;
    }
  }
}
