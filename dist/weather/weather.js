export class Weather {
    constructor(city, country, shortDesc, longDesc, temp, minTemp, maxTemp, sunRise, sunSet, humidity, pressure, windDeg, windSpeed, seaLevel) {
        this.city = city;
        this.country = country;
        this.shortDesc = shortDesc;
        this.longDesc = longDesc;
        this.temp = temp;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.sunRise = sunRise;
        this.sunSet = sunSet;
        this.humidity = humidity;
        this.pressure = pressure;
        this.windDeg = windDeg;
        this.windSpeed = windSpeed;
        this.seaLevel = seaLevel;
    }
}
