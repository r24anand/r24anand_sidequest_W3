// Global game model
let game = {
  state: "TITLE",
  karma: 0, // player stat tracked across scenes
  flags: {
    helpedStranger: false,
    liedToGuard: false,
    tookBribe: false,
    savedFriend: false,
  },
  log: [], // optional: record choices
};

const STATES = {
  TITLE: "TITLE",
  S1: "SCENE_1",
  S2A: "SCENE_2A",
  S2B: "SCENE_2B",
  S3A: "SCENE_3A",
  S3B: "SCENE_3B",
  END: "ENDING",
};

function resetGame() {
  game.state = STATES.TITLE;
  game.karma = 0;
  game.flags = {
    helpedStranger: false,
    liedToGuard: false,
    tookBribe: false,
    savedFriend: false,
  };
  game.log = [];
}
