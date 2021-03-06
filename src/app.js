const express = require('express');
const path = require('path');
const hbs = require("hbs");

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Riyazuddin Mohammed'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Riyazuddin Mohammed'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Riyazuddin Mohammed',
        msg: "Call +1309343434 for help"
    });

});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMsg: "You must provide an address."
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                errorMsg: error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    errorMsg: error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })



});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Riyazuddin Mohammed',
        errorMsg: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Riyazuddin Mohammed',
        errorMsg: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('The server started on port ' + port);
});