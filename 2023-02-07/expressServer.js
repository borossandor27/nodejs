var express = require('express');
var app = express();

app.use(express.static('public'));

var server= app.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("A szerver elindult http://%s:%s",host,port);
});

app.get("/", function(req, res){
    res.status(200).write(__dirname+"\\public\\index.html" );
    //res.status(200).write(app.all() );
    res.end();
})