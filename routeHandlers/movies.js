'use strict';

const axios = require('axios');

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


module.exports = handleGetMovies;