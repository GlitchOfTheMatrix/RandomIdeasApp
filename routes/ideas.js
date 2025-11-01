const express = require("express");
const router = express.Router();

const ideas = [
  {
    id: 1,
    text: "Positive NewsLetter, a newsletter that only shares positive, uplifting news",
    tag: "Technology",
    username: "TonyStark",
    date: "2022-01-02",
  },
  {
    id: 2,
    text: "Milk cartons that turn a different color the older that your milk is getting",
    tag: "Inventions",
    username: "SteveRogers",
    date: "2022-01-02",
  },
  {
    id: 3,
    text: "ATM location router which lets you know where the closest ATM is and if it is in service",
    tag: "Software",
    username: "BruceBanner",
    date: "2022-01-02",
  },
];

// Get all ideas
router.get("/", (request, response) => {
  response.send({ success: true, data: ideas });
});
// Get a single idea
router.get("/:id", (request, response) => {
  const idea = ideas.find((idea) => {
    return idea.id === +request.params.id;
  });

  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: "Result not found" });
  }
  response.json({ success: true, data: idea });
});

module.exports = router;
