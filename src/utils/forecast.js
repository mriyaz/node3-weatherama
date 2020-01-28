const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/736387f304a9e622c18cdaab15aa7c99/' + lat + ',' + long + '?units=si';

    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback("Unable to connect to the weather service.", undefined);
        else if (body.error)
            callback(body.error, undefined)
        else {

            callback(undefined, body.daily.data[0].summary + "It is currently " + body.currently.temperature + " degree out.The high today is " + body.daily.data[0].temperatureHigh + " and the low today is " + body.daily.data[0].temperatureLow + ". There is a " + (body.currently.precipProbability * 100).toFixed(1) + "% chance of rain.")
        }
    })
}

module.exports = forecast;