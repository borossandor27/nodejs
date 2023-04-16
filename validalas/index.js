const express = require("express");
const app = express();
app.param("userid", function (req, res, next, id) {
  console.log(id+" valamilyen ellenőrzése");
  next();
});

app.get("/user/:userid", (req, res) => {
  console.log("Már megtörtént a validálás");
  res.end();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(5000);
