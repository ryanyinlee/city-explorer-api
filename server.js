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
const { reset } = require('nodemon');

app.get('/test', ((request, response) => response.send('server workin'))); // test only
app.get('/data/weather.json');
app.get('/weather', handleGetWeather);

app.get('/*', errorHandler); // error stuff

function errorHandler(req, res) {
    res.status(500).send("thing broke :C");
    res.status(400).send("you wrote a thing wrong");
    res.status(404).send("thing not there");
}

let newWeatherItem = [];



async function handleGetWeather(req, res) {

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
        .then(results => console.log(results))
        .catch(error => console.log(error));


}

async function handleGetMovies(req, res) {

    const { city_name } = req.query;


    // put in a try catch (error)
    const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}
&language=en-US&wuery=${city_name}$page=1&include_adult=false`

    const movieResponse = await axios.get(url);
    const cleanedMovies = movieResponse.data.map(movie => new Movies(movie));
    res.send(cleanedMovies.data);

}
// obj is the stuff in the object
class Movies {
    constructor(obj) {
        this.title = obj.title,
        this.overview = obj.overview,
        this.average_votes = obj.average_votes,
        this.total_votes = obj.total_votes,
        this.image_url = obj.image_url,
        this.popularity = obj.popularity,
        this.released_on = obj.released_on
    }
}




class Forecast {
    constructor(obj) {
        this.date = obj.datetime,
        this.description = obj.description
    }
}


app.listen(PORT, () => console.log('server is listening on port: ', PORT));
