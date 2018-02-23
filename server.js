const express = require('express');
const getWeatherInfo = require('./get-weather-info.js');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('public/index.html');
});

app.get('/get_weather_info', (req, res) => {
    if (req.query.city) {
        getWeatherInfo.getWeatherInfo(req.query.city).
        then((data)=>{
            res.send(data);
        }, (err) => {
            res.send(err);
        });
    }
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
