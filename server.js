const express = require("express");
const port = 5000;
const app = express();

app.get("/", (request, response) => {
  response.send({ message: "Hello World" });
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
