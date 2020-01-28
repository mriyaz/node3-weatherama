const request = require('request');
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibXJpeWF6IiwiYSI6ImNrNXRheXc5ejBoY3gzZ3A0dWozOGgwOGwifQ.SxCcqlhzBzVAgpyqKhJcHw&limit=1";
    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback("Unable to connect to the geocoding service.", undefined);
        else if (body.message)
            callback(body.message, undefined)
        else if (body.features.length === 0)
            callback('No matching results.', undefined)
        else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            callback(undefined, {
                latitude,
                longitude,
                location: body.features[0].place_name
            });
        }
    })

}

module.exports = geocode;