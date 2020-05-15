var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));

// viewed at based directory http://localhost:8080/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'views/index.html'));
});

app.get('/api/key', (req, res) => {
  res.send(process.env.YOUTUBE_API_KEY);
});

app.listen(process.env.PORT || 8080);
