/**
 * This file is only used to be imported in .spec.ts files to mock browser Apis
 */
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});
global.XMLHttpRequest = require('xhr2');

export {};
