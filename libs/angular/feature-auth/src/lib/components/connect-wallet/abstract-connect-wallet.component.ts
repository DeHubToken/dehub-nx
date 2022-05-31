import { Directive } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, first } from 'rxjs/operators';

@Directive()
export class AbstractConnectWalletComponent {
  constructor(
    protected router: Router,
    protected dialogRef: DynamicDialogRef
  ) {}

  /**
   * Ignore or honor "nextUrl"
   * @param honorNextUrl if false then going back should just close the modal
   */
  closeDialogOnBackNavigation(honorNextUrl = true) {
    this.router.events
      .pipe(
        filter(
          e =>
            e instanceof NavigationStart && e.navigationTrigger === 'popstate'
        ),
        first()
      )
      //
      .subscribe(() =>
        honorNextUrl ? this.dialogRef.close(true) : this.dialogRef.close()
      );
  }

  /** Pass "true", to honor "nextUrl" */
  closeDialog(honorNextUrl = false) {
    this.dialogRef.close(honorNextUrl);
  }
}
