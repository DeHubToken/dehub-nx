import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TournamentsService } from '@dehub/angular/core';
import {
  CarouselResponsiveOptions,
  TournamentCollectionFieldsFragment,
} from '@dehub/shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  template: `
    <!-- Featured Tournaments loading -->
    <ng-container
      *ngIf="
        featuredTournamentsLoading$ | async;
        else featuredTournamentsLoaded
      "
    >
      Loading featured tournaments...
    </ng-container>

    <!-- Featured Tournaments loaded -->
    <ng-template #featuredTournamentsLoaded>
      <p-carousel
        *ngIf="featuredTournaments$ | async as tournaments"
        [value]="tournaments.items"
        [circular]="tournaments.total > 1"
        [autoplayInterval]="3000"
        [numVisible]="1"
        [numScroll]="1"
      >
        <ng-template pTemplate="header">
          <h3><i class="fa fa-trophy-alt"></i> Tournaments</h3>
        </ng-template>
        <ng-template let-tournament pTemplate="item">
          <dhb-tournament-card [tournament]="tournament"></dhb-tournament-card>
        </ng-template>
      </p-carousel>
    </ng-template>

    <!-- Finished Tournaments loading -->
    <ng-container
      *ngIf="
        finishedTournamentsLoading$ | async;
        else finishedTournamentsLoaded
      "
    >
      Loading finished tournaments...
    </ng-container>

    <!-- Finished Tournaments loaded -->
    <ng-template #finishedTournamentsLoaded>
      <p-carousel
        *ngIf="finishedTournaments$ | async as tournaments"
        [value]="tournaments.items"
        [responsiveOptions]="finishedCarouselResponsiveOptions"
        [numVisible]="3"
        [numScroll]="3"
      >
        <ng-template let-tournament pTemplate="item">
          <dhb-tournament-card [tournament]="tournament"></dhb-tournament-card>
        </ng-template>
      </p-carousel>
    </ng-template>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentComponent implements OnInit {
  featuredTournaments$?: Observable<TournamentCollectionFieldsFragment>;
  featuredTournamentsLoading$?: Observable<boolean>;
  finishedTournaments$?: Observable<TournamentCollectionFieldsFragment>;
  finishedTournamentsLoading$?: Observable<boolean>;

  finishedCarouselResponsiveOptions: CarouselResponsiveOptions = [
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(private tournamentService: TournamentsService) {}

  ngOnInit() {
    const featuredTounamentsQuery$ = this.getTournaments(true);

    this.featuredTournaments$ = featuredTounamentsQuery$.pipe(
      map(
        ({ data }) =>
          data?.tournamentCollection as TournamentCollectionFieldsFragment
      )
    );

    this.featuredTournamentsLoading$ = featuredTounamentsQuery$.pipe(
      map(({ loading }) => loading)
    );

    const finishedTounamentsQuery$ = this.getTournaments(false);

    this.finishedTournaments$ = finishedTounamentsQuery$.pipe(
      map(
        ({ data }) =>
          data?.tournamentCollection as TournamentCollectionFieldsFragment
      )
    );

    this.finishedTournamentsLoading$ = finishedTounamentsQuery$.pipe(
      map(({ loading }) => loading)
    );
  }

  private getTournaments(isFeatured = true) {
    return this.tournamentService.watch({
      isFeatured,
      isPreview: environment.contentful.isPreview,
    }).valueChanges;
  }
}
