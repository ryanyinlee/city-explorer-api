'use strict'
//import axios from 'axios'
const PORT = process.env.PORT
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');


const requestWeather = require('./data/weather.json');
// const { response } = require('express');



app.use(cors());



app.get('/data/weather.json', handleGetWeather)


function handleGetWeather(request, response) {
    response.send(requestWeather);
}


// function handleWeather(request, response) {
//     response.status(200).send(requestWeather);
//     response.send('weather info incoming');
// }




app.listen(PORT, () => console.log('server is listening on port: ', PORT));
