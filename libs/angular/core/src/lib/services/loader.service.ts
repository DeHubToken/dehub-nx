import { Inject, Injectable } from '@angular/core';
import { EnvToken } from '@dehub/angular/model';
import { SharedEnv } from '@dehub/shared/model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loaderVisibleSubject = new BehaviorSubject<boolean>(false);
  loaderVisible$ = this.loaderVisibleSubject.asObservable();

  private subtitleSubject = new BehaviorSubject<string>('');
  subtitle$ = this.subtitleSubject.asObservable();

  loaderGif = `${this.env.baseUrl}/assets/dehub/dehub-loader.gif`;

  constructor(@Inject(EnvToken) private env: SharedEnv) {}

  show(subtitle = '') {
    this.subtitleSubject.next(subtitle);
    this.loaderVisibleSubject.next(true);
  }

  hide() {
    this.loaderVisibleSubject.next(false);
    this.subtitleSubject.next('');
  }
}
