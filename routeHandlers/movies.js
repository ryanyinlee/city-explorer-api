'use strict';

const axios = require('axios');
const cache = require('./cache.js');

async function handleGetMovies(req, res) {
    const { city_name } = req.query;
    console.log("req.query: " + req.query.lat);
    console.log('cache: '+ cache);
    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city_name}`;

    console.log(url);

// when client asks for data about people, look in cache first for key
// if key is in cache, grab data associated with the key
// send it to user
if (cache[city_name]) {
    console.log('cache hit on '+ cache[city_name]);
    res.status(200).send(cache[city_name]);
    return;
}

// if we don't have it, make an API request as per usual, get the data back
// then store it in the cache for next time
try {
console.log('cache miss on ' + cache[city_name]);
console.log('city_name is : ' + city_name);
const movieResponse = await axios.get(url);
console.log('movieResponse is : ' + movieResponse);
let cleanedMovies = movieResponse.data.results.map(movie => new Movies(movie));
console.log('cleanedMovies : ' + cleanedMovies);
cache[city_name] = cleanedMovies;
console.log('cache[city_name].data is ' + cache[city_name].data)

res.status(200).send(cleanedMovies);
} catch(error) {
    console.error(error.message);
    res.status(500).send('server error');
}

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


module.exports = handleGetMovies;

// NO TOUCHY 

// Just in case ====================================

// function handleGetMovies(req, res) {
//     const { city_name } = req.query;
    
//     const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city_name}`;

//  axios.get(url)
// .then(movieResponse => { 
//     let cleanedMovies = movieResponse.data.results.map(movie => new Movies(movie));
    
//     console.log(cleanedMovies);
//     res.status(200).send(cleanedMovies);
    
// })
// .catch (error => {
//     console.error(error.message);
//     res.status(500).send('server error');
//   });
// }

// class Movies {
//     constructor(obj) {
//         this.title = obj.title,
//         this.overview = obj.overview,
//         this.average_votes = obj.vote_average,
//         this.total_votes = obj.vote_count,
//         this.image_url = `https://www.themoviedb.org/t/p/w1280/${obj.poster_path}`,
//         this.popularity = obj.popularity,
//         this.released_on = obj.release_date
//     }
// }

// Just in case ====================================