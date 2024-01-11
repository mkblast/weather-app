async function fetchWeather(location) {
  const request = new Request(
    `http://api.weatherapi.com/v1/forecast.json?key=0156e23da18f4b8d8ac205307240901&q=${location}&days=3`,
    {
      mode: "cors",
    }
  );

  const recieve = await fetch(request);
  return await recieve.json();
}

function astro(forecast) {
  const sunrise = document.querySelectorAll(".sunrise");
  const sunset = document.querySelectorAll(".sunset");

  for (let i = 0; i < forecast.length; i++) {
    sunrise[i].textContent = `Sunrise: ${forecast[i]["astro"]["sunrise"]}`;
    sunset[i].textContent = `Sunset: ${forecast[i]["astro"]["sunset"]}`;
  }
}

function day(forecast) {
  const date = document.querySelectorAll(".date");
  const condition = document.querySelectorAll(".condition");
  const mintemp = document.querySelectorAll(".mintemp");
  const maxtemp = document.querySelectorAll(".maxtemp");
  const rainchance = document.querySelectorAll(".rainchance");

  for (let i = 0; i < forecast.length; i++) {
    date[i].textContent = `${forecast[i]["date"]}`;
    condition[i].textContent = `Condition: ${forecast[i]["day"]["condition"]["text"]}`;
    maxtemp[i].textContent = `min tempreture: ${forecast[i]["day"]["mintemp_c"]}`;
    mintemp[i].textContent = `Max tempreture: ${forecast[i]["day"]["maxtemp_c"]}`;
    rainchance[i].textContent = `Chance of rain: ${forecast[i]["day"]["daily_chance_of_rain"]}`;
  }
}

function currentDay(current) {
  const timeAndDate = document.querySelector(".time-date");
  const currentCondition = document.querySelector(".current-condition");
  const temp = document.querySelector(".temp");
  const wind = document.querySelector(".wind");

  timeAndDate.textContent = `Today: ${current["last_updated"]}`;
  currentCondition.textContent = `Condition: ${current["condition"]["text"]}`
  temp.textContent = `Tempreture: ${current["temp_c"]}`;
  wind.textContent = `Wind: ${current["wind_kph"]}kph`
}

const btn = document.querySelector(".search-btn");
btn.addEventListener("click", startApp);

async function startApp() {
  try {
    const location = encodeURIComponent(document.querySelector(".search-input").value);

    let data = await fetchWeather(location);

    const bruh = new Date()
    console.log(bruh.toLocaleDateString())
    const something = data["forecast"];
    console.log(data)
    console.log(something)

    const forecast = data["forecast"]["forecastday"];
    const current = data["current"];

    console.log(forecast)

    currentDay(current);
    day(forecast);
    astro(forecast);
  } catch(err) {
    alert(e)
  }
}

