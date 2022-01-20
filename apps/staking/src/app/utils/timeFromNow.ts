import { Moment } from 'moment';

export const timeFromNow = (time: Moment) => {
  const unixTime = time.unix();
  if (!unixTime) return;
  const now = new Date().getTime();

  // Calculate difference
  let difference = unixTime - now / 1000;
  difference = Math.abs(difference);

  const days = Math.floor(difference / (60 * 60 * 24));
  const hours = Math.floor((difference - 60 * 60 * 24 * days) / 3600);
  const minutes = Math.floor(
    (difference - 60 * 60 * 24 * days - 3600 * hours) / 60
  );
  const seconds = Math.floor(difference % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};
