document.getElementById("myBtn").onclick = function () {
  myFunction();
};

const errMsg = document.querySelector(".error");
const temp = document.querySelector(".temp");
const cityName = document.querySelector(".city");
const weatherTxt = document.querySelector(".weather");
const description = document.querySelector(".description");
const tempMinMax = document.querySelector(".min-max");
const container = document.querySelector(".container");
const deg = document.querySelector(".deg");

function myFunction() {
  const city = document.querySelector("input").value;
  document.querySelector("input").value = "";
  const APIKEY = "dbe1df9f9ec34d7f7c36368aa7494614"

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric
    `,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      showData(response);
    })
    .catch(function(err){
      showError();
    });
}

function showError(){
  errMsg.textContent = "Please Enter Valid City...";
  cityName.textContent = "";
  temp.textContent = "";
  weatherTxt.textContent = "";
  description.textContent = "";
  tempMinMax.textContent = "";
  deg.textContent = "";
}

function showData(response) {
  errMsg.textContent="";
  cityName.textContent = response.name;
  temp.textContent = response.main.temp_max;
  deg.textContent = "°C";
  weatherTxt.textContent = response.weather[0].main;
  description.textContent = response.weather[0].description;
  let minMax = response.main.temp_min + " - " + response.main.temp_max + "°C";
  tempMinMax.textContent = minMax;
}
