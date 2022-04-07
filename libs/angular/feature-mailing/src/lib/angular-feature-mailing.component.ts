import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MailingListFormComponent } from '@dehub/angular/ui/components/mailing-list-form';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'dhb-mailing-modal',
  template: ``,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureMailingComponent implements OnInit {
  constructor(private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {
    const ref = this.dialogService.open(MailingListFormComponent, {
      showHeader: true,
      width: '620px',
      height: '100%',
      styleClass: 'bg-gradient-3 border-neon-1',
      closeOnEscape: true,
      dismissableMask: true,
      closable: true,
    });

    ref.onClose.subscribe(() => {
      this.router.navigate(['./', { outlets: { modal: null } }], {
        replaceUrl: true,
      });
    });
  }
}
