'use strict'
import axios from 'axios'

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express()
console.log(app);
app.use(cors());

const PORT = process.env.PORT


// set up routes

app.get('/test', handleGetTest)

function handleGetChristmasList(request, response) {
    res.status(200).send(list);
}

function handleGetTest(request, response) {
    response.send('your test worked!');
}

app.listen(PORT, () => console.log('server is listening on port ', PORT));
