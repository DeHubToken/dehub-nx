import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { swUpdateAvailableComponentKey } from '@dehub/shared/config';

@Component({
  selector: 'dhb-sw-update-available',
  template: `
    <p-toast
      [key]="key"
      (onClose)="onCancel()"
      [baseZIndex]="5000"
      position="bottom-left"
    >
      <ng-template let-message pTemplate="message">
        <div class="flex flex-column" style="flex: 1">
          <div class="text-center">
            <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
            <h4>{{ message.summary }}</h4>
            <p>{{ message.detail }}</p>
          </div>
          <div class="grid p-fluid">
            <div class="col-6">
              <button
                type="button"
                pButton
                pRipple
                (click)="onUpdate()"
                label="Update"
                class="p-button-primary"
              ></button>
            </div>
            <div class="col-6">
              <button
                type="button"
                pButton
                pRipple
                (click)="onCancel()"
                label="Not now"
                class="p-button-primary"
              ></button>
            </div>
          </div>
        </div>
      </ng-template>
    </p-toast>
  `,
})
export class SwUpdateAvailableComponent implements OnInit {
  @Output() update = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  key = swUpdateAvailableComponentKey;

  constructor() {}

  ngOnInit() {}

  onUpdate() {
    this.update.next();
  }

  onCancel() {
    this.cancel.next();
  }
}
