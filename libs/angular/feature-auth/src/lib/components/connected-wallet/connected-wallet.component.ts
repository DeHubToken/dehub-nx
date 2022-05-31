import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'dhb-connected-wallet',
  template: `
    <div class="text-center">
      <i class="fa-duotone fa-thumbs-up icon-color-duotone-1 text-6xl mt-4"></i>
      <h6 class="mt-5 mb-6">
        You are already connected.
        <br />
        Please close this window and continue.
      </h6>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectedWalletComponent implements OnInit {
  constructor(private router: Router, public ref: DynamicDialogRef) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          e =>
            e instanceof NavigationStart && e.navigationTrigger === 'popstate'
        ),
        first()
      )
      .subscribe(() => this.ref.close(true));
  }
}
