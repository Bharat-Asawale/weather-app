class Weather{
    constructor(
    private city:string,
    private temp:number,
    private minTemp:number,
    private maxTemo:number,
    private sunRise:Date,
    private sunSet:Date
    ){}
}

class WeatherInput{
    public myFunction() {
        const city = document.querySelector("input")!.value;
        document.querySelector("input")!.value = "";
        const APIKEY = "dbe1df9f9ec34d7f7c36368aa7494614";
      
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric
          `,
          { mode: "cors" }
        )
          .then(function (response) {
            console.log(response);
            return response.json();
          })
          .then( (response) => {
            console.log(response);
            this.showData(response);
          })
          .catch( (err) => {
            this.showError();
          });
      }

    showData(response:any):Weather {
        const weather = new Weather(
            response.name + " , " + response.sys.country,
            response.main.temp_max,
            response.main.temp_min,
            response.main.temp_max,
            response.sys.sunrise,
            response.sys.sunset
        )  
        return weather;
      }

      showError(){
          return "Please Enter Valid City";
          console.log("error msg");
      }

}

