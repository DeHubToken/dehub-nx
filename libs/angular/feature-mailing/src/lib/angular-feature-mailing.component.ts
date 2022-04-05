import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MailingListFormComponent } from '@dehub/angular/ui/components/mailing-list-form';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'dhb-mailing-modal',
  template: ``,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularFeatureMailingComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.dialogService.open(MailingListFormComponent, {
      showHeader: false,
      width: '620px',
      styleClass: 'bg-gradient-3 border-neon-1',
      closeOnEscape: true,
      dismissableMask: true,
    });
  }
}
