import { TrackByFunction } from '@angular/core';
import { SysFragment } from '@dehub/shared/model';
import { MenuItem } from 'primeng/api';

export const trackByContentfulIdFn =
  <T extends { sys: SysFragment } | undefined | null>(): TrackByFunction<T> =>
  (index: number, item: T) =>
    item ? item.sys.id : index;

export const trackByMenuItemFn =
  (): TrackByFunction<MenuItem> => (index: number, item: MenuItem) =>
    item.label ? item.label : index;

export const trackByItemFn =
  <T>(): TrackByFunction<T> =>
  (index_: number, item: T) =>
    item;
