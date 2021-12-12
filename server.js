'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const weatherData = require('./data/weather.json'); // formerly requestWeather data/weather.json

const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.get('/test', ((request, response) => response.send('server workin'))); // test only
app.get('/weather', handleGetWeather);
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
        // console.log("results: " + results);
        // let str = JSON.stringify(results.data.data);
        // console.log("results stringified: " + str);
        let weatherDescriptions = results.data.data.map(day => new Forecast(day));
        console.log(weatherDescriptions[0].date);
        console.log(weatherDescriptions[0].description);
        // console.log(typeof(weatherDescriptions))
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

// let findlat = request.query.lat;
// let findlon = request.query.lon;

// async function handleGetMovies(req, res) {

//     const { city_name } = req.query;


//     // put in a try catch (error)
//     const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}
// &language=en-US&wuery=${city_name}$page=1&include_adult=false`

//     const movieResponse = await axios.get(url);
//     const cleanedMovies = movieResponse.data.map(movie => new Movies(movie));
//     res.send(cleanedMovies.data);

// }

// obj is the stuff in the object

// class Movies {
//     constructor(obj) {
//         this.title = obj.title,
//         this.overview = obj.overview,
//         this.average_votes = obj.average_votes,
//         this.total_votes = obj.total_votes,
//         this.image_url = obj.image_url,
//         this.popularity = obj.popularity,
//         this.released_on = obj.released_on
//     }
// }



// try {
//     let results => {} = await axios.get(url);
//     this.setState{}
// } catch (error) {
//   console.log(error);
// }

// newWeatherItem.map(weather => new Forecast(weather));
// res.sendStatus(200).send(weatherData);
// res.sendStatus(200).send(findlat);
// res.sendStatus(200).send(findlon);


    
//     .catch(error => console.log(error));

app.listen(PORT, () => console.log('Hey Ryan, the server is listening on port: ', PORT));