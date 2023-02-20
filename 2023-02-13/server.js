var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(multer({ dest: '/tmp/'}));
app.use(express.static('public'));

//https://stackoverflow.com/questions/40020848/how-to-upload-a-file-in-node-js-error-cannot-post-upload

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

app.post('/file_upload', function(req, res){
    console.log(req.files.file.name);
    console.log(req.files.file.path);
    console.log(req.files.file.type);
    var file = __dirname + "/" + req.files.file.name;
    
    fs.readFile( req.files.file.path, function (err, data) {
       fs.writeFile(file, data, function (err) {
          if( err ) {
             console.log( err );
             } else {
                response = {
                   message:'File uploaded successfully',
                   filename:req.files.file.name
                };
             }
          
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
    });
} )