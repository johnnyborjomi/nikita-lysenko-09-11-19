//todo: @vm: rename it to weather.service.js, or weather.endpoint.js

import { apiKey } from "../../../config.json";
import apiUsageService from "../api-usage.service.js";

//https://emojipedia.org/nature/
const weatherIcons = {
  //todo(vm): update icon codes for accuweather
  // https://developer.accuweather.com/weather-icons
  //day
  [1]: "☀️", //  1	Sunny
  [2]: "☀️", //  2	Mostly Sunny
  [3]: "🌤", //  3	Partly Sunny
  [4]: "🌤", //  4	Intermittent Clouds
  [5]: "🌥️", //  5	Hazy Sunshine
  [6]: "🌥️", //  6	Mostly Cloudy
  [7]: "☁️", //  7	Cloudy
  [8]: "☁️", //  8	Dreary
  [11]: "🌫️", // 11	Fog
  [12]: "🌧️", // 12	Showers
  [13]: "🌦️", // 13	Mostly Cloudy w/ Showers
  [14]: "🌦️", // 14	Partly Sunny w/ Showers
  [15]: "⛈️", // 15	T-Storms
  [16]: "⛈️", // 16	Mostly Cloudy w/ T-Storms
  [17]: "⛈️", // 17	Partly Sunny w/ T-Storms
  [18]: "🌨️", // 18	Rain
  [19]: "☁️", // 19	Flurries
  [20]: "🌥️", // 20	Mostly Cloudy w/ Flurries
  [21]: "🌥️", // 21	Partly Sunny w/ Flurries
  [22]: "🌨️", // 22	Snow
  [23]: "🌨️", // 23	Mostly Cloudy w/ Snow
  [24]: "❄️", // 24	Ice
  [25]: "🌨️", // 25	Sleet
  [26]: "🌨️", // 26	Freezing Rain
  [29]: "🌨️", // 29	Rain and Snow
  [30]: "🥵", // 30	Hot
  [31]: "🥶", // 31	Cold
  [32]: "🌬️", // 32	Windy
  //night
  [33]: "🌚", //	Clear
  [34]: "🌚", //	Mostly Clear
  [35]: "🌚", //	Partly Cloudy
  [36]: "🌚", //	Intermittent Clouds
  [37]: "🌚", //	Hazy Moonlight
  [38]: "🌚", //	Mostly Cloudy
  [39]: "🌚", //	Partly Cloudy w/ Showers
  [40]: "🌚", //	Mostly Cloudy w/ Showers
  [41]: "🌚", //	Partly Cloudy w/ T-Storms
  [42]: "🌚", //	Mostly Cloudy w/ T-Storms
  [43]: "🌚", //	Mostly Cloudy w/ Flurries
  [44]: "🌚" //	  Mostly Cloudy w/ Snow
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
    .then(apiUsageService.updateApiUsage)
    .then(data => data.json())
    .then(data => weatherMapper(locationData)(data))
    .catch(err => {
      console.log(err);
    });
}
