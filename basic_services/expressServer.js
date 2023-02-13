var express = require("express");
var app = express();
//--  JSON, Raw, Text és URL kódolású űrlapadatok kezelésére. 
//--    bővebben: https://github.com/expressjs/body-parser
//--    npm install body-parser --save
var bodyParser = require('body-parser'); 
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//-- cookie-parser − A Cookie fejlécének elemzése és a req.cookie-k feltöltése a cookie-nevek által kulcsolt objektummal

//-- multer – többrészes/form-adatok kezelésére
//-- Statikus fájlok, például képek, CSS-fájlok és JavaScript-fájlok elérhetőségének a kijelölése
app.use(express.static('public'));

//-- szolgáltató létrehozása és indítása
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("A szerver várakozik http://%s:%s", host, port);
});

app.get("/", function (req, res) {
  res.status(200).send(__dirname+"\\"+"public\index.html");
});

//-- kezdő oldal
app.get("/valami", function (req, res) {
  res.status(200).send("Valami mást csinálok");
});

app.post("/process_post", urlencodedParser, function(req, res){
  response = {
    first_name:req.body.first_name,
    last_name:req.body.last_name
 };
  res.set({
    "content-type": "application/json",
  });
 console.log(response);
 res.write(JSON.stringify(response));
 res.end();
});

app.get("/process_get", function (req, res) {
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
  };
  res.set({
    "content-type": "application/json",
  });
  res.write(JSON.stringify(response));
  res.write(__dirname);
  res.end();
});

