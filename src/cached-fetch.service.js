import cache from "./cache";

export async function cachedFetch(url, config) {
  if (cache.has(url)) {
    return cache.get(url);
  } else {
    return fetch(url, config)
      .then(data => data.json())
      .then(json => {
        cache.set(url, json);

        return json;
      });
  }
}
