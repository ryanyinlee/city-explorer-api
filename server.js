'use strict'
//import axios from 'axios'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT // DO NOT MOVE THIS
const requestWeather = require('./data/weather.json');
// const { response } = require('express');

app.use(cors());

app.get('/data/weather.json', handleGetWeather)
// error stuff
app.get('/*', errorHandler);

function errorHandler(request, response) {
    response.status(500).send("thing broke");
}



function handleGetWeather(request, response) {
    console.log(request);
    console.log(request.query);
    const findlat = request.query.lat;
    const findlon = request.query.lon;
    let newWeatherItem = list.map(weather => new Forecast(weather));
    response.status(200).send(requestWeather);
    response.status(200).send(newWeatherItem);
}

class Forecast {
    constructor(obj) {
        this.datetime = obj.datetime,
        this.description = obj.description
    }
}


app.listen(PORT, () => console.log('server is listening on port: ', PORT));
