'use strict'

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const handleGetWeather = require('./routeHandlers/weather');
const handleGetMovies = require('./routeHandlers/movies');

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



app.listen(PORT, () => console.log('Hey Ryan, the server is listening on port: ', PORT));