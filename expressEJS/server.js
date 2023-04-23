const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');


app.get("/nyar", function (req, res) {
  //res.sendFile("public/nyar.html", { root: __dirname });
  res.render("nyar", {title: 'hello ejs'});
});
app.get("/", function (req, res) {
  res.send("hello");
});

app.listen(3000, console.log("listening"));
