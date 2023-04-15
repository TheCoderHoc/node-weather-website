const request = require("request");

const geocode = (address, callback) => {
    const geocodeUrl =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoibmVyZHktd2lsc29uIiwiYSI6ImNraWc0eWg4bTA4YW8ycXFqbnE3em5iNGkifQ.5yL7f4VGaHqpGevG7Fm88Q&limit=1";

    request({ url: geocodeUrl, json: true }, (error, { body } = {}) => {
        if (error) {
            return callback(
                "Unable to connect to location services!",
                undefined
            );
        }

        if (body.features.length === 0) {
            return callback(
                "Unable to find location. Try another search!",
                undefined
            );
        }

        const { center, place_name: location } = body.features[0];
        const longitude = center[0];
        const latitude = center[1];

        callback(undefined, { longitude, latitude, location });
    });
};

module.exports = geocode;
