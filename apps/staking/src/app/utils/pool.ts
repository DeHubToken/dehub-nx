import dayjs from 'dayjs';
import { PoolInfo } from '../state/application/types';

export const isComingPool = (pool: PoolInfo) => {
  return dayjs().isBefore(dayjs(new Date(pool.openTimeStamp * 1000)));
};

export const isLivePool = (pool: PoolInfo) => {
  return (
    dayjs().isAfter(dayjs(new Date(pool.openTimeStamp * 1000))) &&
    dayjs().isBefore(dayjs(new Date(pool.closeTimeStamp * 1000)))
  );
};

export const isPastPool = (pool: PoolInfo) => {
  return dayjs().isAfter(dayjs(new Date(pool.closeTimeStamp * 1000)));
};

export const quarterNumber = (pool: PoolInfo): number => {
  const mnt = dayjs(new Date(pool.openTimeStamp * 1000));
  const quarter = Math.floor(mnt.month() / 3) + 1;
  return mnt.year() * 100 + quarter;
};

export const yearNumber = (pool: PoolInfo): number => {
  return dayjs(new Date(pool.openTimeStamp * 1000)).year();
};

export const quarterMark = (pool: PoolInfo): string => {
  const opening = dayjs(new Date(pool.openTimeStamp * 1000));
  const quarter = Math.floor(opening.month() / 3) + 1;
  return `Q${quarter} ${yearNumber(pool)}`;
};
