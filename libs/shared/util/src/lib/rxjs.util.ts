import { isNil } from 'lodash';
import { filter, Observable, ReplaySubject, share } from 'rxjs';

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

export const filterNil =
  <T>() =>
  (source$: Observable<T | null | undefined>) =>
    source$.pipe(filter((object): object is T => !isNil(object)));
