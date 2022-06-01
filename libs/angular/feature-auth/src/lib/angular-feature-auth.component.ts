import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs/operators';

@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureAuthComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const defaultDialogConfig: DynamicDialogConfig = {
      showHeader: true,
      styleClass: 'border-neon-1',
      closeOnEscape: true,
      dismissableMask: true,
      closable: true,
    };

    // Child component is passed in as a data property via the routing module
    this.route.data
      .pipe(first())
      .subscribe(({ dialogComponent, dialogConfig }) => {
        const ref = this.dialogService.open(dialogComponent, {
          ...defaultDialogConfig,
          ...dialogConfig,
        });

        // Trick to close the modal outlet, but only if not specified otherwise.
        // E.x. If user click on "X", escape, or outside the modal we should not
        // only close the modal, but also empty the outlet.
        // But in case you want to preserve the navigation history, you should
        // pass "true" with your this.ref.close() call.
        ref.onClose.subscribe((honorNext: boolean) =>
          this.closeModal(honorNext)
        );
      });
  }

  /*
		Can just close the modal, or close the modal and go to address specified v
		ia 'nextUrl' query param.

		(Use 'honorNext' if you want to follow 'nextUrl'. By default this will be
    ignored, for cases when user just click on "X" or escape or clicks outside
    the modal)
	*/
  closeModal(honorNext: boolean = false, replaceNext?: string) {
    this.getRelativeTo(this.route, lastFirstChild => {
      const closeProps = ['./', { outlets: { modal: null } }];
      if (honorNext) {
        const nextUrl = this.route.snapshot.queryParams['nextUrl'];
        if (nextUrl) {
          // router.navigateByUrl supports outlets inside url, when router.navigate doesn't.
          this.router.navigateByUrl(replaceNext ? replaceNext : nextUrl);
        } else {
          this.router.navigate(closeProps, {
            replaceUrl: true,
            relativeTo: lastFirstChild,
          });
        }
      } else {
        this.router.navigate(closeProps, {
          replaceUrl: true,
          relativeTo: lastFirstChild,
        });
      }
    });
  }

  /*
	To close the model from any depth component we need to provide "relativeTo"
	property to router.navigate. This method helps finding out which
	ActivatedRoute to provide.
	RE: https://stackoverflow.com/questions/47270033/navigate-to-parent-path-from-router-outlet-ng5
	*/
  private getRelativeTo(
    obj: ActivatedRoute,
    callback: (lastFirstChild: ActivatedRoute | null) => void
  ) {
    Object.keys(obj).forEach(key => {
      if (key === 'outlet') {
        if (obj[key] === PRIMARY_OUTLET) {
          const fChild = obj.firstChild;
          const nextFChild = fChild ? fChild.firstChild : undefined;
          if (fChild && nextFChild) {
            nextFChild.outlet === 'modal'
              ? callback(fChild)
              : this.getRelativeTo(fChild, callback);
          } else {
            callback(this.route.firstChild);
          }
        } else {
          callback(this.route.firstChild);
        }
      }
    });
  }
}
