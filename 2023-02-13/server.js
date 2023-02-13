var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { response } = require('express');
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.static('public'));

var server = app.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Szerver várakozik a http://%s:%s elérhetőségen", host,port)
})

app.get('/', function(req, res) {
    res.sendFile(__dirname+"/public/index.html");
})
//-- API végpont --------------
app.get('/masik', function(req, res) {
    res.sendFile(__dirname+"/public/masik.html");
})
app.post('/process_post', urlencodedParser, function(req, res){
    var response = {
        first_name:req.body.first_name, 
        last_name:req.body.last_name
    };
    //-- feldolgozás -> adatbázis
    console.log(response);
    res.end(JSON.stringify(response));
} )