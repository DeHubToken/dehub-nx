import dayjs from 'dayjs';

export const timeFromNow = (time: dayjs.Dayjs) => {
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

  const daysW = days > 0 ? `${days}d ` : ' ';
  const hoursW = hours > 0 ? `${hours}h ` : ' ';
  const minutesW = minutes > 0 ? `${minutes}m ` : ' ';
  const secondsW = seconds > 0 ? `${seconds}s` : '';

  return `${daysW}${hoursW}${minutesW}${secondsW}`;
};
