'use strict'
//import axios from 'axios'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT // DO NOT MOVE THIS
const weatherData = require('./data/weather.json');
const axios = require('axios');
// formerly requestWeather
// const { response } = require('express');

app.use(cors());

app.get('/data/weather.json', handleGetWeather)
// error stuff
//app.get('/*', errorHandler);

function errorHandler(request, response) {
    response.status(500).send("thing broke :C");
}


let newWeatherItem = [];
function handleGetWeather(request, response) {
    // console.log(request);
    // console.log(request.query);
    // let findlat = request.query.lat;
    // let findlon = request.query.lon;
    // let city_name = request.query.city_name;
    // // https://api.weatherbit.io/v2.0/current?lat=${req.query.lat}&lon=${req.query.lon}&key=WEATHER_API_KEY
    const url = `https://api.weatherbit.io/v2.0/current?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_API_KEY}`
    // let cityMatch = weatherData.find(city => city.city_name.toLowerCase() === city_name.toLowerCase());
    // if (cityMatch) {
    //     let weatherDescription = cityMatch.data.map(day => new Forecast(day));
    //     response.status(200).send(weatherDescription);
    // } else {
    //     response.status(400).send('no data on city');
    // }
    // newWeatherItem.map(weather => new Forecast(weather));
    // response.status(200).send(weatherData);
    // response.status(200).send(newWeatherItem);
    // response.status(200).send(findlat);
    // response.status(200).send(findlon);
    // response.status(200).send(city_name);

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
