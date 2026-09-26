const store = new Map();

const cache = {
  get(key) {
    const item = store.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      store.delete(key);
      return null;
    }
    return item.value;
  },

  set(key, value, ttlSeconds = 1800) {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    store.set(key, { value, expiresAt });
  },

  clear() {
    store.clear();
  }
};

module.exports = cache;
