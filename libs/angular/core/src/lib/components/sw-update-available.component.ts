import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { swUpdateAvailableComponentKey } from '@dehub/shared/config';

@Component({
  selector: 'dhb-sw-update-available',
  template: `
    <p-toast
      [key]="key"
      (onClose)="onCancel()"
      [baseZIndex]="5000"
      [breakpoints]="{ '600px': { width: '100%', left: '0', right: '0' } }"
      [styleClass]="'opacity-100'"
      position="bottom-right"
    >
      <ng-template let-message pTemplate="message">
        <div class="flex flex-column" style="flex: 1">
          <div class="text-center pt-2 pb-4">
            <i class="fa-duotone fa-circle-exclamation text-6xl"></i>
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
                [class]="resolveButtonClass(message.severity)"
              ></button>
            </div>
            <div class="col-6">
              <button
                type="button"
                pButton
                pRipple
                (click)="onCancel()"
                label="Not now"
                [class]="
                  'p-button-outlined ' + resolveButtonClass(message.severity)
                "
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

  resolveButtonClass(severity: 'info' | 'warn' | 'error' | 'success') {
    switch (severity) {
      case 'info':
        return 'p-button-info';
      case 'warn':
        return 'p-button-warning';
      case 'error':
        return 'p-button-danger';
      case 'success':
        return 'p-button-success';
    }
  }
}
