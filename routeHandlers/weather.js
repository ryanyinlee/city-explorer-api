'use strict';

const cache = {};
const axios = require('axios');

function handleGetWeather(req, res) {
  
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_API_KEY}&units=I`;  
  //console.log(req.query)
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

module.exports = handleGetWeather;

// NO TOUCHY 

// Just in case ====================================

// function handleGetWeather(req, res) {
  
//   const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_API_KEY}&units=I`;  
//   console.log(req.query)
//   axios.get(url)
//     .then(results => {        
//       let weatherDescriptions = results.data.data.map(day => new Forecast(day));

//       // cache here
//       res.status(200).send(weatherDescriptions);
//     })
//     .catch (error => {
//       console.error(error.message);
//       res.status(500).send('server error');
//     });
    
// }

// class Forecast {
//   constructor(obj) {
//       this.date = obj.datetime,
//       this.description = `High temp: ${obj.max_temp}, Low Temp: ${obj.low_temp}, With: ${obj.weather.description}`
//   }
// }

// Just in case ====================================