var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind, HideDiv } from "../util/util.js";
export class WeatherDisplay {
    constructor() {
        this.errMsg = document.querySelector(".error");
        this.cityName = document.querySelector(".city");
        this.temp = document.querySelector(".temp");
        this.weatherTxt = document.querySelector(".weather");
        this.description = document.querySelector(".description");
        this.tempMin = document.querySelector(".temp-min");
        this.tempMax = document.querySelector(".temp-max");
        this.humidity = document.querySelector(".humidity");
        this.pressure = document.querySelector(".pressure");
        this.windDeg = document.querySelector(".windDeg");
        this.windSpeed = document.querySelector(".windSpeed");
        this.seaLevel = document.querySelector(".seaLevel");
    }
    showData(weather) {
        var _a;
        const hide = new HideDiv();
        hide.showAll();
        $("html, body").animate({
            scrollTop: (_a = $("#desc-container").get(0)) === null || _a === void 0 ? void 0 : _a.scrollHeight,
        }, 500);
        this.errMsg.textContent = "";
        (this.cityName.textContent = weather.city + ", " + weather.country),
            (this.weatherTxt.textContent = weather.shortDesc),
            (this.description.textContent = weather.longDesc),
            (this.temp.textContent = weather.temp.toString() + "°C"),
            (this.tempMin.textContent = "Min : " + weather.minTemp.toString() + "°C"),
            (this.tempMax.textContent = "Max : " + weather.maxTemp.toString() + "°C"),
            (this.humidity.textContent = "Humidity : " + weather.humidity.toString()),
            (this.pressure.textContent = "Pressure : " + weather.pressure.toString()),
            (this.windDeg.textContent = "Degree : " + weather.windDeg.toString()),
            (this.windSpeed.textContent = "Speed : " + weather.windSpeed.toString());
        this.seaLevel.textContent = "Sea Level : " + weather.seaLevel.toString();
        this.changeBackground(weather.shortDesc);
    }
    showError() {
        const hide = new HideDiv();
        hide.hideAll();
        document.querySelector("input").style.borderColor = "#FF0000";
        document.querySelector("input").style.borderWidth = "2px";
        this.errMsg.textContent = "Please Enter Valid City...";
    }
    changeBackground(str) {
        let img = "./img/weather.jpg";
        if (str == "Clear") {
            img = "../img/clear.png";
        }
        else if (str == "Rain") {
            img = "../img/rain.png";
        }
        else if (str == "Clouds") {
            img = "../img/cloud.png";
        }
        else if (str == "Haze" || str == "Dust") {
            img = "../img/haze.png";
        }
        else if (str == "Snow") {
            img = "../img/snow.png";
        }
        document.body.style.backgroundImage = "url(" + img + ")";
    }
}
__decorate([
    autobind
], WeatherDisplay.prototype, "showData", null);
__decorate([
    autobind
], WeatherDisplay.prototype, "showError", null);
