//todo: @vm: rename it to weather.service.js, or weather.endpoint.js

import { apiKey } from "../../../config.json";

//https://emojipedia.org/nature/
const weatherIcons = {
  //todo(vm): update icon codes for accuweather
  // https://developer.accuweather.com/weather-icons
  //day
  [1]: "☀️",
  [2]: "☀️",
  [3]: "☀️",
  ["02d"]: "🌤️",
  ["03d"]: "🌥️",
  ["04d"]: "☁️",
  ["09d"]: "🌧️",
  ["10d"]: "🌦️",
  ["11d"]: "⛈️",
  ["13d"]: "🌨️",
  ["50d"]: "🌫️",
  //night
  ["35"]: "🌚",
  ["02n"]: "🌤️",
  ["03n"]: "🌥️",
  ["04n"]: "☁️",
  ["09n"]: "🌧️",
  ["10n"]: "🌦️",
  ["11n"]: "⛈️",
  ["13n"]: "🌨️",
  ["35"]: "🌫️"
};

//todo: @vm: get only needed data from api, and return only it
function weatherMapper(locationData) {
  const { LocalizedName: cityName } = locationData;

  return function([data]) {
    const {
      WeatherIcon,
      WeatherText,
      Temperature,
      Pressure,
      RelativeHumidity
    } = data;

    let icon = weatherIcons[WeatherIcon] || "⛔️";

    const temp = Temperature.Metric.Value;
    const pressure = Pressure.Metric.Value;
    const humidity = RelativeHumidity;
    const description = WeatherText;

    return { cityName, icon, description, temp, pressure, humidity };
  };
}

//todo: @vm: no need to use class here, use just simple func instead
export default function getWeather(locationData) {
  const apiDomain = "http://dataservice.accuweather.com/currentconditions/v1";

  const apiEndpoint = `${apiDomain}/${locationData.Key}?apikey=${apiKey}&details=true`;

  return fetch(apiEndpoint)
    .then(data => data.json())
    .then(data => weatherMapper(locationData)(data))
    .catch(err => {
      console.log(err);
    });
}
