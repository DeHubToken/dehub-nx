import { getMonth, getYear, isAfter, isBefore } from 'date-fns';
import { PoolInfo } from '../state/application/types';

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

export const isComingPool = (pool: PoolInfo) => {
  return isBefore(new Date(), new Date(pool.openTimeStamp * 1000));
};

export const isLivePool = (pool: PoolInfo) => {
  return (
    isAfter(new Date(), new Date(pool.openTimeStamp * 1000)) &&
    isBefore(new Date(), new Date(pool.closeTimeStamp * 1000))
  );
};

export const isPastPool = (pool: PoolInfo) => {
  return isAfter(new Date(), new Date(pool.closeTimeStamp * 1000));
};

export const quarterNumber = (pool: PoolInfo): number => {
  const open = localToUTC(pool.openTimeStamp * 1000);
  const year = getYear(open);
  const month = getMonth(open);

  const quarter = Math.floor(month / 3) + 1;
  return year * 100 + quarter;
};

export const quarterMark = (pool: PoolInfo): string => {
  const open = localToUTC(pool.openTimeStamp * 1000);
  const year = getYear(open);
  const month = getMonth(open);
  const quarter = Math.floor(month / 3) + 1;
  return `Q${quarter} ${year}`;
};
