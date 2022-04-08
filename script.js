// Get the input field
var input = document.getElementById("cityInput");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("myBtn").click();
  }
});

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
    .then(function (response) {
      console.log(response);
      showData(response);
    })
    .catch(function (err) {
      showError();
    });
}

function showError() {
  errMsg.textContent = "Please Enter Valid City...";
  cityName.textContent = "";
  temp.textContent = "";
  weatherTxt.textContent = "";
  description.textContent = "";
  tempMinMax.textContent = "";
  deg.textContent = "";
}

function showData(response) {
  errMsg.textContent = "";
  cityName.textContent = response.name + " , " + response.sys.country ;
  temp.textContent = response.main.temp_max;
  deg.textContent = "°C";
  let weatherData = response.weather[0].main;
  weatherTxt.textContent = weatherData;
  description.textContent = response.weather[0].description;
  let minMax = response.main.temp_min + " - " + response.main.temp_max + "°C";
  tempMinMax.textContent = minMax;
  let sunrise = response.sys.sunrise;
  let sunset = response.sys.sunset;
  let timezone = response.timezone;
  convertTime(sunrise);
  convertTime(sunset);
  changeBackground(weatherData);
}

function convertTime(time) {
  var d = new Date(time);
  var hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  var formattedTime = hours + ":" + minutes;
  console.log(formattedTime);
}

