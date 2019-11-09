import { apiKey } from "../../../config.json";
import apiUsageService from "../api-usage.service.js";

function cityMapper(data) {
  if (!data) return [];

  const cityList = data; //.map(city => city[propName]);

  return [...new Set(cityList)].slice(0, 10);
}

export default async function getCities(query) {
  if (query.length < 1) return Promise.resolve([]);

  const apiDomain =
    "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";

  const apiUrl = `${apiDomain}?apikey=${apiKey}&q=${query}`;

  return (
    fetch(apiUrl)
      .then(apiUsageService.updateApiUsage)
      .then(res => res.json())
      // .then(data => (console.log(data), data))
      .then(cityMapper)
      .catch(err => {
        console.log(err);
      })
  );
}
