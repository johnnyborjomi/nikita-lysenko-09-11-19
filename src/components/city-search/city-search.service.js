import WeatherService from "../weather-widget/weather.service.js";

function getCitiesExternal(query) {
  const apiDomain =
    "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
  const apiKey = "YvWUlJ9J8Si4e90YIPKEReJfn95BFTIK";

  const apiUrl = `${apiDomain}?apikey=${apiKey}&q=${query}`;

  return (
    fetch(apiUrl)
      .then(res => res.json())
      // .then(data => (console.log(data), data))
      .then(cityMapper)
      .catch(err => {
        console.log(err);
      })
  );
}

function cityMapper(data, propName = "LocalizedName") {
  if (!data) return [];

  const cityList = data.map(city => city[propName]);

  return [...new Set(cityList)].slice(0, 10);
}

const weatherService = new WeatherService();

export async function getCities(query) {
  if (query.length < 1) return Promise.resolve([]);

  return getCitiesExternal(query);

  // const latLng = getLatLng(query);
  // const zip = getZip(query);

  // if (latLng) {
  //   const cityName = await weatherService.getCityNameByLatLng(latLng);
  //   if (cityName) {
  //     return [cityName];
  //   }
  // }

  // if (zip) {
  //   const cityName = await weatherService.getCityNameByZip(zip);
  //   if (cityName) {
  //     return [cityName];
  //   }
  // }

  // let filtredCities = cities.filter((city, i) => {
  //   return city.toLowerCase().substr(0, query.length) == query.toLowerCase();
  // });

  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(filtredCities.slice(0, 10));
  //   }, 1000);
  // });
}

// function getZip(query = "") {
//   const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;

//   const matched = zipRegex.exec(query);

//   if (!Array.isArray(matched)) return null;

//   return matched;
// }

// function getLatLng(query = "") {
//   // regex from here:
//   // https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates
//   const latLngRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

//   const matched = latLngRegex.exec(query);

//   if (!Array.isArray(matched)) return null;

//   // indicies depend on regex
//   const latitude = matched[1];
//   const longitude = matched[4];

//   return { latitude, longitude };
// }