function changeBackground(str) {
  let img = "./weather.jpg";
  if (str == "Clear") {
    img = "./img/clear.png";
  } else if (str == "Rain") {
    img = "./img/rain.png";
  } else if (str == "Clouds") {
    img = "./img/cloud.png";
  } else if (str == "Haze") {
    img = "./img/haze.png";
  } else if (str  == "Snow"){
    img = "./img/snow.png";
  }
  document.body.style.backgroundImage = `url(${img})`;
}


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  

  let cities = 
  [
  'Adilabad',
  'Anantapur',
  'Chittoor',
  'Kakinada',
  'Guntur',
  'Hyderabad',
  'Karimnagar',
  'Khammam',
  'Krishna',
  'Kurnool',
  'Mahbubnagar',
  'Medak',
  'Nalgonda',
  'Nizamabad',
  'Ongole',
  'Hyderabad',
  'Srikakulam',
  'Nellore',
  'Visakhapatnam',
  'Vizianagaram',
  'Warangal',
  'Eluru',
  'Kadapa',
  'Anjaw',
  'Changlang',
  'East Siang',
  'Kurung Kumey',
  'Lohit',
  'Lower Dibang Valley',
  'Lower Subansiri',
  'Papum Pare',
  'Tawang',
  'Tirap',
  'Dibang Valley',
  'Upper Siang',
  'Upper Subansiri',
  'West Kameng',
  'West Siang',
  'Baksa',
  'Barpeta',
  'Bongaigaon',
  'Cachar',
  'Chirang',
  'Darrang',
  'Dhemaji',
  'Dima Hasao',
  'Dhubri',
  'Dibrugarh',
  'Goalpara',
  'Golaghat',
  'Hailakandi',
  'Jorhat',
  'Kamrup',
  'Kamrup Metropolitan',
  'Karbi Anglong',
  'Karimganj',
  'Kokrajhar',
  'Lakhimpur',
  'Marigaon',
  'Nagaon',
  'Nalbari',
  'Sibsagar',
  'Sonitpur',
  'Tinsukia',
  'Udalguri',
  'Araria',
  'Arwal',
  'Aurangabad',
  'Banka',
  'Begusarai',
  'Bhagalpur',
  'Bhojpur',
  'Buxar',
  'Darbhanga',
  'East Champaran',
  'Gaya',
  'Gopalganj',
  'Jamui',
  'Jehanabad',
  'Kaimur',
  'Katihar',
  'Khagaria',
  'Kishanganj',
  'Lakhisarai',
  'Madhepura',
  'Madhubani',
  'Munger',
  'Muzaffarpur',
  'Nalanda',
  'Nawada',
  'Patna',
  'Purnia',
  'Rohtas',
  'Saharsa',
  'Samastipur',
  'Saran',
  'Sheikhpura',
  'Sheohar',
  'Sitamarhi',
  'Siwan',
  'Supaul',
  'Vaishali',
  'West Champaran',
  'Chandigarh',
  'Bastar',
  'Bijapur',
  'Bilaspur',
  'Dantewada',
  'Dhamtari',
  'Durg',
  'Jashpur',
  'Janjgir-Champa',
  'Korba',
  'Koriya',
  'Kanker',
  'Kabirdham (Kawardha)',
  'Mahasamund',
  'Narayanpur',
  'Raigarh',
  'Rajnandgaon',
  'Raipur',
  'Surguja',
  'Dadra and Nagar Haveli',
  'Daman',
  'Diu',
  'Central Delhi',
  'East Delhi',
  'New Delhi',
  'North Delhi',
  'North East Delhi',
  'North West Delhi',
  'South Delhi',
  'South West Delhi',
  'West Delhi',
  'North Goa',
  'South Goa',
  'Ahmedabad',
  'Amreli district',
  'Anand',
  'Banaskantha',
  'Bharuch',
  'Bhavnagar',
  'Dahod',
  'The Dangs',
  'Gandhinagar',
  'Jamnagar',
  'Junagadh',
  'Kutch',
  'Kheda',
  'Mehsana',
  'Narmada',
  'Navsari',
  'Patan',
  'Panchmahal',
  'Porbandar',
  'Rajkot',
  'Sabarkantha',
  'Surendranagar',
  'Surat',
  'Vyara',
  'Vadodara',
  'Valsad',
  'Ambala',
  'Bhiwani',
  'Faridabad',
  'Fatehabad',
  'Gurgaon',
  'Hissar',
  'Jhajjar',
  'Jind',
  'Karnal',
  'Kaithal',
  'Kurukshetra',
  'Mahendragarh',
  'Mewat',
  'Palwal',
  'Panchkula',
  'Panipat',
  'Rewari',
  'Rohtak',
  'Sirsa',
  'Sonipat',
  'Yamuna Nagar',
  'Bilaspur',
  'Chamba',
  'Hamirpur',
  'Kangra',
  'Kinnaur',
  'Kullu',
  'Lahaul and Spiti',
  'Mandi',
  'Shimla',
  'Sirmaur',
  'Solan',
  'Una',
  'Anantnag',
  'Badgam',
  'Bandipora',
  'Baramulla',
  'Doda',
  'Ganderbal',
  'Jammu',
  'Kargil',
  'Kathua',
  'Kishtwar',
  'Kupwara',
  'Kulgam',
  'Leh',
  'Poonch',
  'Pulwama',
  'Rajauri',
  'Ramban',
  'Reasi',
  'Samba',
  'Shopian',
  'Srinagar',
  'Udhampur',
  'Bokaro',
  'Chatra',
  'Deoghar',
  'Dhanbad',
  'Dumka',
  'East Singhbhum',
  'Garhwa',
  'Giridih',
  'Godda',
  'Gumla',
  'Hazaribag',
  'Jamtara',
  'Khunti',
  'Koderma',
  'Latehar',
  'Lohardaga',
  'Pakur',
  'Palamu',
  'Ramgarh',
  'Ranchi',
  'Sahibganj',
  'Seraikela Kharsawan',
  'Simdega',
  'West Singhbhum',
  'Bagalkot',
  'Bangalore Rural',
  'Bangalore Urban',
  'Belgaum',
  'Bellary',
  'Bidar',
  'Bijapur',
  'Chamarajnagar',
  'Chikkamagaluru',
  'Chikkaballapur',
  'Chitradurga',
  'Davanagere',
  'Dharwad',
  'Dakshina Kannada',
  'Gadag',
  'Gulbarga',
  'Hassan',
  'Haveri district',
  'Kodagu',
  'Kolar',
  'Koppal',
  'Mandya',
  'Mysore',
  'Raichur',
  'Shimoga',
  'Tumkur',
  'Udupi',
  'Uttara Kannada',
  'Ramanagara',
  'Yadgir',
  'Alappuzha',
  'Ernakulam',
  'Idukki',
  'Kannur',
  'Kasaragod',
  'Kollam',
  'Kottayam',
  'Kozhikode',
  'Malappuram',
  'Palakkad',
  'Pathanamthitta',
  'Thrissur',
  'Thiruvananthapuram',
  'Wayanad',
  'Alirajpur',
  'Anuppur',
  'Ashok Nagar',
  'Balaghat',
  'Barwani',
  'Betul',
  'Bhind',
  'Bhopal',
  'Burhanpur',
  'Chhatarpur',
  'Chhindwara',
  'Damoh',
  'Datia',
  'Dewas',
  'Dhar',
  'Dindori',
  'Guna',
  'Gwalior',
  'Harda',
  'Hoshangabad',
  'Indore',
  'Jabalpur',
  'Jhabua',
  'Katni',
  'Khandwa (East Nimar)',
  'Khargone (West Nimar)',
  'Mandla',
  'Mandsaur',
  'Morena',
  'Narsinghpur',
  'Neemuch',
  'Panna',
  'Rewa',
  'Rajgarh',
  'Ratlam',
  'Raisen',
  'Sagar',
  'Satna',
  'Sehore',
  'Seoni',
  'Shahdol',
  'Shajapur',
  'Sheopur',
  'Shivpuri',
  'Sidhi',
  'Singrauli',
  'Tikamgarh',
  'Ujjain',
  'Umaria',
  'Vidisha',
  'Ahmednagar',
  'Akola',
  'Amravati',
  'Aurangabad',
  'Bhandara',
  'Beed',
  'Buldhana',
  'Chandrapur',
  'Dhule',
  'Gadchiroli',
  'Gondia',
  'Hingoli',
  'Jalgaon',
  'Jalna',
  'Kolhapur',
  'Latur',
  'Mumbai City',
  'Mumbai suburban',
  'Nandurbar',
  'Nanded',
  'Nagpur',
  'Nashik',
  'Osmanabad',
  'Parbhani',
  'Pune',
  'Raigad',
  'Ratnagiri',
  'Sindhudurg',
  'Sangli',
  'Solapur',
  'Satara',
  'Thane',
  'Wardha',
  'Washim',
  'Yavatmal',
  'Bishnupur',
  'Churachandpur',
  'Chandel',
  'Imphal East',
  'Senapati',
  'Tamenglong',
  'Thoubal',
  'Ukhrul',
  'Imphal West',
  'East Garo Hills',
  'East Khasi Hills',
  'Jaintia Hills',
  'Ri Bhoi',
  'South Garo Hills',
  'West Garo Hills',
  'West Khasi Hills',
  'Aizawl',
  'Champhai',
  'Kolasib',
  'Lawngtlai',
  'Lunglei',
  'Mamit',
  'Saiha',
  'Serchhip',
  'Dimapur',
  'Kohima',
  'Mokokchung',
  'Mon',
  'Phek',
  'Tuensang',
  'Wokha',
  'Zunheboto',
  'Angul',
  'Boudh (Bauda)',
  'Bhadrak',
  'Balangir',
  'Bargarh (Baragarh)',
  'Balasore',
  'Cuttack',
  'Debagarh (Deogarh)',
  'Dhenkanal',
  'Ganjam',
  'Gajapati',
  'Jharsuguda',
  'Jajpur',
  'Jagatsinghpur',
  'Khordha',
  'Kendujhar (Keonjhar)',
  'Kalahandi',
  'Kandhamal',
  'Koraput',
  'Kendrapara',
  'Malkangiri',
  'Mayurbhanj',
  'Nabarangpur',
  'Nuapada',
  'Nayagarh',
  'Puri',
  'Rayagada',
  'Sambalpur',
  'Subarnapur (Sonepur)',
  'Sundergarh',
  'Karaikal',
  'Mahe',
  'Pondicherry',
  'Yanam',
  'Amritsar',
  'Barnala',
  'Bathinda',
  'Firozpur',
  'Faridkot',
  'Fatehgarh Sahib',
  'Fazilka',
  'Gurdaspur',
  'Hoshiarpur',
  'Jalandhar',
  'Kapurthala',
  'Ludhiana',
  'Mansa',
  'Moga',
  'Sri Muktsar Sahib',
  'Pathankot',
  'Patiala',
  'Rupnagar',
  'Ajitgarh (Mohali)',
  'Sangrur',
  'Nawanshahr',
  'Tarn Taran',
  'Ajmer',
  'Alwar',
  'Bikaner',
  'Barmer',
  'Banswara',
  'Bharatpur',
  'Baran',
  'Bundi',
  'Bhilwara',
  'Churu',
  'Chittorgarh',
  'Dausa',
  'Dholpur',
  'Dungapur',
  'Ganganagar',
  'Hanumangarh',
  'Jhunjhunu',
  'Jalore',
  'Jodhpur',
  'Jaipur',
  'Jaisalmer',
  'Jhalawar',
  'Karauli',
  'Kota',
  'Nagaur',
  'Pali',
  'Pratapgarh',
  'Rajsamand',
  'Sikar',
  'Sawai Madhopur',
  'Sirohi',
  'Tonk',
  'Udaipur',
  'East Sikkim',
  'North Sikkim',
  'South Sikkim',
  'West Sikkim',
  'Ariyalur',
  'Chennai',
  'Coimbatore',
  'Cuddalore',
  'Dharmapuri',
  'Dindigul',
  'Erode',
  'Kanchipuram',
  'Kanyakumari',
  'Karur',
  'Madurai',
  'Nagapattinam',
  'Nilgiris',
  'Namakkal',
  'Perambalur',
  'Pudukkottai',
  'Ramanathapuram',
  'Salem',
  'Sivaganga',
  'Tirupur',
  'Tiruchirappalli',
  'Theni',
  'Tirunelveli',
  'Thanjavur',
  'Thoothukudi',
  'Tiruvallur',
  'Tiruvarur',
  'Tiruvannamalai',
  'Vellore',
  'Viluppuram',
  'Virudhunagar',
  'Dhalai',
  'North Tripura',
  'South Tripura',
  'Khowai',
  'West Tripura',
  'Agra',
  'Allahabad',
  'Aligarh',
  'Ambedkar Nagar',
  'Auraiya',
  'Azamgarh',
  'Barabanki',
  'Budaun',
  'Bagpat',
  'Bahraich',
  'Bijnor',
  'Ballia',
  'Banda',
  'Balrampur',
  'Bareilly',
  'Basti',
  'Bulandshahr',
  'Chandauli',
  'Chhatrapati Shahuji Maharaj Nagar',
  'Chitrakoot',
  'Deoria',
  'Etah',
  'Kanshi Ram Nagar',
  'Etawah',
  'Firozabad',
  'Farrukhabad',
  'Fatehpur',
  'Faizabad',
  'Gautam Buddh Nagar',
  'Gonda',
  'Ghazipur',
  'Gorakhpur',
  'Ghaziabad',
  'Hamirpur',
  'Hardoi',
  'Mahamaya Nagar',
  'Jhansi',
  'Jalaun',
  'Jyotiba Phule Nagar',
  'Jaunpur district',
  'Ramabai Nagar (Kanpur Dehat)',
  'Kannauj',
  'Kanpur',
  'Kaushambi',
  'Kushinagar',
  'Lalitpur',
  'Lakhimpur Kheri',
  'Lucknow',
  'Mau',
  'Meerut',
  'Maharajganj',
  'Mahoba',
  'Mirzapur',
  'Moradabad',
  'Mainpuri',
  'Mathura',
  'Muzaffarnagar',
  'Panchsheel Nagar district (Hapur)',
  'Pilibhit',
  'Shamli',
  'Pratapgarh',
  'Rampur',
  'Raebareli',
  'Saharanpur',
  'Sitapur',
  'Shahjahanpur',
  'Sant Kabir Nagar',
  'Siddharthnagar',
  'Sonbhadra',
  'Sant Ravidas Nagar',
  'Sultanpur',
  'Shravasti',
  'Unnao',
  'Varanasi',
  'Almora',
  'Bageshwar',
  'Chamoli',
  'Champawat',
  'Dehradun',
  'Haridwar',
  'Nainital',
  'Pauri Garhwal',
  'Pithoragarh',
  'Rudraprayag',
  'Tehri Garhwal',
  'Udham Singh Nagar',
  'Uttarkashi',
  'Birbhum',
  'Bankura',
  'Bardhaman',
  'Darjeeling',
  'Dakshin Dinajpur',
  'Hooghly',
  'Howrah',
  'Jalpaiguri',
  'Cooch Behar',
  'Kolkata',
  'Maldah',
  'Paschim Medinipur',
  'Purba Medinipur',
  'Murshidabad',
  'Nadia',
  'North 24 Parganas',
  'South 24 Parganas',
  'Purulia',
  'Uttar Dinajpur',
];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("cityInput"), cities);