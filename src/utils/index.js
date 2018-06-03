export const cachify = fn => {
  let cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if(cache.has(key)) return cache.get(key);
    const val = fn.apply(this, args);
    cache.set(key, val);
    return val;
  };
};
