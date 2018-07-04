const uid2 = require("uid2");
const express = require("express");
const app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/word-wrap",
  { useNewUrlParser: true }
);

const User = mongoose.model("User", {
  email: {
    type: String,
    unique: true
  },
  // password: String,
  token: String
});

app.get("/", function(req, res) {
  res.json({ message: "Hello World" });
});

app.post("/api/sign_up", function(req, res) {
  const token = uid2(16);

  const newUser = new User({
    email: req.body.email,
    // C'est une mauvaise pratique de sauvegarder le mdp
    // password: req.body.password,
    token: token
  });

  newUser.save(function(err, obj) {
    if (err) {
      res.json({
        error: err
      });
    } else {
      res.json({
        token: obj.token
      });
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started");
});
