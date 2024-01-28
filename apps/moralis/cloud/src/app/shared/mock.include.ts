Object.defineProperty(global, 'localStorage', {
  value: (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value;
      },
      clear() {
        store = {};
      },
      removeItem(key) {
        delete store[key];
      },
    };
  })(),
});

global.XMLHttpRequest = require('xhr2');

/**
 * In Moralis-JS-SDK, if sdk is running in NODE environment,
 * then it does not store current user in local storage, and return null in
 * calling `Moralis.User.current()`
 * Reference: https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/main/src/CoreManager.js#L181
 * As above line, config.IS_NODE should return false to make all works
 *
 * const config: Config & { [key: string]: mixed } = {
 *   // Defaults
 *   IS_NODE:
 *     typeof process !== 'undefined' &&
 *       !!process.versions &&
 *       !!process.versions.node &&
 *       !process.versions.electron,
 *   ...
 * };
 */
delete process.versions['node'];
