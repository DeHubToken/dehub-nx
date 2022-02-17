export function isBoolean(obj: unknown): obj is boolean {
  return typeof obj === 'boolean' || obj === 'true' || obj === 'false';
}

export function isFloat(n: unknown): boolean {
  return Number(n) === n && n % 1 !== 0;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(obj: unknown): obj is Function {
  return typeof obj === 'function';
}

export function isInt(n: unknown): boolean {
  return Number(n) === n && n % 1 === 0;
}

export function isNil<T>(
  value: T | null | undefined
): value is null | undefined {
  return value === null || isUndefined(value);
}

export function isNotNil<T>(value: T | null | undefined): value is T {
  return !isNil(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumeric(obj: any): obj is number {
  return !Array.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
}

export function isString(arg: unknown): arg is string {
  return typeof arg === 'string';
}

export function isUndefined(obj: unknown): obj is undefined {
  return typeof obj === 'undefined';
}
export function isNotUndefined<T>(obj: T): obj is T {
  return typeof obj !== 'undefined';
}
