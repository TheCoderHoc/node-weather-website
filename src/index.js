const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirectoryPath));

const PORT = process.env.PORT || 3000;

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Dave Wilson",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "Dave Wilson",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Dave Wilson",
        message: "Hello, please press ctrl + to add a new city.",
    });
});

app.get("/help/*", (req, res) => {
    // res.send("Could not find help article");
    res.render("error-page", {
        title: "404",
        name: "Dave Wilson",
        errorMessage: "Help article not found",
    });
});

app.get("/weather", (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({ error: "Please provide an address." });
    }

    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
            });
        });
    });
});

app.get("/products", (req, res) => {
    console.log(req.query);
    const search = req.query.search;

    if (!search) {
        return res.send({ error: "You must provide a search term." });
    }

    res.send({
        products: [],
    });
});

app.get("*", (req, res) => {
    // res.send("My 404 Page");
    res.render("error-page", {
        title: "404",
        name: "Dave Wilson",
        errorMessage: "Page not found",
    });
});

app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
});

// introduction to routes
// app.get("", (req, res) => {
//     res.send("<h1>Hello World!</h1>");
// });

// app.get("/help", (req, res) => {
//     // res.send("Help Page!");
//     res.send({
//         name: "Dave Wilson",
//         age: 23,
//     });
// });

// app.get("/about", (req, res) => {
//     res.send("<h1>About Page!</h1>");
// });

// app.get("/weather", (req, res) => {
//     // res.send("Weather Page!");
//     res.send({
//         forecast: "lorem ipsum dolor meti di calar madun posep!",
//         location: "Lagos, Nigeria",
//     });
// });
