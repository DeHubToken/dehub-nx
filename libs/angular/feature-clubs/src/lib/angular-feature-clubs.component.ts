import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { PageClubsCollectionService } from '@dehub/angular/core';
import { EnvToken } from '@dehub/angular/model';
import { PageHeaderComponent } from '@dehub/angular/ui/components/page-header/page-header.component';
import { PageSectionsComponent } from '@dehub/angular/ui/components/page-sections/page-sections.component';
import { PageClubsFragment, SharedEnv } from '@dehub/shared/model';
import { LetModule } from '@rx-angular/template/let';
import { Observable, map } from 'rxjs';

@Component({
  template: `
    <ng-container *rxLet="pageClubs$ as pageClubs" class="grid">
      <!-- Titles -->
      <dhb-page-header [page]="pageClubs"></dhb-page-header>

      <!-- Page Sections -->
      <dhb-page-sections
        [sections]="pageClubs?.sectionsCollection?.items"
        [path]="path"
      ></dhb-page-sections>
    </ng-container>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LetModule, PageHeaderComponent, PageSectionsComponent],
})
export class AngularFeatureClubsComponent implements OnInit {
  pageClubs$?: Observable<PageClubsFragment | undefined>;

  path = this.env.baseUrl;

  constructor(
    @Inject(EnvToken) private env: SharedEnv,
    private pageClubsCollectionService: PageClubsCollectionService
  ) {}

  ngOnInit() {
    this.pageClubs$ = this.pageClubsCollectionService
      .fetch({
        isPreview: this.env.contentful.isPreview,
      })
      .pipe(
        map(
          ({ data: { pageClubsCollection } }) =>
            pageClubsCollection?.items[0] ?? undefined
        )
      );
  }
}
