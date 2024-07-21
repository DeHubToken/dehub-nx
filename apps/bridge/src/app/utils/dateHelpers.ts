// date: timestamp in miliseconds
export const localToUTC = (date: number): Date => {
  const now = new Date();
  return new Date(date + now.getTimezoneOffset() * 60000);
};

// date: timestamp in miliseconds
export const utcToLocal = (date: number): Date => {
  const now = new Date();
  return new Date(date - now.getTimezoneOffset() * 60000);
};
