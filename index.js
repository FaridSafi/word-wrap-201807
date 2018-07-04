const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.json({ message: "Hello World" });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started");
});
