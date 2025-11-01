const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

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
router.get("/", async (request, response) => {
  //   response.send({ success: true, data: ideas });
  try {
    const ideas = await Idea.find();
    response.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
});
// Get a single idea
router.get("/:id", async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id);
    response.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
});

// Add an idea
router.post("/", async (request, response) => {
  const idea = new Idea({
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username,
  });

  try {
    const savedIdea = await idea.save();
    response.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
});

// Update Idea
router.put("/:id", async (request, response) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          text: request.body.text,
          tag: request.body.tag,
        },
      },
      { new: true }
    );
    response.json({ success: true, data: updatedIdea });
  } catch (error) {
    response
      .status(500)
      .send({ success: false, error: "Something went wrong" });
  }
});

// Delete Idea
router.delete("/:id", async (request, response) => {
  try {
    await Idea.findByIdAndDelete(request.params.id);
    response.json({ success: true, data: {} });
  } catch (error) {
    response
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
