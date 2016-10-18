var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});

