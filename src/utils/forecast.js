const request = require("request");

const forecast = (longitude, latitude, callback) => {
    const forecastUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=metric&appid=dd231fc73460cff09dded3dde15fd6a8";

    request({ url: forecastUrl, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
            return;
        }

        const { error: errorMessage, message, current } = body;

        if (errorMessage) {
            callback("Unable to find location!", undefined);
            return;
        }

        if (message) {
            callback("Wrong latitude!", undefined);
            return;
        }

        const { temp, humidity, weather, wind_speed } = current;

        const summary = weather[0].description;

        callback(
            undefined,
            summary +
                ". It is currently " +
                temp +
                " degrees out. There is a " +
                humidity +
                "% chance of rain. Current wind speed is " +
                wind_speed +
                "km/hr."
        );
    });
};

module.exports = forecast;
