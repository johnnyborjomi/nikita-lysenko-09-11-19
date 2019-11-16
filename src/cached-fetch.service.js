//const cache = new Map();

const cache = {
  storage: localStorage,

  get(key) {
    return JSON.parse(this.storage.getItem(key));
  },
  set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  },
  has(key) {
    return this.storage.getItem(key) !== null;
  }
};

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
