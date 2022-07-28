import { isEmpty } from 'lodash';
import { Observable, ReplaySubject, share } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Docs: https://rxjs.dev/deprecations/multicasting#publishreplay
 */
export const publishReplayRefCount =
  <R>() =>
  (source$: Observable<R>) =>
    source$.pipe(
      share({
        connector: () => new ReplaySubject(1),
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: false,
      })
    );

export const filterEmpty =
  <T>() =>
  (source$: Observable<T | null | undefined>) =>
    source$.pipe(filter((object): object is T => !isEmpty(object)));

export const filterUndefined =
  <T>() =>
  (source: Observable<T | undefined>) =>
    source.pipe(filter((value): value is T => value !== undefined));
