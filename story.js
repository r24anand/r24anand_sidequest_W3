// Stat: TRUST (player earns/loses it)
// Endings unlock based on trust threshold + key flags.

const STORY = {
  startNode: "TITLE",

  nodes: {
    TITLE: {
      title: "THE LOST USB",
      body: [
        "You find a USB on campus.",
        "A label reads: “CO-OP APPLICATIONS — FINAL.”",
        "Trust is tracked. Choices branch. Endings unlock by trust.",
      ],
      choices: [{ label: "Start", next: "FOUND" }],
    },

    FOUND: {
      title: "FOUND",
      body: [
        "It’s late. The lab is quiet.",
        "You can turn it in now, or open it first.",
        "What do you do?",
      ],
      choices: [
        {
          label: "Turn it into the front desk",
          next: "DESK",
          trust: +2,
          flag: "returnedEarly",
        },
        {
          label: "Plug it in and check what’s inside",
          next: "OPEN",
          trust: -2,
          flag: "snooped",
        },
      ],
    },

    DESK: {
      title: "DESK",
      body: [
        "The desk staff logs it, but asks:",
        "“Any idea whose it is?”",
        "You can help identify the owner, or leave it anonymous.",
      ],
      choices: [
        {
          label: "Stay and help identify owner",
          next: "OWNER",
          trust: +1,
          flag: "helpedDesk",
        },
        { label: "Leave it and go", next: "NIGHT", trust: 0 },
      ],
    },

    OPEN: {
      title: "OPEN",
      body: [
        "You open a folder: resumes, cover letters, transcripts.",
        "There’s also a doc called: “Interview Qs — internal notes”.",
        "You can stop now, or keep digging.",
      ],
      choices: [
        {
          label: "Stop. Close everything and turn it in",
          next: "DESK",
          trust: +1,
          flag: "stoppedSnooping",
        },
        {
          label: "Copy files to your laptop",
          next: "COPY",
          trust: -3,
          flag: "copied",
        },
      ],
    },

    COPY: {
      title: "COPY",
      body: [
        "You copied the files. Nobody saw.",
        "Your friend texts: “Need help polishing my application tonight.”",
        "Do you use what you took?",
      ],
      choices: [
        {
          label: "Delete the copy. Never use it",
          next: "DESK",
          trust: +2,
          flag: "deletedCopy",
        },
        {
          label: "Use it as “inspiration”",
          next: "USE",
          trust: -2,
          flag: "usedIt",
        },
      ],
    },

    USE: {
      title: "USE",
      body: [
        "You reuse phrasing. It reads cleaner.",
        "A week later, you recognize the owner in class.",
        "They mention their USB went missing. They look exhausted.",
      ],
      choices: [
        {
          label: "Confess privately",
          next: "CONFESS",
          trust: +1,
          flag: "confessed",
        },
        { label: "Say nothing", next: "SILENT", trust: -2, flag: "hidIt" },
      ],
    },

    OWNER: {
      title: "THE OWNER",
      body: [
        "You spot the owner’s name on a file header without opening it.",
        "It’s someone in your program.",
        "You can message them, or let the desk handle it.",
      ],
      choices: [
        {
          label: "Message them: “I turned in your USB.”",
          next: "MEET",
          trust: +2,
          flag: "messagedOwner",
        },
        { label: "Let desk handle it", next: "NIGHT", trust: 0 },
      ],
    },

    MEET: {
      title: "MEETUP",
      body: [
        "They meet you to pick it up.",
        "They thank you and offer you coffee as a thank-you.",
        "Do you accept?",
      ],
      choices: [
        {
          label: "Accept coffee (friendly)",
          next: "END_GOOD",
          trust: +1,
          flag: "acceptedCoffee",
        },
        { label: "Decline politely and leave", next: "END_GOOD", trust: 0 },
      ],
    },

    NIGHT: {
      title: "NIGHT WALK",
      body: [
        "You leave the building.",
        "You replay the moment in your head: you could’ve done more, or less.",
        "Your next choice decides what kind of ending you get.",
      ],
      choices: [
        {
          label: "Check the desk later to confirm it was returned",
          next: "CHECKBACK",
          trust: +1,
          flag: "checkedBack",
        },
        { label: "Forget it and move on", next: "END_NEUTRAL", trust: 0 },
      ],
    },

    CHECKBACK: {
      title: "CHECKBACK",
      body: [
        "The desk says: “Owner picked it up.”",
        "You feel lighter.",
        "This ends well if your trust is high enough.",
      ],
      choices: [{ label: "Finish", next: "END_GOOD", trust: 0 }],
    },

    CONFESS: {
      title: "CONFESSION",
      body: [
        "You admit you opened it and copied files.",
        "They go quiet, then ask: “Did you use anything?”",
        "Your answer locks the ending.",
      ],
      choices: [
        {
          label: "Tell the full truth",
          next: "END_REPAIR",
          trust: +2,
          flag: "fullTruth",
        },
        { label: "Lie: “No.”", next: "END_BAD", trust: -3, flag: "lied" },
      ],
    },

    SILENT: {
      title: "SILENCE",
      body: [
        "You keep it to yourself.",
        "Later, your application gets flagged for “similarity.”",
        "You’re asked to explain.",
      ],
      choices: [
        { label: "Own it", next: "END_BAD", trust: -1 },
        { label: "Deny it", next: "END_WORST", trust: -2 },
      ],
    },

    // End nodes
    END_GOOD: {
      title: "ENDING: CLEAN HANDS",
      body: [
        "You chose restraint when you could’ve taken advantage.",
        "The story ends with your reputation intact.",
        "Trust tends to compound.",
      ],
      ending: "GOOD",
      choices: [{ label: "Play again", next: "TITLE", reset: true }],
    },

    END_NEUTRAL: {
      title: "ENDING: NOTHING HAPPENS",
      body: [
        "You didn’t harm anyone directly, but you also didn’t follow through.",
        "Life moves on.",
        "So does the pattern.",
      ],
      ending: "NEUTRAL",
      choices: [{ label: "Play again", next: "TITLE", reset: true }],
    },

    END_REPAIR: {
      title: "ENDING: REPAIR",
      body: [
        "You told the truth even when it cost you.",
        "They don’t forgive you instantly, but they believe you’re not pretending.",
        "Trust can be rebuilt, slowly, with action.",
      ],
      ending: "REPAIR",
      choices: [{ label: "Play again", next: "TITLE", reset: true }],
    },

    END_BAD: {
      title: "ENDING: CONSEQUENCES",
      body: [
        "Shortcuts became evidence.",
        "You lose opportunities you didn’t even know you were being considered for.",
        "Trust collapses faster than it forms.",
      ],
      ending: "BAD",
      choices: [{ label: "Play again", next: "TITLE", reset: true }],
    },

    END_WORST: {
      title: "ENDING: BURNED",
      body: [
        "You doubled down on denial.",
        "Now it’s not just what you did — it’s who you decided to be about it.",
        "Doors close quietly and stay closed.",
      ],
      ending: "WORST",
      choices: [{ label: "Play again", next: "TITLE", reset: true }],
    },
  },
};
