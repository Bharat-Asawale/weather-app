import { autobind, HideDiv } from "../util/util.js";
import { Weather } from "../weather/weather.js";

export class WeatherDisplay {
  errMsg = document.querySelector(".error") as HTMLElement;
  cityName = document.querySelector(".city") as HTMLElement;
  temp = document.querySelector(".temp") as HTMLElement;
  weatherTxt = document.querySelector(".weather") as HTMLElement;
  description = document.querySelector(".description") as HTMLElement;
  tempMin = document.querySelector(".temp-min") as HTMLElement;
  tempMax = document.querySelector(".temp-max") as HTMLElement;
  humidity = document.querySelector(".humidity") as HTMLElement;
  pressure = document.querySelector(".pressure") as HTMLElement;
  windDeg = document.querySelector(".windDeg") as HTMLElement;
  windSpeed = document.querySelector(".windSpeed") as HTMLElement;
  seaLevel = document.querySelector(".seaLevel") as HTMLElement;
  @autobind
  showData(weather: Weather) {
    const hide = new HideDiv();
    hide.showAll();

    $("html, body").animate(
      {
        scrollTop: $("#desc-container").get(0)?.scrollHeight,
      },
      500
    );

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

  @autobind
  showError() {
    const hide = new HideDiv();
    hide.hideAll();
    document.querySelector("input")!.style.borderColor = "#FF0000";
    document.querySelector("input")!.style.borderWidth = "2px";
    this.errMsg.textContent = "Please Enter Valid City...";
  }

  changeBackground(str: string) {
    let img = "./img/weather.jpg";
    if (str == "Clear") {
      img = "../img/clear.png";
    } else if (str == "Rain") {
      img = "../img/rain.png";
    } else if (str == "Clouds") {
      img = "../img/cloud.png";
    } else if (str == "Haze" || str == "Dust") {
      img = "../img/haze.png";
    } else if (str == "Snow") {
      img = "../img/snow.png";
    }

    document.body.style.backgroundImage = "url(" + img + ")";
  }
}
