const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');

const app = express();

// Define paths for Express config
const public_path = path.join(__dirname, '../public');
const views_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

// sets views directory (overwrites default value)
app.set('views', views_path);
// setup handlebars engine
app.set('view engine', 'hbs');
// setup partials path in hbs
hbs.registerPartials(partials_path);

// Setup static directory to serve
app.use(express.static(public_path));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Cody Wahl'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Cody Wahl'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Cody Wahl',
        helpMessage: 'This is the help message.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    const locationString = req.query.address;

    geocode(locationString, (error, { latitude, longitude } = {}) => {
        if (error) {
            console.log(error);
            return res.send({ error });
        }
        else if (!latitude || !longitude) {
            console.log(error);
            return res.send({ error: 'Error retrieving latitude or longitude!' });
        }

        forecast(latitude, longitude, (error, { localtime, location, temp, precipitation } = {}) => {
            return res.send({
                error,
                localtime,
                location,
                temp,
                precipitation
            })
        });

    });
});

app.get('/products', (req, res) => {
    if (!req.query || !req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })

    }

    res.send(req.query);
});

app.get('/help/*', (req, res) => {
    res.render('page_not_found', {
        title: '404',
        name: 'Cody Wahl',
        error_message: 'Help article not found!'
    });
})

app.get('*', (req, res) => {
    res.render('page_not_found', {
        title: '404',
        name: 'Cody Wahl',
        errorMessage: 'Oh no! Page not found!'
    });
});

const development_port = 3000;
const start_server_callback = () => {
    console.log('ExpressApp: listening on port [' + development_port + '].');
};

app.listen(development_port, start_server_callback);