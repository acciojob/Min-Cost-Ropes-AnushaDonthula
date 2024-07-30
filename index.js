// This file is not to be modified. Please ignore this.
// We will understand all of this later in the course.
// DO NOT MODIFY THIS FILE

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const minCost = require("./script");
const app = express();


app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/main.html"));
});

app.post("/mincost", (req, res) => {
  console.log("hello")
  const { arr } = req.body;
  const ans = minCost(arr);

  res.send({ message: ans });

  // res.sendFile(path.join(__dirname + '/main.html'));
});

//your code here
app.post("/add", (req, res) => {
  const { arr } = req.body;
  res.status(200).send(a + b);

  // res.sendFile(path.join(__dirname + '/main.html'));
});
module.exports = app;
