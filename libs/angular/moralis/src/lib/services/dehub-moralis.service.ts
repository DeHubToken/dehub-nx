import { Inject, Injectable } from '@angular/core';
import { LoggerService, LoggerToken } from '@dehub/angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MoralisService } from './moralis.service';

interface IDehubMoralis {
  canPlay$: Observable<boolean>;
}

@Injectable()
export class DehubMoralisService implements IDehubMoralis {
  canPlay$ = this.moralisService.userAttributes$.pipe(
    map(attributes => attributes?.can_play ?? false)
  );

  constructor(
    @Inject(LoggerToken) private _logger: LoggerService,
    private moralisService: MoralisService
  ) {}
}
