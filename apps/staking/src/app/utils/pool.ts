import moment from 'moment';
import { PoolInfo } from '../state/application/types';

export const isComingPool = (pool: PoolInfo) => {
  return moment().isBefore(moment(new Date(pool.openTimeStamp * 1000)));
};

export const isLivePool = (pool: PoolInfo) => {
  return (
    moment().isAfter(moment(new Date(pool.openTimeStamp * 1000))) &&
    moment().isBefore(moment(new Date(pool.closeTimeStamp * 1000)))
  );
};

export const isPastPool = (pool: PoolInfo) => {
  return moment().isAfter(moment(new Date(pool.closeTimeStamp * 1000)));
};

export const quarterNumber = (pool: PoolInfo): number => {
  const mnt = moment(new Date(pool.openTimeStamp * 1000));
  return mnt.year() * 100 + mnt.quarter();
};

export const yearNumber = (pool: PoolInfo): number => {
  return moment(new Date(pool.openTimeStamp * 1000)).year();
};

export const quarterMark = (pool: PoolInfo): string => {
  const quarter = moment(new Date(pool.openTimeStamp * 1000)).quarter();
  return `Q${quarter} ${yearNumber(pool)}`;
};
