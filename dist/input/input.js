import { WeatherDisplay } from "../output/output.js";
import { Weather } from "../weather/weather.js";
export class WeatherInput {
    constructor() {
        this.configure();
    }
    getResponseData() {
        const city = document.querySelector("input").value;
        document.querySelector("input").value = "";
        const weatherDisplay = new WeatherDisplay();
        const APIKEY = "dbe1df9f9ec34d7f7c36368aa7494614";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric
            `, { mode: "cors" })
            .then(function (response) {
            return response.json();
        })
            .then((response) => {
            const newWeather = this.getData(response);
            weatherDisplay.showData(newWeather);
        })
            .catch((err) => {
            if (err) {
                console.log(err);
                weatherDisplay.showError();
            }
        });
    }
    configure() {
        const input = document.getElementById("cityInput");
        input.focus();
        // Execute a function when the user releases a key on the keyboard
        input.addEventListener("keyup", function (event) {
            // Number 13 is the "Enter" key on the keyboard
            input.style.borderColor = "#ffffff";
            document.querySelector(".error").textContent = "";
            if (event.keyCode === 13) {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                document.getElementById("myBtn").click();
            }
        });
        document.getElementById("myBtn").onclick = () => {
            this.getResponseData();
        };
    }
    getData(response) {
        console.log(response);
        const weather = new Weather(response.name, response.sys.country, response.weather[0].main, response.weather[0].description, response.main.temp_max, response.main.temp_max, response.main.temp_max, response.sys.sunrise, response.sys.sunset, response.main.humidity, response.main.pressure, response.wind.deg, response.wind.speed, response.main.sea_level ? response.main.sea_level : "!");
        return weather;
    }
}
