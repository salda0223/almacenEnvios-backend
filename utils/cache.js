const cache = new Map();

export const setCache = (key, data, ttlMs = 300000) => {
    const expires = Date.now() + ttlMs;
    cache.set(key, { data, expires });

};

export const getCache = (key) => {
    const cached = cache.get(key);
    if (!cached) return null;

    if (Date.now() > cached.expires) {
        cache.delete(key);
        return null;
    }

    return cached.data;

};


export const clearCache = (key) => cache.delete(key);


