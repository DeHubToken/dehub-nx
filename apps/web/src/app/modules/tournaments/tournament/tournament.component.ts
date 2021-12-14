import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TournamentsService } from '@dehub/angular/core';
import {
  CarouselResponsiveOptions,
  TournamentCollectionFragment,
} from '@dehub/shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  template: `
    <div class="grid">
      <div class="col-12 xl:col-9 xl:col-offset-1">
        <!-- Featured Tournaments loading -->
        <ng-container
          *ngIf="
            featuredTournamentsLoading$ | async;
            else featuredTournamentsLoaded
          "
        >
          <p-carousel
            [value]="teamMembersSkeleton"
            [circular]="teamMembersSkeleton.length > 1"
            [autoplayInterval]="3000"
            [numVisible]="1"
            [numScroll]="1"
          >
            <ng-template pTemplate="header">
              <h3><i class="fa fa-trophy-alt"></i> Featured Tournaments</h3>
            </ng-template>
            <ng-template let-tournament pTemplate="item">
              <dhb-tournament-skeleton-card></dhb-tournament-skeleton-card>
            </ng-template>
          </p-carousel>
        </ng-container>

        <!-- Featured Tournaments loaded -->
        <ng-template #featuredTournamentsLoaded>
          <ng-container *ngIf="featuredTournaments$ | async as tournaments">
            <p-carousel
              *ngIf="tournaments.total > 0"
              [value]="tournaments.items"
              [circular]="tournaments.total > 1"
              [autoplayInterval]="3000"
              [numVisible]="1"
              [numScroll]="1"
            >
              <ng-template pTemplate="header">
                <h3><i class="fa fa-trophy-alt"></i> Featured Tournaments</h3>
              </ng-template>
              <ng-template let-tournament pTemplate="item">
                <dhb-tournament-card
                  [tournament]="tournament"
                ></dhb-tournament-card>
              </ng-template>
            </p-carousel>
          </ng-container>
        </ng-template>

        <!-- Finished Tournaments loading -->
        <ng-container
          *ngIf="
            finishedTournamentsLoading$ | async;
            else finishedTournamentsLoaded
          "
        >
          <p-carousel
            [value]="teamMembersSkeleton"
            [responsiveOptions]="finishedCarouselResponsiveOptions"
            [numVisible]="3"
            [numScroll]="3"
          >
            <ng-template pTemplate="header">
              <h3><i class="fa fa-trophy-alt"></i> Finished Tournaments</h3>
            </ng-template>
            <ng-template let-tournament pTemplate="item">
              <dhb-tournament-skeleton-card
                [expired]="true"
              ></dhb-tournament-skeleton-card>
            </ng-template>
          </p-carousel>
        </ng-container>

        <!-- Finished Tournaments loaded -->
        <ng-template #finishedTournamentsLoaded>
          <ng-container *ngIf="finishedTournaments$ | async as tournaments">
            <p-carousel
              *ngIf="tournaments.total > 0"
              [value]="tournaments.items"
              [responsiveOptions]="finishedCarouselResponsiveOptions"
              [numVisible]="3"
              [numScroll]="3"
            >
              <ng-template pTemplate="header">
                <h3><i class="fa fa-trophy-alt"></i> Finished Tournaments</h3>
              </ng-template>
              <ng-template let-tournament pTemplate="item">
                <dhb-tournament-card
                  [tournament]="tournament"
                ></dhb-tournament-card>
              </ng-template>
            </p-carousel>
          </ng-container>
        </ng-template>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentComponent implements OnInit {
  featuredTournaments$?: Observable<TournamentCollectionFragment>;
  featuredTournamentsLoading$?: Observable<boolean>;
  finishedTournaments$?: Observable<TournamentCollectionFragment>;
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

  teamMembersSkeleton = [...Array(9)];

  constructor(private tournamentService: TournamentsService) {}

  ngOnInit() {
    const featuredTounamentsQuery$ = this.getTournaments(true);

    this.featuredTournaments$ = featuredTounamentsQuery$.pipe(
      map(
        ({ data }) => data?.tournamentCollection as TournamentCollectionFragment
      )
    );

    this.featuredTournamentsLoading$ = featuredTounamentsQuery$.pipe(
      map(({ loading }) => loading)
    );

    const sinceLastTwoMonths = new Date(
      new Date().setMonth(new Date().getMonth() - 2)
    );
    const finishedTounamentsQuery$ = this.getTournaments(
      false,
      sinceLastTwoMonths
    );

    this.finishedTournaments$ = finishedTounamentsQuery$.pipe(
      map(
        ({ data }) => data?.tournamentCollection as TournamentCollectionFragment
      )
    );

    this.finishedTournamentsLoading$ = finishedTounamentsQuery$.pipe(
      map(({ loading }) => loading)
    );
  }

  private getTournaments(isFeatured = true, dateGte = new Date()) {
    return this.tournamentService.watch({
      isFeatured,
      dateGte: dateGte.toISOString(),
      isPreview: environment.contentful.isPreview,
    }).valueChanges;
  }
}
