/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Polyfill stable language features. These imports will be optimized by `@babel/preset-env`.
 *
 * See: https://github.com/zloirock/core-js#babel
 */
import { Buffer } from 'buffer';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

(window as any).global = window;
global.Buffer = Buffer;
global.process = {
  env: { DEBUG: undefined },
  version: '',
} as any;
