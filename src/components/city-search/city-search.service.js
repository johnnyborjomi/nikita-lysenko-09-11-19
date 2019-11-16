import { apiKey } from "../../../config.json";
import { cachedFetch } from "../../cached-fetch.service.js";

function cityMapper(data) {
  if (!data) return [];

  const cityList = data; //.map(city => city[propName]);

  return [...new Set(cityList)].slice(0, 10);
}

export default async function getCities(query) {
  if (query.length < 1) return Promise.resolve([]);

  const apiDomain =
    "https://dataservice.accuweather.com/locations/v1/cities/autocomplete";

  const apiUrl = `${apiDomain}?apikey=${apiKey}&q=${query}`;

  return cachedFetch(apiUrl)
    .then(cityMapper)
    .catch(err => {
      console.log(err);
    });
}
