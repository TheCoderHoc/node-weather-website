const searchForm = document.querySelector("#search-form");
const searchInput = searchForm.querySelector("#search-input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const getWeatherData = async (address) => {
    const response = await fetch("/weather?address=" + address);
    const { error, location, forecast } = await response.json();

    if (error) {
        return (messageOne.textContent = error);
    }

    messageOne.textContent = location;
    messageTwo.textContent = forecast;
};

searchForm.addEventListener("submit", (e) => {
    // prevent form submission default behaviour
    e.preventDefault();

    const address = searchInput.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    getWeatherData(address);
});
