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

export default cache;
