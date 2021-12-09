'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');



const weatherData = require('./data/weather.json'); // formerly requestWeather

console.log(weatherData);

const app = express();
app.use(cors());

const PORT = process.env.PORT // DO NOT MOVE THIS FROM LINE 9

const axios = require('axios');

app.get('/test', ((request, response) => response.send('server workin'))); // test only
app.get('/data/weather.json');
app.get('/weather', handleGetWeather);

app.get('/*', errorHandler); // error stuff

function errorHandler(req, res) {
    res.status(500).send("thing broke :C");
    res.status(400).send("you wrote a thing wrong");
    res.status(404).send("thing not there");
}

// let newWeatherItem = [];


function handleGetWeather(req, res) {
    
    //let city_name = req.query.city_name; // No longer use city. Need to use lat/lon

    const url = `https://api.weatherbit.io/v2.0/current?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_API_KEY}`

    let findlat = request.query.lat;
    let findlon = request.query.lon;

    newWeatherItem.map(weather => new Forecast(weather));
    res.status(200).send(weatherData);
    //res.status(200).send(newWeatherItem);
    res.status(200).send(findlat);
    res.status(200).send(findlon);
    
    axios.get(url)
        .then(results=> console.log(results))
        .catch(error => console.log(error));


}

class Forecast {
    constructor(obj) {
        this.date = obj.datetime,
        this.description = obj.description
    }
}


app.listen(PORT, () => console.log('server is listening on port: ', PORT));
