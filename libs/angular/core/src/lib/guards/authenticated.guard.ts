import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { IMoralisService, MoralisToken } from '@dehub/angular/model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard implements CanActivate {
  constructor(
    @Inject(MoralisToken) private moralisService: IMoralisService,
    private router: Router
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.moralisService.isAuthenticated$.pipe(
      map(isAuthenticated => (isAuthenticated ? true : this.redirect(state)))
    );
  }

  private redirect(state: RouterStateSnapshot) {
    this.router.navigate(['/', { outlets: { modal: ['auth'] } }], {
      queryParams: { nextUrl: state.url },
    });
    return false;
  }
}
