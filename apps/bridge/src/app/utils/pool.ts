// timestamp in milliseconds
export const localToUTC = (date: number): Date => {
  const now = new Date();
  return new Date(date + now.getTimezoneOffset() * 60000);
};

// timestamp in milliseconds
export const utcToLocal = (date: number): Date => {
  const now = new Date();
  return new Date(date - now.getTimezoneOffset() * 60000);
};
