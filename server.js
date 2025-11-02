const path = require("path");
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 8000;
const connectDB = require("./config/db");
const app = express();

connectDB();

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.send({ message: "Hello World" });
});

const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
