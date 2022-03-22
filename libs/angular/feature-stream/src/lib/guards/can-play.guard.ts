import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { MoralisService } from '@dehub/angular/moralis';
import { map } from 'rxjs/operators';

@Injectable()
export class CanPlayGuard implements CanActivate {
  constructor(private moralisService: MoralisService, private router: Router) {}

  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    return this.moralisService.canPlay$.pipe(
      map(canPlay =>
        canPlay ? true : this.router.parseUrl('/stream/access-wall')
      )
    );
  }
}
