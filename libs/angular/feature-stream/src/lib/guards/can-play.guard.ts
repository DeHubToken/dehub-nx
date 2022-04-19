import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DehubMoralisToken, IDehubMoralisService } from '@dehub/angular/model';
import { map } from 'rxjs/operators';

@Injectable()
export class CanPlayGuard implements CanActivate {
  constructor(
    @Inject(DehubMoralisToken) private dehubMoralis: IDehubMoralisService,
    private router: Router
  ) {}

  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    return this.dehubMoralis.canPlay$.pipe(
      map(canPlay =>
        canPlay ? true : this.router.parseUrl('/stream/access-wall')
      )
    );
  }
}
