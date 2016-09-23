// express.
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/public', {
  etag: false
}));

// routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(3000, function() {
  console.log('listening on port 3k');
});
