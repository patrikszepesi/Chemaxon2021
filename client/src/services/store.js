import Store from 'store';

export const get = key => Store.get(key);

export const set = (key, value) => Store.set(key, value);

export const remove = key => Store.remove(key);

export const clearAll = () => Store.clearAll();
