require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

let counter = 0;

const mapUrls = {};

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(_req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", (req, res) => {
  try {
    const url = new URL(req.body.url)
    counter++
    mapUrls[counter] = url
    res.json({ original_url : url, short_url : counter})
  } catch (error) {
    console.error(error)
    res.status(400).json({error: 'invalid url'})
  }
})

app.get("/api/shorturl/:urlId", (req, res) => {
  const urlId = req.params.urlId
  res.redirect(mapUrls[urlId])
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});