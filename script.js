let KEY = "31b4737fe4934d36963101226251303";


async function getData() {
  
let city = document.getElementById("cityNameId").value;
  if (city == "") {
    alert("Please enter city name");
    return;
  }

  let API = `https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${city}&days=7`;
  
  let res = await axios.get(API);
  
  let data = res.data;
  
  forecastDetails(data);
  document.getElementById("currentDetId").innerHTML = `
        <h1>${data.location.name}</h1>
        <h5>${data.location.region},${data.location.country}</h5>
        <h6>Chance of rain: ${data.forecast.forecastday[0].day.daily_chance_of_rain}%</h6>
        <h1>${data.current.temp_c}<sup>0</sup>C</h1>
    `;
  document.getElementById("iconId").innerHTML = `
    <img src="${data.current.condition.icon}" class="icon">
`;
document.getElementById("realFeel").innerHTML = `
<h3>${data.current.feelslike_c}</h3>`
;
  document.getElementById("wind").innerHTML = `
<h3>${data.current.wind_kph} km/h</h3>`
;

  document.getElementById("chancetorain").innerHTML = `
<h3>${data.forecast.forecastday[0].day.daily_chance_of_rain}%</h3>`
;
document.getElementById("uvindex").innerHTML = `
<h3>${data.current.uv}</h3>`

sevendaysforecast(data)
}


function forecastDetails(data){
  let hours= data.forecast.forecastday[0].hour;

  let cols =hours.reduce(function(cols,obj,ind){
      if(ind==6||ind==9||ind==12||ind==15||ind==18||ind==21){
        let col = `
        <div class="col-2">
          <h6>${ind>12?ind-12:ind}:00 ${ind>12?"PM":"AM"}</h6>
          <img src="${obj.condition.icon}">
          <h3>${obj.temp_c}</h3>
        
        </div>
      `
      cols = cols+col;
      }
      return cols
  },"");
  document.getElementById("forecastId").innerHTML=cols;

}
function sevendaysforecast(data) {
  let days = data.forecast.forecastday; 

  let forecastseven = "";

  for (let i = 0; i < days.length; i++) {
      let obj = days[i];
      let rows = `
          <div class="row days mb-3">
              <div class="col-4"><p>${obj.date}</p></div>
              <div class="col-2 icondays"><img src="${obj.day.condition.icon}" alt="Weather Icon"></div>
              <div class="col-4"><p>${obj.day.condition.text}</p></div>
              <div class="col-2"><p>${obj.day.maxtemp_c}/${obj.day.mintemp_c}</p></div>
          </div>      
      `;
      forecastseven= forecastseven+ rows; 
  }

  document.getElementById("weekForecastId").innerHTML = forecastseven;
}

