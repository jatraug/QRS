var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
    var fs = require('fs');	
    var ind = fs.readFileSync('index.html');
    var buf= new Buffer(ind, 'utf8');
    response.send(buf.toString());
    //  response.send('Hello World Two!');
});

app.use(express.static(__dirname));

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
