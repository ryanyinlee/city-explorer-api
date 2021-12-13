'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.get('/test', ((request, response) => response.send('server workin'))); // test only
app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);
app.get('/*', errorHandler); // error stuff

async function errorHandler(req, res) {
    res.sendStatus(500).send("500: thing broke :C");
    res.sendStatus(400).send("400: you wrote a thing wrong");
    res.sendStatus(404).send("404: thing not there");
}

function handleGetWeather(req, res) {
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_API_KEY}&units=I`;  
    console.log(req.query)
    axios.get(url)
      .then(results => {        
        let weatherDescriptions = results.data.data.map(day => new Forecast(day));
        res.status(200).send(weatherDescriptions);
      })
      .catch (error => {
        console.error(error.message);
        res.status(500).send('server error');
      });

      
}


class Forecast {
    constructor(obj) {
        this.date = obj.datetime,
        this.description = `High temp: ${obj.max_temp}, Low Temp: ${obj.low_temp}, With: ${obj.weather.description}`
    }
}

function handleGetMovies(req, res) {
    const { city_name } = req.query;
    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city_name}`;

 axios.get(url)
.then(movieResponse => { 
    let cleanedMovies = movieResponse.data.results.map(movie => new Movies(movie));
    
    console.log(cleanedMovies);
    res.status(200).send(cleanedMovies);
    
})
.catch (error => {
    console.error(error.message);
    res.status(500).send('server error');
  });
}

class Movies {
    constructor(obj) {
        this.title = obj.title,
        this.overview = obj.overview,
        this.average_votes = obj.vote_average,
        this.total_votes = obj.vote_count,
        this.image_url = `https://www.themoviedb.org/t/p/w1280/${obj.poster_path}`,
        this.popularity = obj.popularity,
        this.released_on = obj.release_date
    }
}

app.listen(PORT, () => console.log('Hey Ryan, the server is listening on port: ', PORT));