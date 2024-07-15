const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use('/news-api', express.static(path.join(__dirname, 'public')));
app.use('/news-api/css', express.static(path.join(__dirname, 'css')));
app.use('/news-api/src', express.static(path.join(__dirname, 'src')));

app.get('/news-api/src/config.js', (req, res) => {
  res.type('application/javascript');
  res.send(`
    const config = {
      MY_KEY: '${process.env.MY_KEY}',
      WEATHER_KEY: '${process.env.WEATHER_KEY}'
    };
  `);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/weather', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'weather.html'));
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
